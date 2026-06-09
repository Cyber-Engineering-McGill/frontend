"use client"

import { Context, useContext } from "react";
import { ProductDescType, ProductQtyContextType } from "../types/producttype";
import { ProductType } from "../types/producttype";
import { ItemsContext, ItemsDescsContext, ItemsQtysContext } from "./initcontexts";

/**
 * Creates a safe context hook that throws if used outside its provider.
 * @param context The React context to use
 * @param name Descriptive name for error messages
 */
function createContextAPI<T>(context: Context<T | undefined>, name: string) {
  return (): T => {
    const ctx = useContext(context);
    if (!ctx) {
      throw new Error(`${name} must be used within its corresponding Provider`);
    }
    return ctx;
  };
}

export const useItems = createContextAPI<ProductType[]>(ItemsContext, "useItems");
export const useItemsQtys = createContextAPI<ProductQtyContextType>(ItemsQtysContext, "useItemsQtys");
export const useItemsDescs = createContextAPI<ProductDescType[]>(ItemsDescsContext, "useItemsDescs");