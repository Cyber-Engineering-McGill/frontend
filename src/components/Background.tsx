interface BackgroundProps {
  children: React.ReactNode;
}

export default function Background( {children}: BackgroundProps) {
  return (
    <div className="bg-[#000000] flex flex-col min-h-screen">
      <div className="h-navbar"></div>
      <div
        className="w-full flex-grow"
        style={{
          backgroundImage: `url(/bg-red2.png)`,
          backgroundPosition: 'center',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed', 
        }}>
          {children}
      </div>
    </div>
  )
}