'use client';

import type { ProductFetchType } from '@/app/shop/types/producttype';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useItems, useItemsDescs } from '@/app/shop/contexts/usecontexts';
import Quantity from '@/app/shop/components/quantity';
import { use, useState } from 'react';
import { toastSuccess } from '@/components/toastSuccess';

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
  const items = useItems();
  const itemsDescs = useItemsDescs();

  const { slug } = use(props.params);
  const [idPart] = slug.split("-");
  const id = parseInt(idPart, 10);

  const item = items.find((i) => i.id === id);
  const desc = itemsDescs.find((d) => d.id === id);

  const [mediaIndex, setMediaIndex] = useState(0);

  if (!item || !desc) return notFound();

  const media = desc.mediaUrlList;
  const current = media[mediaIndex];

  return (
    <div
      className="w-full min-h-screen pt-[70px] px-5 relative overflow-x-hidden"
      style={{
        backgroundColor: '#000000',
        color: '#f1f1f1',
        backgroundImage: `url(/bg-red2.png)`,
        backgroundSize: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'linear-gradient(to bottom, #000000f2 0%, #000000d9 15%, #00000080 40%, #000000bf 100%)',
          width: '100vw',
          height: '100vh',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto 
      flex flex-col md:flex-row gap-10 px-6 py-10">
        {/* Sidebar: Media Thumbnails + Main */}
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-1/2" style={{ maxWidth: 480 }}>
          <div className="flex flex-row md:flex-col gap-2 h-20 w-auto md:h-auto md:w-20">
            {media.map((item, i) => (
              <button
                key={i}
                onClick={() => setMediaIndex(i)}
                className={`
                  cursor-pointer border rounded overflow-hidden w-full h-[60px] relative
                  ${i === mediaIndex ? "border-2 border-[#e3342f]" : "border border-[#1a1a1a]"}
                `}
              >
                {item.isVideo ? (
                  <video className="object-cover opacity-70" muted>
                    <source src={item.src} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={item.src}
                    alt={`Thumbnail ${i}`}
                    fill
                    className="object-cover"
                  />
                )}
              </button>
            ))}
          </div>


          <div
            className="relative bg-[#141414] rounded-lg overflow-hidden shadow-lg 
            flex items-center justify-center
            w-full aspect-square"
          >
            {current.isVideo ? (
              <video
                key = {current.src}
                controls
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              >
                <source src={current.src} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={current.src}
                alt="Product"
                fill
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
            )}
          </div>
        </div>

        {/* Right side: Text + Quantity */}
        <div className="w-full md:w-1/2 space-y-6">
          <div>
            <h1 className="font-author text-3xl sm:text-4xl font-bold mb-3">
              {item.name}
            </h1>
            <p
              className="text-xl font-semibold mb-2"
              style={{ color: '#e3342f' }}
            >
              ${item.price.toFixed(2)}
            </p>
          </div>

          <p style={{ color: '#b3b3b3' }}>{desc.descLong1}</p>

          <p style={{ color: '#b3b3b3' }}>Some of the cool features:</p>
          <ul className="list-disc list-inside" style={{ color: '#8d99ae' }}>
            {desc.descSpecList.map((spec, i) => (
              <li key={i}>{spec}</li>
            ))}
          </ul>

          <p style={{ color: '#b3b3b3' }}>{desc.descLong2}</p>

          <p
            className="font-medium"
            style={{
              color: desc.inStock ? '#2ecc40' : '#e3342f',
            }}
          >
            {desc.inStock ? 'In Stock' : 'Out of Stock'}
          </p>

          <Quantity id={item.id} includeCart outerStyleName='justify-start' 
            onAddToCartExtra={() => toastSuccess("Successfully added to cart.")}
          />
        </div>
      </div>
    </div>
  );
}
