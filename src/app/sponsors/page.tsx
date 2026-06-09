import Link from "next/link";
import Image from "next/image";
import TextScramble from "../../components/TextScramble";

export const metadata = { title: "Sponsors" };

const sponsors = [
  {
    name: "1",
    logo: "/sponsorlogos/placeholder1.png",
    url: "https://example.com",
  },
  {
    name: "2",
    logo: "/sponsorlogos/placeholder1.png",
    url: "https://example.com",
  },
  {
    name: "3",
    logo: "/sponsorlogos/placeholder1.png",
    url: "https://example.com",
  },
  {
    name: "4",
    logo: "/sponsorlogos/placeholder1.png",
    url: "https://example.com",
  },
  {
    name: "5",
    logo: "/sponsorlogos/placeholder1.png",
    url: "https://example.com",
  },
];

export default function ContactPage() {
  return (
    <section className="relative isolate flex min-h-screen items-start justify-center pt-32 bg-black">
      <span
        className="absolute inset-0 pointer-events-none
                   bg-black/60
                   mask-[radial-gradient(ellipse_at_center,transparent_55%,black_95%)]"
      />

      <div className="relative z-10 w-full max-w-3xl px-6 text-gray-100">
        <TextScramble
          text="Why Sponsor Us?"
          className="font-author text-3xl sm:text-4xl font-medium mb-4"
        />
        <div className="space-y-3 mb-4">
          <p className="leading-loose">
            <span className="">
              Your support helps us maintain and expand a wide range of club
              initiatives.
              <br />
              &bull; <strong>McGill CTF</strong> — Support McGill&apos;s annual
              Capture The Flag competition
              <br />
              &bull; <strong>Hardware Projects</strong> — Help fund electronic
              parts and components for our hardware division
              <br />
              &bull; <strong>Talent Pipeline</strong> — You get to directly
              connect with the best student talent!
              <br />
              ... and more!
            </span>
          </p>
          <p>
            <span className="">To join our list of sponsors, </span>
            <a
              href="/contact"
              className="text-red-400 font-medium hover:underline"
            >
              Contact Us.
            </a>
          </p>
        </div>

        <TextScramble
          text="Our Sponsors"
          className="font-author text-3xl sm:text-4xl font-medium mb-8"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16">
          {sponsors.map(({ name, logo, url }) => (
            <Link
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <div className="w-full h-48 bg-gray-800 rounded-lg p-6 flex items-center justify-center hover:bg-gray-700 transition">
                <Image
                  src={logo}
                  alt={name}
                  width={300}
                  height={200}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
