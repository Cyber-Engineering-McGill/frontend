/* eslint-disable */
"use client";

import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import ShortTextBox from "./shorttextbox";
import TextBox from "./textbox";
import Checkbox from "./checkbox";

const SITE_KEY = process.env.NEXT_PUBLIC_CAPTCHA_KEY!;
const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_SCRIPT_URL!;
const MCGILL_EMAIL_REGEX = /^[A-Za-z0-9._+-]+@(mail\.mcgill\.ca|mcgill\.ca)$/i;

// Google Sheet (permission private)
// https://docs.google.com/spreadsheets/d/1pnjfnjkdZDukmUhdUqY3Pjuw8eC1qTYc8f_eVikDaQo/

const YearChoiceOptions = ["U0", "U1", "U2", "U3", "U4"];

const interestChoiceOptions = [
  {
    value: "cyber",
    label: (
      <div className="flex items-center">
        <span>Cybersecurity Team</span>
        <div className="relative ml-2 group">
          {/* Hidden toggle for mobile */}
          <input type="checkbox" id="cyber-info" className="peer hidden" />
          <label
            htmlFor="cyber-info"
            className="md:hidden w-5 h-5 flex items-center justify-center border-2 border-gray-400 text-gray-400 rounded-full cursor-pointer"
          >
            i
          </label>
          <button
            type="button"
            className="hidden md:flex w-5 h-5 items-center justify-center border-2 border-gray-400 text-gray-400 rounded-full cursor-default"
            aria-label="Cybersecurity team info"
          >
            i
          </button>

          {/* Tooltip (shows on hover for desktop, peer-checked for mobile) */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden w-80 rounded bg-gray-800 p-3 text-sm text-white peer-checked:block md:peer-checked:hidden md:group-hover:block md:group-focus-within:block">
            Focus on software. Conduct penetration testing and solve CTF
            challenges.
            <br />
            <br />
            Recommended for: Software Engineering, Computer Engineering,
            Computer Science.
          </div>
        </div>
      </div>
    ),
  },
  {
    value: "hardware",
    label: (
      <div className="flex items-center">
        <span>Hardware Hacking Team</span>
        <div className="relative ml-2 group">
          <input type="checkbox" id="hardware-info" className="peer hidden" />
          <label
            htmlFor="hardware-info"
            className="md:hidden w-5 h-5 flex items-center justify-center border-2 border-gray-400 text-gray-400 rounded-full cursor-pointer"
          >
            i
          </label>
          <button
            type="button"
            className="hidden md:flex w-5 h-5 items-center justify-center border-2 border-gray-400 text-gray-400 rounded-full cursor-default"
            aria-label="Hardware hacking team info"
          >
            i
          </button>

          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden w-80 rounded bg-gray-800 p-3 text-sm text-white peer-checked:block md:peer-checked:hidden md:group-hover:block md:group-focus-within:block">
            Focus on hardware. Prototype and build innovative hacking tools /
            gadgets.
            <br />
            <br />
            Recommended for: Electrical Engineering, Computer Engineering,
            Software Engineering.
          </div>
        </div>
      </div>
    ),
  },
  {
    value: "both",
    label: <span>Both</span>,
  },
];

type FormState = {
  name: string;
  email: string;
  discord: string;
  year: string;
  interest: string;
  program: string;
  experience: string;
  question: string;
};

type PopupState = {
  type: "success" | "error";
  message: string;
};

export default function RegisterFormBox() {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [popup, setPopup] = useState<PopupState | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const [following, setFollowing] = useState(false);
  const [agreedEthics, setAgreedEthics] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    discord: "",
    year: "",
    interest: "",
    program: "",
    experience: "",
    question: "",
  });

  function isMcGillEmail(email: string) {
    return MCGILL_EMAIL_REGEX.test(email.trim());
  }

  function showPopup(type: PopupState["type"], message: string) {
    setPopup({ type, message });
  }

  function handleShortTextBoxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleTextBoxChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleYearCheckboxChange(value: string) {
    setForm((prev) => ({ ...prev, year: value }));
  }

  function handleInterestCheckboxChange(value: string) {
    setForm((prev) => ({ ...prev, interest: value }));
  }

  function handleInstaCheckboxChange() {
    setFollowing((prev) => !prev);
  }

  function jsonpCall(
    params: Record<string, string>,
    callback: (res: any) => void,
  ) {
    const callbackName = `jsonp_cb_${Math.random().toString(36).substring(2)}`;
    // @ts-ignore
    window[callbackName] = (res: any) => {
      delete (
        // @ts-ignore
        window[callbackName]
      );
      const el = document.getElementById(callbackName);
      el?.parentElement?.removeChild(el);
      callback(res);
    };
    const q = new URLSearchParams({
      ...params,
      callback: callbackName,
    } as any).toString();
    const script = document.createElement("script");
    script.id = callbackName;
    script.src = `${APPS_SCRIPT_URL}?${q}`;
    document.body.appendChild(script);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    if (!isMcGillEmail(form.email)) {
      const message = "Please enter a valid McGill email.";
      showPopup("error", message);
      setSubmitting(false);
      return;
    }

    if (!form.question.trim()) {
      const message = "Please answer why you want to join our club.";
      showPopup("error", message);
      setSubmitting(false);
      return;
    }

    if (!agreedEthics) {
      const message =
        "You must agree to the ethics statement before submitting.";
      showPopup("error", message);
      setSubmitting(false);
      return;
    }

    if (!captchaToken) {
      const message = "Please complete the CAPTCHA.";
      showPopup("error", message);
      setSubmitting(false);
      return;
    }

    setSubmitting(true);

    const submitParams: Record<string, string> = {
      mode: "submit",
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      discord: form.discord.trim(),
      year: form.year.trim(),
      interest: form.interest.trim(),
      program: form.program.trim(),
      experience: form.experience.trim(),
      question: form.question.trim(),
      recaptcha: captchaToken,
    };

    jsonpCall(submitParams, (res) => {
      setSubmitting(false);
      if (!res || !res.success) {
        const message = res?.error || "Submission failed.";
        showPopup("error", message);
      } else {
        showPopup(
          "success",
          "Registration submitted. Check your inbox shortly for confirmation.",
        );
        // Optionally reset the form
        // setForm({ name:"", email:"", discord:"", year:"", interest:"", program:"", experience:"", question:"" });
        // recaptchaRef.current?.reset();
        // setCaptchaToken(null);
      }
    });
  }

  return (
    <form
      className="relative z-10 w-full max-w-2xl mx-auto rounded-2xl shadow-xl p-10 flex flex-col gap-8 border"
      style={{
        background: "linear-gradient(135deg, #1a1a1ad9 60%, #23272b 100%)",
        borderColor: "#e3342f",
        boxShadow: "0 8px 32px 0 #e3342f33",
      }}
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      {popup && (
        <div className="fixed top-[calc(var(--navbar-h)+12px)] left-1/2 -translate-x-1/2 z-[999] w-[92%] max-w-xl">
          <div
            className={`rounded-xl border px-4 py-3 shadow-2xl ${
              popup.type === "success"
                ? "bg-[#052e16] border-[#22c55e] text-[#dcfce7]"
                : "bg-[#3b0a0a] border-[#ef4444] text-[#fee2e2]"
            }`}
            role="alert"
            aria-live="polite"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="font-semibold leading-6">{popup.message}</div>
              <button
                type="button"
                className="text-sm font-bold opacity-80 hover:opacity-100 cursor-pointer"
                onClick={() => setPopup(null)}
                aria-label="Close notification"
              >
                X
              </button>
            </div>
          </div>
        </div>
      )}

      <ShortTextBox
        id="name"
        name="name"
        label="Name"
        value={form.name}
        onChange={handleShortTextBoxChange}
        placeholder="Firstname Lastname"
        required
      />
      <ShortTextBox
        id="email"
        name="email"
        label="McGill Email"
        type="email"
        value={form.email}
        onChange={handleShortTextBoxChange}
        placeholder="email@mail.mcgill.ca"
        pattern="[A-Za-z0-9._+-]+@(mail\.mcgill\.ca|mcgill\.ca)"
        title="Use [A-Za-z0-9._+-] then @mail.mcgill.ca or @mcgill.ca"
        required
      />
      <ShortTextBox
        id="discord"
        name="discord"
        label="Discord"
        value={form.discord}
        onChange={handleShortTextBoxChange}
        placeholder="Username"
        required
      />
      <Checkbox
        options={YearChoiceOptions}
        value={form.year}
        onChange={handleYearCheckboxChange}
        label="What year are you in?"
      />
      <Checkbox
        options={interestChoiceOptions}
        value={form.interest}
        onChange={handleInterestCheckboxChange}
        label="Which team(s) interest you? (You won't be limited by your option)"
      />
      <ShortTextBox
        id="program"
        name="program"
        label="What program and faculty are you in?"
        value={form.program}
        onChange={handleShortTextBoxChange}
        placeholder="Program, Faculty"
        required
      />
      <ShortTextBox
        id="experience"
        name="experience"
        label="Do you have any experience with cybersecurity/hardware hacking?"
        value={form.experience}
        onChange={handleShortTextBoxChange}
        placeholder="Yes / No. If yes, how much?"
        autoComplete="off"
        required
      />
      <TextBox
        id="question"
        name="question"
        label="Why do you want to join our club?"
        value={form.question}
        onChange={handleTextBoxChange}
        placeholder="Tell us something about yourself..."
        required
      />

      <Checkbox
        options={["Yes"]}
        value={following ? "Yes" : ""}
        onChange={handleInstaCheckboxChange}
        label={
          <span className="flex flex-wrap items-center gap-1">
            Are you following our{" "}
            <a
              href="https://www.instagram.com/cyberengmcgill/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:underline"
            >
              Instagram
            </a>{" "}
            and are you in our{" "}
            <a
              href="https://discord.com/invite/zKU5ztKEv8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-500 hover:underline"
            >
              Discord
            </a>
            ?
          </span>
        }
      />

      <div className="flex flex-col gap-2">
        <span
          className="text-sm uppercase tracking-widest"
          style={{ color: "#b3b3b3" }}
        >
          Ethics Agreement
        </span>
        <label
          htmlFor="ethics-agreement"
          className="flex items-start gap-2 select-none cursor-pointer"
          style={{ color: "#8d99ae" }}
        >
          <input
            id="ethics-agreement"
            type="checkbox"
            checked={agreedEthics}
            onChange={(e) => setAgreedEthics(e.target.checked)}
            className="accent-[#e3342f] rounded border border-[#23272b] focus:ring-2 focus:ring-[#e3342f] transition-all cursor-pointer"
            style={{
              width: "22px",
              height: "22px",
              minWidth: "22px",
              minHeight: "22px",
              maxWidth: "22px",
              maxHeight: "22px",
            }}
          />
          <span className="leading-6">
            I acknowledge that all cybersecurity activities must be conducted
            ethically, strictly for authorized and educational purposes, and
            never to harm systems, users, or organizations.
          </span>
        </label>
      </div>

      <ReCAPTCHA
        sitekey={SITE_KEY}
        onChange={(token) => setCaptchaToken(token)}
        className="self-center"
        ref={recaptchaRef}
      />

      <button
        type="submit"
        disabled={!captchaToken || submitting}
        className={`
          mt-4 w-full font-bold py-3 rounded-lg 
          shadow-[0_2px_8px_0_#23272b55] transition-transform duration-150 
          ease-[cubic-bezier(.4,2,.6,1)]
          bg-[#e3342f] text-white
          text-[1.2rem] tracking-[0.05em]
          hover:bg-red-600/75 
          hover:scale-105 focus:scale-105
          cursor-pointer
          ${submitting ? "opacity-70 cursor-wait" : ""}
        `}
      >
        {submitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
