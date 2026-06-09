"use client";

import { useEffect, useState } from "react";
import { useItemsDescs, useItemsQtys } from "../contexts/usecontexts";
import { toastError } from "@/components/toastError";

interface QuantityProps {
  min?: number;
  max?: number;
  includeCart?: boolean;
  onChange?: boolean;
  onAddToCartExtra?: () => void;
  id: number;
  outerStyleName?: string;
}

export default function Quantity({
  min = 1,
  max = 10,
  onChange = false,
  onAddToCartExtra,
  includeCart = false,
  id,
  outerStyleName
}: QuantityProps) {
  const { itemsQtys, setItemsQtys } = useItemsQtys();
  const itemsDescs = useItemsDescs();

  const [qty, setQty] = useState(() => {
    const existing = itemsQtys.find(item => item.id === id)?.qty ?? 0;
    return Math.max(min, existing);
  });

  useEffect(() => {
  if (onChange) {
    setItemsQtys(prev =>
      prev.map(item =>
        item.id === id ? { ...item, qty } : item
      )
    );
  }
  }, [qty, id, onChange, setItemsQtys]);

  const updateQty = (delta: number) => {
    const next = Math.min(max, Math.max(min, qty + delta));
    setQty(next); // only update local state here
  };

  const handleManualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val)) val = min;
    val = Math.min(max, Math.max(min, val));
    setQty(val); // again, only update local state
  };

  const onAddToCart = (qty: number) => {
    const isInStock = itemsDescs.find(item => item.id === id)?.inStock;

    if (isInStock) {
      setItemsQtys((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, qty } : item
        )
      )

      if (onAddToCartExtra) onAddToCartExtra();
    }
    else {
      toastError("Item out of stock!");
    }
  }

  return (
    <div className={`flex flex-col justify-center items-center lg:flex-row gap-4 mt-4 ${outerStyleName}`}>
      {/* Quantity Control Group */}
      <div className="flex items-center gap-2 bg-black/60 border border-[#23272b] rounded-lg px-2 py-1">
        <button
          className={`w-8 h-8 flex items-center justify-center rounded transition-colors cursor-pointer ${
            qty <= min
              ? "text-[#8d99ae] cursor-not-allowed"
              : "text-[#e3342f] hover:bg-[#e3342f22]"
          }`}
          onClick={() => updateQty(-1)}
          disabled={qty <= min}
          aria-label="Decrease quantity"
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <line x1="5" y1="10" x2="15" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <input
          type="number"
          min={min}
          max={max}
          value={qty}
          onChange={handleManualChange}
          className="w-12 text-center bg-transparent text-white text-sm font-semibold outline-none 
            [appearance:textfield]
            [&::-webkit-inner-spin-button]:appearance-none
            [&::-webkit-outer-spin-button]:appearance-none"
        />

        <button
          className={`w-8 h-8 flex items-center justify-center rounded transition-colors cursor-pointer ${
            qty >= max
              ? "text-[#8d99ae] cursor-not-allowed"
              : "text-[#e3342f] hover:bg-[#e3342f22]"
          }`}
          onClick={() => updateQty(1)}
          disabled={qty >= max}
          aria-label="Increase quantity"
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <line x1="5" y1="10" x2="15" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="10" y1="5" x2="10" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Add to Cart Button */}
      { includeCart &&
        <button
        type="button"
        onClick={() => onAddToCart(qty)}
        className="w-full lg:w-auto font-bold py-3 px-6 rounded-lg transition-transform
          bg-[#e3342f] text-white text-[1.1rem] tracking-wide
          shadow-[0_2px_8px_0_#23272b55] cursor-pointer
          hover:bg-red-600/75 hover:scale-105 focus:scale-105"
        >
          Add to Cart
        </button>
      }
    </div>
  );
}
