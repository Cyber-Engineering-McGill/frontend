// Types for stored elements

// Read-only: items
export interface ProductType {
  name: string;
  imageUrl: string;
  desc: string;
  price: number;
  id: number;
  pageName: string;
};

// Read/write: itemsQtys
export interface ProductQtyType {
  id: number;
  qty: number;
};

export interface MediaUrlType {
  isVideo: boolean;
  src: string;
};

// Read-only: itemsDescs
export interface ProductDescType {
  id: number;
  name: string;
  price: number;
  descLong1: string;
  descSpecList: string[];
  descLong2: string;
  mediaUrlList: MediaUrlType[];
  inStock: boolean;
};

// Contains all details about product matching items stored in db
export type ProductCompleteDetailsType = Omit<ProductType, 'imageUrl'> & ProductDescType;

export type ProductFetchType = {
  id: number;
  name: string;
  price: number;
  pageName: string;
  descShort: string;
  descLong1: string;
  descLong2: string;
  inStock: boolean;
  descSpecList: string[];
  mediaUrlList: MediaUrlType[];
}

export interface ProductQtyContextType {
  itemsQtys: ProductQtyType[];
  setItemsQtys: React.Dispatch<React.SetStateAction<ProductQtyType[]>>;
}

