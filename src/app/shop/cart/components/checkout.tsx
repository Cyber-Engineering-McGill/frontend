/* eslint-disable */
"use client";

import { loadStripe } from "@stripe/stripe-js";
import { DateTime } from "luxon";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useItemsQtys } from "../../contexts/usecontexts";

const SITE_KEY = process.env.NEXT_PUBLIC_CAPTCHA_KEY!;

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PK!
);

export default function Checkout() {
  const [loading, setLoading] = useState(false);

  const { itemsQtys } = useItemsQtys();

  const captchaRef = useRef<ReCAPTCHA>(null);

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
    setMessage(null);
  };

  const handleCheckout = async () => {
    setLoading(true);

    if (!captchaToken) {
      setMessage("Please complete the CAPTCHA.");
      return;
    }

    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    const orderedProductList = itemsQtys
      .filter((item) => item.qty > 0)
      .map((item) => ({
        productId: item.id,
        quantity: item.qty,
      }));

    const createdAt = DateTime.now()
      .setZone("America/New_York")
      .toISO({ includeOffset: false });

    const orderDto = {
      email,
      createdAt,
      orderedProductList,
      captchaToken,
    };

    try {
      const stripe = await stripePromise;

      const response = await fetch(`${process.env.NEXT_PUBLIC_SHOP_HOST}/createOrder`, {
        // CHANGE
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderDto),
      });

      if (response.status === 400) {
        setMessage("CAPTCHA verification failed.");
        captchaRef.current?.reset();
        setCaptchaToken(null);
        return;
      }

      if (response.status === 429) {
        setMessage("You are placing orders too often. Please try again later.");
        return;
      }

      if (!response.ok) {
        setMessage("Something went wrong. Please try again.");
        return;
      }

      const data = await response.json();

      if (stripe && data.sessionId) {
        await stripe.redirectToCheckout({ sessionId: data.sessionId });
      } else {
        alert("Something went wrong. Please try again.");
      }

      setLoading(false);

      console.log(orderDto);
      setMessage("Order successfully made.");
      captchaRef.current?.reset();
      setCaptchaToken(null);
    } catch (e) {
      console.error("Order error: ", e);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col align-middle items-center gap-4 w-full mt-8">
      <input
        type="email"
        placeholder="Enter your email"
        className="px-4 py-2 border rounded w-full max-w-sm text-white border-white"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <ReCAPTCHA
        sitekey={SITE_KEY}
        onChange={handleCaptchaChange}
        ref={captchaRef}
      />

      <div className="flex w-full justify-center">
        <button
          onClick={handleCheckout}
          className={`
            rounded-md border border-red-500 text-red-400 font-semibold
            text-[clamp(0.875rem,3vw,1rem)]
            px-[clamp(0.5rem,1.5vw,1.25rem)]
            py-[clamp(0.25rem,1vw,0.75rem)]
            mt-4
            hover:bg-red-300/10 transition
            cursor-pointer
          `}
        >
          Proceed to checkout.
        </button>
      </div>

      {message && (
        <div className="text-sm text-center text-red-500 mt-2">{message}</div>
      )}
    </div>
  );
}
