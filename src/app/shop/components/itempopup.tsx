import React, { useEffect, useRef } from "react";
import ItemCart from "@/app/shop/cart/components/itemcart";
import { ItemCardProps } from "@/app/shop/types/itemtype";

interface ItemPopupProps extends ItemCardProps {
  onClose: () => void; // used for ItemCart's onClickX
}

const ItemPopup: React.FC<ItemPopupProps> = ({ name, imageUrl, desc, price, footer, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // 🔁 Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // 🖱️ Close on click outside
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 lg:px-0"
      onMouseDown={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className="relative bg-[#1e1e1e] rounded-xl shadow-xl w-full max-w-2xl mx-4 lg:scale-150"
      >
        {/* Reused item design */}
        <ItemCart
          name={name}
          imageUrl={imageUrl}
          desc={desc}
          price={price}
          footer={footer}
          onClickX={onClose}
        />
      </div>
    </div>
  );
};

export default ItemPopup;
