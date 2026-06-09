import React from 'react';
import { ItemCardProps } from '../types/itemtype';
import Image from 'next/image';

const Item = ({ name, imageUrl, desc, price, footer }: ItemCardProps) => {
  return ( 
    <div className="flex flex-col border-[3px] border-[#ccc2] rounded-[10px] m-5 w-[300px] h-[500px] shadow-md text-center overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      <div className="w-full h-[325px] rounded-t-[10px] block relative">
        <Image 
          src={imageUrl} 
          alt={name}
          fill
          className="object-cover" 
        />
      </div>

      <div className="bg-[rgba(30,30,30,0.85)] text-white p-4 rounded-b-[10px] flex flex-col flex-grow h-full mt-0 mb-0">
        <p className="m-0 font-extrabold text-[1.7em]">{name}</p>

        <div className="flex items-center justify-center h-full">
          <p className="text-sm text-center text-[#FC5C5A]">{desc}</p>
        </div>

        <hr className="text-[#F7F4F3] opacity-100 w-full my-[5px]" />
          <p className="font-bold">{`$${price.toFixed(2)}`}</p>
        <hr className="text-[#F7F4F3] opacity-100 w-full my-[5px]" />

        <div className="flex-grow" />
        {footer}
      </div>
    </div> 
  );
};

export default Item;
