"use client"

import { useEffect, useState } from "react";
import { ItemsContext, ItemsDescsContext, ItemsQtysContext } from "./contexts/initcontexts";
import { ProductCompleteDetailsType, ProductDescType, ProductFetchType, ProductQtyType } from "./types/producttype";
import { ProductType } from "./types/producttype";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  const [itemsDetails, setItemsDetails] = useState<ProductCompleteDetailsType[]>([]);

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SHOP_HOST}/products`);
        const data: ProductFetchType[] = await res.json();

        const mapped: ProductCompleteDetailsType[] = data.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          pageName: item.pageName,
          desc: item.descShort, // remapped
          descLong1: item.descLong1,
          descLong2: item.descLong2,
          descSpecList: item.descSpecList,
          mediaUrlList: item.mediaUrlList,
          inStock: item.inStock,
        }));

        setItemsDetails(mapped);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    }

    fetchItems();
  }, []);


  const items: ProductType[] = itemsDetails.map(({ id, name, mediaUrlList, desc, price, pageName }) => ({
    id,
    name,
    imageUrl: mediaUrlList[0].src,
    desc,
    price,
    pageName,
  }));

  const itemsDescs: ProductDescType[] = itemsDetails.map(
    ({
      id,
      name,
      price,
      descLong1,
      descSpecList,
      descLong2,
      mediaUrlList,
      inStock
    }) => ({
      id,
      name,
      price,
      descLong1,
      descSpecList,
      descLong2,
      mediaUrlList,
      inStock
    })
  );

  const [itemsQtys, setItemsQtys] = useState<ProductQtyType[]>([]);

  useEffect(() => {
    const savedItems = localStorage.getItem("itemsQtys");

    if (savedItems) {
      setItemsQtys(JSON.parse(savedItems));
    }
    else {
      const defaultQtys = itemsDetails.map(({ id }) => ({ id, qty: 0 }));
      setItemsQtys(defaultQtys);
    }
  }, [itemsDetails]);

  useEffect(() => {
    if (itemsQtys.length > 0) {
      localStorage.setItem("itemsQtys", JSON.stringify(itemsQtys));
    }
  }, [itemsQtys]);

  return (
    <ItemsDescsContext.Provider value={itemsDescs}>
      <ItemsQtysContext.Provider value={{ itemsQtys, setItemsQtys }}>
        <ItemsContext.Provider value={items}>
          {children}
        </ItemsContext.Provider>  
      </ItemsQtysContext.Provider>
    </ItemsDescsContext.Provider>
  );
}