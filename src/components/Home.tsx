import Link from "next/link";

import TextScramble from "./TextScramble";
import Rain from "./Rain";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      
      <Rain />
      <section className="relative z-10 flex min-h-screen items-center justify-center text-center px-6">
        <div className="relative z-10 flex flex-col items-center gap-[clamp(1rem,3vw,2rem)] max-w-3xl">
          <TextScramble
            text="Cyber Engineering McGill"
            className="font-author text-[clamp(2rem,8vw,4rem)] md:text-[clamp(1.5rem,6vw,3rem)] leading-tight whitespace-normal break-normal"
          />

          <p className="text-[clamp(1rem,4vw,1.25rem)] text-white">
            A student-run engineering organization exploring{" "}
            <strong className="text-red-400">software</strong> and{" "}
            <strong className="text-red-400">hardware</strong> cybersecurity
            through workshops, CTFs & hands-on projects.
          </p>

          <div className="flex flex-wrap justify-center gap-[clamp(0.5rem,2vw,1rem)]">
            <Link
              href="/registration"
              className="rounded-md border border-red-500 bg-red-500 text-white font-semibold text-[clamp(0.875rem,3vw,1rem)] px-[clamp(0.5rem,1.5vw,1.25rem)] py-[clamp(0.25rem,1vw,0.75rem)] hover:bg-red-600/75 transition"
            >
              Join Our Club
            </Link>

            <Link
              href="/sponsors"
              className="rounded-md border border-red-500 text-red-400 font-semibold text-[clamp(0.875rem,3vw,1rem)] px-[clamp(0.5rem,1.5vw,1.25rem)] py-[clamp(0.25rem,1vw,0.75rem)] hover:bg-red-300/10 transition"
            >
              Our Sponsors
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
