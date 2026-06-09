import React, { ReactNode, useState } from 'react';
import ItemPopup from './itempopup';
import { ItemCardProps } from '../types/itemtype';
import ReactDOM from 'react-dom';
import Quantity from './quantity';
import { toastSuccess } from '@/components/toastSuccess';

interface BuyButtonProps extends ItemCardProps{
  children: ReactNode; // Object inside button
}

const BuyButton: React.FC<BuyButtonProps> = ({ name, imageUrl, desc, price, footer, children }: BuyButtonProps) => {
  const [showPopup, setShowPopup] = useState(false);

  const popupRoot = (typeof window !== "undefined")
    ? document.getElementById("popup-root")
    : null;

  const handleClick = () => {
    setShowPopup(true);
  };

  let modifiedFooter = footer;

  if (React.isValidElement(footer) && footer.type === Quantity) {
    modifiedFooter = React.cloneElement(
      footer as React.ReactElement<{ onAddToCartExtra: () => void}>,
      {
      onAddToCartExtra: () => {
        setShowPopup(false);
        toastSuccess("Successfully added to cart.");
      }
      }
    );
  }

  return (
    <>
      <div className="m-1">
        <button onClick={handleClick} 
        className="
            font-sans 
            font-bold 
            transform 
            hover:scale-105 
            hover:shadow-lg
            cursor-pointer
            rounded-md bg-red-500 px-6 py-3 text-sm text-white 
          hover:bg-red-600/75 transition
          "
        >
          {children}
        </button>
      </div>

      {showPopup && popupRoot && 
        ReactDOM.createPortal(
          <ItemPopup
            name={name}
            imageUrl={imageUrl}
            desc={desc}
            price={price}
            footer={modifiedFooter}
            onClose={() => setShowPopup(false)}
          />,
          popupRoot
        )
      }
    </>
  );
};

export default BuyButton;
