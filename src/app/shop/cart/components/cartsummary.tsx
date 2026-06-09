"use client"

import { useMemo } from "react";
import { useItems, useItemsQtys } from "../../contexts/usecontexts"
import { ProductType } from "../../types/producttype";
import CartTotal from "./carttotal";
import Checkout from "./checkout";
import ItemOrder from "./itemorder";

export default function CartSummary() {
  const items = useItems();
  const { itemsQtys } = useItemsQtys();

  // Filter items based on quantity
  const itemsWithQty = useMemo(() => {
    return itemsQtys
      .filter(q => q.qty > 0)
      .map(qtyItem => {
        const item = items.find(i => i.id === qtyItem.id);
        return item ? { ...item, qty: qtyItem.qty } : null;
      })
      .filter((item): item is ProductType & { qty: number } => item !== null);
  }, [items, itemsQtys]);

  const subtotal = useMemo(() =>
    itemsWithQty.reduce((sum, item) => sum + item.price * item.qty, 0),
  [itemsWithQty]);

  return (
    <div className="w-full lg:w-1/3 border-white border-t-4 pt-4
    lg:border-l-4 lg:border-t-0 lg:pt-0 lg:pl-4
    flex flex-col items-center lg:items-start gap-4">
      <h1 className="text-white font-bold text-3xl lg:text-4xl">Order summary</h1>
      <hr className="text-[#F7F4F3] opacity-100 w-full my-[5px]" />
      <div className="w-full flex flex-col gap-2">
        {itemsWithQty.map((item) => (
          <ItemOrder
            key={item.id}
            name={item.name}
            price={item.price}
            qty={item.qty}
          />
        )
        )}
      </div>
      <hr className="text-[#F7F4F3] opacity-100 w-full my-[5px]" />
      <CartTotal subtotal={subtotal}/>
      <Checkout />
    </div>
  )
}