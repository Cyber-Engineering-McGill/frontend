"use client"

import React from 'react';
import Item from './item';
import BuyButton from './buybutton';
import InfoButton from './infobutton';
import Background from '@/components/Background';
import { useItems } from '../contexts/usecontexts';
import Quantity from './quantity';

const ItemList = () => {
  const items = useItems();

  return (
    <Background>
      <div className="flex flex-wrap
      gap-6 mx-auto justify-center min-h-screen
      bg-gradient-to-b from-black/70 via-transparent via-50% to-black/70">

        {items.map((item) => (
          <Item
            key={item.id}
            name={item.name}
            imageUrl={item.imageUrl}
            desc={item.desc}
            price={item.price}
            footer={
              <div className="flex space-x-4 justify-center mt-2">
                <BuyButton 
                  key={item.id}
                  name={item.name}
                  imageUrl={item.imageUrl}
                  desc={item.desc}
                  price={item.price}
                  footer={
                    <Quantity 
                      includeCart
                      id={item.id}
                    />
                  }
                >
                  Add to Cart
                </BuyButton>
                <InfoButton href={`/shop/products/${`${item.id}-${item.pageName}`}`}>More Info</InfoButton>
              </div>
            }
          />
        ))}
      </div>
    </Background>
  );
};

export default ItemList;
