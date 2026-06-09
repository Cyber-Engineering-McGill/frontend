import React, { ReactNode } from 'react';
import Link from 'next/link';

interface InfoButtonProps {
  children: ReactNode;
  href: string;
}

const InfoButton: React.FC<InfoButtonProps> = ({ children, href }) => {
  return (
    <Link href={href} className="inline-block m-1">
  <button
    className="
      w-full
      bg-[#1E1E1E] 
      font-sans 
      font-bold 
      box-border
      transform 
      hover:scale-105 
      hover:shadow-lg 
      cursor-pointer
      rounded-md border border-red-500 px-6 py-3 text-sm text-red-400 
      hover:bg-red-300/10 transition
    "
  >
    {children}
  </button>
</Link>
  );
};

export default InfoButton;
