// Type for UI elements

export interface ItemCardProps {
  name: string;
  imageUrl: string;
  desc: string;
  price: number;
  footer: React.ReactNode;
}

export interface ItemDescProps {
  name: string;
  price: number;
  descLong1: string;
  descSpecList: string[];
  descLong2: string;
  qty: number;
  mediaUrlList: string[];
}