import Background from "@/components/Background";

export default function StripeSuccess() {
    return (
        <Background>
            <div className={`min-h-[calc(100vh-var(--navbar-h))] px-4 sm:px-8 md:px-12 lg:px-16 w-full py-8
                bg-gradient-to-b from-black/70 via-transparent via-50% to-black/70
                flex flex-col lg:flex-row gap-4 overflow-x-hidden align-middle justify-center items-center`}>
                <h1 className="text-1xl sm:text-2xl font-semibold text-center text-white">
                    If Stripe confirmed your order, make sure you have your email receipt and reach out to us by email for pickup!
                </h1>  
            </div>
        </Background>
    );
}

