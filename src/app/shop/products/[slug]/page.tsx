import type { ProductFetchType } from '@/app/shop/types/producttype';
import ProductPageClient from './ProductPageClient';

export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SHOP_HOST}/products`);
    const data: ProductFetchType[] = await res.json();
    return data.map((item) => ({ slug: `${item.id}-${item.pageName}` }));
  } catch {
    return [];
  }
}

export default function ProductPage(props: { params: Promise<{ slug: string }> }) {
  return <ProductPageClient params={props.params} />;
}
