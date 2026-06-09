interface ItemOrderProps {
  name: string;
  price: number;
  qty: number;
}

export default function ItemOrder( { name, price, qty }: ItemOrderProps ) {

  return (
    <div className="overflow-hidden flex flex-nowrap
    text-white text-lg">
      <p className="font-semibold truncate w-3/5 flex-none">{name}</p>
      <p className="w-1/5 flex-none text-right">{`$${price.toFixed(2)}`}</p>
      <p className="w-1/5 flex-none text-right">{`x${qty}`}</p>
    </div>
  )
}