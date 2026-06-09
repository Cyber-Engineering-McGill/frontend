"use client"

import { createContext } from "react";
import { ProductDescType, ProductQtyContextType } from "../types/producttype";
import { ProductType } from "../types/producttype";

export const ItemsContext = createContext<ProductType[] | undefined>(undefined);
export const ItemsQtysContext = createContext<ProductQtyContextType | undefined>(undefined);
export const ItemsDescsContext = createContext<ProductDescType[] | undefined>(undefined);