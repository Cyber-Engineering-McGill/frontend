import React from 'react';
import { ItemCardProps } from '../../types/itemtype';
import Image from 'next/image';

interface ItemCartProps extends ItemCardProps {
  outerClassName?: string;
  extraComponent?: React.ReactNode;
  onClickX: () => void;
}

const ItemCart = ({ name, imageUrl, desc, price, footer, outerClassName, extraComponent, onClickX }: ItemCartProps) => {
  return (
    <div className={outerClassName}>
      <div className="flex flex-col lg:flex-row w-full h-150 lg:h-60 overflow-hidden relative">
        <div className="flex-none h-1/2 w-full lg:w-1/4 lg:h-auto relative">
          <Image 
            src={imageUrl} 
            alt={name}
            fill
            className="object-cover m-0 block" 
          />
        </div>

        <div className="bg-[rgba(30,30,30,0.85)] text-white p-4
        flex flex-col w-full lg:w-3/4 h-full my-0 overflow-hidden">
          <p className="m-0 font-extrabold text-[1.5em] text-center lg:text-left">{name}</p>

          <div className="flex items-center justify-center lg:justify-start h-full min-w-0">
            <p className="text-sm text-center lg:text-left text-[#FC5C5A] truncate">{desc}</p>
          </div>

          <hr className="text-[#F7F4F3] opacity-100 w-full my-[5px]" />
            <p className="font-bold text-center">{`$${price.toFixed(2)}`}</p>
          <hr className="text-[#F7F4F3] opacity-100 w-full my-[5px]" />

          <div className="flex-grow" />
          {footer}
        </div>

        {/* Close Button */}
        <button
          onClick={onClickX}
          className="absolute right-2 text-red-500 lg:text-white text-xl hover:text-red-500 z-10 cursor-pointer"
        >
          ×
        </button>
      </div>

      {extraComponent}
    </div>
  );
};

export default ItemCart;
