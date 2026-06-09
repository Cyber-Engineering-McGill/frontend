"use client"

import Background from "@/components/Background"
import CartList from "./components/cartlist";
import Summary from "./components/cartsummary";
import { useItemsQtys } from "../contexts/usecontexts";

export default function CartPage() {
  const { itemsQtys } = useItemsQtys();

  const isCartEmpty = itemsQtys.every((item) => item.qty === 0);

  return(
    <Background>
      <div className={`min-h-[calc(100vh-var(--navbar-h))] px-4 sm:px-8 md:px-12 lg:px-16 w-full py-8
      bg-gradient-to-b from-black/70 via-transparent via-50% to-black/70
      flex flex-col lg:flex-row gap-4 overflow-x-hidden 
      ${isCartEmpty ? "align-middle justify-center items-center" : ""}`}>
        { isCartEmpty ? (
          <h1 className="text-xl sm:text-2xl font-semibold text-center text-white/80">
            Your cart is empty.
          </h1>  
        ) : (
          <>
            <CartList />
            <Summary />
          </>
        )}
      </div>
    </Background>
  );
}