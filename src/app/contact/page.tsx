import Link from "next/link"; 
import TextScramble from "../../components/TextScramble";

export const metadata = { title: "Contact Us" };

const officers = [
  {
    role: "President",
    name: "Bill Huynh-Lu",
    email: "bill.huynh-lu@mail.mcgill.ca",
  },
  { role: "VP Internal", name: "Kalan Li", email: "kalan.li@mail.mcgill.ca" },
  {
    role: "VP External",
    name: "Maral Ganbat",
    email: "maral.ganbat@mail.mcgill.ca",
  },
  {
    role: "VP Tech Lead",
    name: "Joonhyun Chang",
    email: "joonhyun.chang@mail.mcgill.ca",
  },
  {
    role: "VP Software Mentor",
    name: "Yun Z.",
    email: "",
  },
  {
    role: "VP Hardware Mentor",
    name: "Yelin Eom",
    email: "yelin.eom@mail.mcgill.ca",
  },
  { role: "VP Finance", name: "Nam To", email: "hoai.to@mail.mcgill.ca" },
  {
    role: "VP Communications",
    name: "Khaled Boubekeur",
    email: "khaled.boubekeur@mail.mcgill.ca",
  },
  {
    role: "Mentor",
    name: "Yangxiang Li",
    email: "yangxiang.li@mail.mcgill.ca",
  },
  { role: "Mentor", name: "Haozhen Ji", email: "haozhen.ji@mail.mcgill.ca" },
];

export default function ContactPage() {
  return (
    <section className="relative isolate flex min-h-screen items-start justify-center py-32 bg-black">
      <span
        className="absolute inset-0 pointer-events-none
                   bg-black/60
                   mask-[radial-gradient(ellipse_at_center,transparent_55%,black_95%)]"
      />

      <div className="relative z-10 w-full max-w-3xl px-6 text-gray-100">
        <TextScramble
          text="Get In Touch"
          className="font-author text-3xl sm:text-4xl font-medium mb-8"
        />

        <div className="space-y-3 mb-10">
          
          <p>
            <span className="font-medium">Linktree: </span>
            <Link
              href="https://linktr.ee/cybermcgill"
              target="_blank"
              className="text-red-400 hover:underline"
            >
              linktr.ee/cybermcgill
            </Link>
          </p>

          
          <p>
            <span className="font-medium">
              General Inquiries / Sponsorship:{" "}
            </span>
            <a
              href="mailto:info@cyberengmcgill.ca"
              className="text-red-400 hover:underline"
            >
              cyber@mcgilleus.ca
            </a>
          </p>
        </div>

        <TextScramble
          text="Executive Team / Staff"
          className="font-author text-3xl sm:text-4xl font-medium mb-8"
        />
        <ul className="divide-y divide-white/10">
          {officers.map(({ role, name, email }) => (
            <li
              key={email}
              className="py-2 flex flex-col sm:flex-row sm:items-center sm:gap-2"
            >
              <span className="w-40 font-medium text-gray-300">{role}</span>
              <span className="flex-1">{name}</span>
              <a
                href={`mailto:${email}`}
                className="text-red-400 hover:underline"
              >
                {email}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
