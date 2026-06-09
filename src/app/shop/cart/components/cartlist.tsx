"use client"

import ItemCart from "./itemcart";
import { useItems, useItemsQtys } from "../../contexts/usecontexts"
import Quantity from "@/app/shop/components/quantity";
import { toastSuccess } from "@/components/toastSuccess";

export default function CartList() {
  const items = useItems();
  const { itemsQtys, setItemsQtys } = useItemsQtys();

  // Set qty of given ID to 0 on click of X in cart page
  const handleClickX = (id: number) => {
    setItemsQtys(prev =>
      prev.map(item =>
        item.id === id ? { ...item, qty: 0 } : item
      )
    );

    toastSuccess("Item successfully removed.");
  };


  // Filter items based on quantity
  const itemsInCart = items.filter(item => {
    const qtyObj = itemsQtys.find(q => q.id === item.id);
    return qtyObj && qtyObj.qty > 0;
  });

  return (
    <div className="w-full lg:w-2/3 flex flex-col gap-8 justify-center lg:justify-start">
      {itemsInCart.map((item) => (
        <ItemCart
          key={item.id}
          name={item.name}
          imageUrl={item.imageUrl}
          desc={item.desc}
          price={item.price}
          onClickX={() => handleClickX(item.id)}
          footer={
            <Quantity 
              includeCart={false}
              id={item.id}
              onChange
            />
          }
        />
      ))}
    </div>
  )
}