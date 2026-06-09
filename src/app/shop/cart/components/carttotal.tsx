interface CartTotalProps {
  subtotal: number;
}

export default function CartTotal({ subtotal }: CartTotalProps) {
  const TPS = subtotal * 0.05;
  const TVQ = subtotal * 0.09975;
  const total = subtotal + TPS + TVQ;

  return (
    <div className="w-full flex flex-nowrap justify-between">
      <h2 className="w-1/2 flex-none text-white font-bold text-2xl lg:text-3xl">Subtotal: </h2>
      <div className="w-1/2 flex-none flex flex-col gap-2 text-white text-lg text-right">
        <p className="text-2xl lg:text-3xl font-bold">${subtotal.toFixed(2)}</p>
        <p>TPS: ${TPS.toFixed(2)}</p>
        <p>TVQ: ${TVQ.toFixed(2)}</p>
        <p className="text-xl lg:text-2xl">Total: <span className="font-semibold">${total.toFixed(2)}</span></p>
      </div>
    </div>
  );
}
