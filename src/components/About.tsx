"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import TextScramble from "./TextScramble";

const EXEC_TEAMS: Record<
  "2026" | "2025" | "2024",
  { name: string; role: string; img: string }[]
> = {
  "2026": [
    {
      name: "Bill Huynh-Lu",
      role: "President",
      img: "/images/execs/2025/bill.png",
    },
    {
      name: "Amir Saadati",
      role: "VP Internal",
      img: "/images/execs/default.png",
    },
    {
      name: "Khaled Boubekeur",
      role: "VP External",
      img: "/images/execs/2025/khaled.png",
    },
    {
      name: "Joonhyun Chang",
      role: "VP Tech Lead",
      img: "/images/execs/2025/joon.png",
    },
    {
      name: "Yelin Eom",
      role: "VP Hardware Mentor",
      img: "/images/execs/2025/yelin.png",
    },
    {
      name: "Yun Z.",
      role: "VP Software Mentor",
      img: "/images/execs/default.png",
    },
    {
      name: "Maral Ganbat",
      role: "VP Communications",
      img: "/images/execs/2025/maral.jpg",
    },
    {
      name: "Hoai Nam To",
      role: "VP Finance",
      img: "/images/execs/2025/nam.png",
    },
    {
      name: "Haozhen Ji",
      role: "Mentor",
      img: "/images/execs/2025/haozhen.png",
    },
    {
      name: "Yangxiang Li",
      role: "Mentor",
      img: "/images/execs/2025/yang.png",
    },
    {
      name: "Kevin Wu",
      role: "Mentor",
      img: "/images/execs/default.png",
    },
    {
      name: "Lina Guezi",
      role: "Media Coordinator",
      img: "/images/execs/default.png",
    },
    {
      name: "Harini V. Reddy",
      role: "Events Coordinator",
      img: "/images/execs/default.png",
    },
    {
      name: "Elodie Su",
      role: "Events Coordinator",
      img: "/images/execs/default.png",
    },
  ],

  "2025": [
    {
      name: "Bill Huynh-Lu",
      role: "President",
      img: "/images/execs/2025/bill.png",
    },
    {
      name: "Amir Saadati",
      role: "VP Internal",
      img: "/images/execs/default.png",
    },
    {
      name: "Khaled Boubekeur",
      role: "VP External",
      img: "/images/execs/2025/khaled.png",
    },
    {
      name: "Joonhyun Chang",
      role: "VP Tech Lead",
      img: "/images/execs/2025/joon.png",
    },
    {
      name: "Yelin Eom",
      role: "VP Hardware Mentor",
      img: "/images/execs/2025/yelin.png",
    },
    {
      name: "Yun Z.",
      role: "VP Software Mentor",
      img: "/images/execs/default.png",
    },
    {
      name: "Maral Ganbat",
      role: "VP Communications",
      img: "/images/execs/2025/maral.jpg",
    },
    {
      name: "Hoai Nam To",
      role: "VP Finance",
      img: "/images/execs/2025/nam.png",
    },
    {
      name: "Haozhen Ji",
      role: "Mentor",
      img: "/images/execs/2025/haozhen.png",
    },
    {
      name: "Yangxiang Li",
      role: "Mentor",
      img: "/images/execs/2025/yang.png",
    },
    {
      name: "Kevin Wu",
      role: "Mentor",
      img: "/images/execs/default.png",
    },
    {
      name: "Lina Guezi",
      role: "Media Coordinator",
      img: "/images/execs/default.png",
    },
    {
      name: "Harini V. Reddy",
      role: "Events Coordinator",
      img: "/images/execs/default.png",
    },
    {
      name: "Elodie Su",
      role: "Events Coordinator",
      img: "/images/execs/default.png",
    },
  ],

  "2024": [
    {
      name: "Joonhyun Chang",
      role: "Co-Founder",
      img: "/images/execs/2025/joon.png",
    },
    {
      name: "Kalan Li",
      role: "Co-Founder",
      img: "/images/execs/2025/kalan.png",
    },
    {
      name: "Yangxiang Li",
      role: "Co-Founder",
      img: "/images/execs/2025/yang.png",
    },
    {
      name: "Bill Huynh-Lu",
      role: "Co-Founder",
      img: "/images/execs/2025/bill.png",
    },
  ],
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function AboutPage() {
  const allYears = Object.keys(EXEC_TEAMS)
    .map(Number)
    .sort((a, b) => a - b);
  const presentYear = Math.max(
    ...allYears,
  ).toString() as keyof typeof EXEC_TEAMS;
  const [selectedYear, setSelectedYear] =
    useState<typeof presentYear>(presentYear);

  const pastYears = allYears.filter((y) => y < +presentYear).reverse(); // newest-first

  const Chip = (year: keyof typeof EXEC_TEAMS) => (
    <button
      key={year}
      onClick={() => setSelectedYear(year)}
      className={`rounded-full border px-3 py-1 transition
        ${
          year === selectedYear
            ? "bg-red-500 border-red-500"
            : "border-red-500 text-red-400 hover:bg-red-500/20"
        }
      `}
    >
      {year}
    </button>
  );

  const PersonCard = ({
    name,
    role,
    img,
  }: {
    name: string;
    role: string;
    img: string;
  }) => (
    <motion.div
      key={name}
      whileHover={{ scale: 1.15 }}
      className="basis-1/2 sm:basis-1/3 lg:basis-[20%] lg:max-w-[20%] flex flex-col items-center space-y-2 text-center"
    >
      <div className="relative h-26 w-26">
        <Image
          src={img}
          alt={`${name} avatar`}
          fill
          className="rounded-full border-red-500 border-2 object-cover"
        />
      </div>
      <p className="text-sm font-semibold">{name}</p>
      <p className="text-xs text-red-400">{role}</p>
    </motion.div>
  );

  const currentTeam = EXEC_TEAMS[selectedYear];

  const mentors = currentTeam.filter(
    ({ role }) => role.trim().toLowerCase() === "mentor",
  );

  const isCoordinator = ({ name, role }: { name: string; role: string }) => {
    const n = name.toLowerCase();
    const r = role.toLowerCase();
    return n.includes("coordinator") || r.includes("coordinator");
  };
  const coordinators = currentTeam.filter(isCoordinator);

  const execs = currentTeam.filter(
    (p) => p.role.trim().toLowerCase() !== "mentor" && !isCoordinator(p),
  );

  return (
    <div id="about" className="bg-black text-white overflow-x-hidden">
      <section className="relative z-10 bg-[#181818c4] px-6 py-[clamp(4rem,10vw,10rem)]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="font-author text-[clamp(2.25rem,6vw,3.5rem)] mb-12 text-center"
        >
          <TextScramble
            text="About Our Club"
            className="font-author text-[clamp(3rem,8vw,4rem)] md:text-[clamp(3rem,6vw,3rem)] leading-tight whitespace-normal break-normal"
          />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto flex max-w-6xl flex-col items-center gap-10 md:flex-row"
        >
          <div className="relative flex-1 h-72 md:h-96 w-full">
            <Image
              src="/images/item1.jpg"
              alt="Club activity"
              fill
              className="rounded-lg object-cover shadow-lg"
            />
          </div>

          <ul className="flex-1 space-y-4 text-[clamp(1rem,3.5vw,1.125rem)] leading-relaxed">
            <li>
              <span className="text-red-400 font-semibold">
                Hands-on Security Engineering:
              </span>
              &nbsp;build & break <em>hardware</em> and <em>software</em>{" "}
              systems to understand real-world threats.
            </li>
            <li>
              <span className="text-red-400 font-semibold">
                CTFs & Workshops:
              </span>
              &nbsp;weekly CTF challenges, hardware workshops and competitive
              events to sharpen your cybersecurity knowledge.
            </li>
            <li>
              <span className="text-red-400 font-semibold">
                Hardware Hacking Projects:
              </span>
              &nbsp;design Bluetooth sniffers, RFID cloners, Wi-Fi deauthers and
              much more!
            </li>
            <li>
              <span className="text-red-400 font-semibold">Ethics First:</span>
              &nbsp;everything we do is strictly educational and compliant with
              Canadian law.
            </li>
          </ul>
        </motion.div>
      </section>

      <section className="bg-black px-6 py-[clamp(4rem,10vw,8rem)]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-8 text-center text-[clamp(1.75rem,5vw,2.5rem)] font-author"
        >
          Our {selectedYear} Executive Team
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12 flex flex-col items-center gap-10 sm:flex-row sm:justify-center sm:gap-12 text-sm"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="uppercase tracking-wider text-gray-400">
              Current&nbsp;Team
            </span>
            {Chip(presentYear)}
          </div>

          {pastYears.length > 0 && (
            <div className="flex flex-col items-center gap-2">
              <span className="uppercase tracking-wider text-gray-400">
                Past&nbsp;Teams
              </span>
              <div className="flex flex-wrap justify-center gap-2">
                {pastYears.map((y) =>
                  Chip(y.toString() as keyof typeof EXEC_TEAMS),
                )}
              </div>
            </div>
          )}
        </motion.div>

        <div className="mx-auto max-w-6xl">
          <AnimatePresence mode="wait">
            {/* VPs & Execs */}
            <motion.div
              key={`${selectedYear}-execs`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="grid gap-y-8 grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap lg:justify-center"
            >
              {execs.length === 0 ? (
                <p className="col-span-full text-center text-gray-400">
                  Coming soon.
                </p>
              ) : (
                execs.map(({ name, role, img }) => (
                  <PersonCard key={name} name={name} role={role} img={img} />
                ))
              )}
            </motion.div>

            {/* Mentors section */}
            {mentors.length > 0 && (
              <motion.div
                key={`${selectedYear}-mentors`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <div className="my-10 flex items-center gap-4">
                  <div className="h-px flex-1 bg-red-500/30" />
                  <span className="text-sm uppercase tracking-widest text-gray-400">
                    Mentors
                  </span>
                  <div className="h-px flex-1 bg-red-500/30" />
                </div>

                <div className="grid gap-y-8 grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap lg:justify-center">
                  {mentors.map(({ name, role, img }) => (
                    <PersonCard key={name} name={name} role={role} img={img} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Coordinators */}
            {coordinators.length > 0 && (
              <>
                <div className="my-10 flex items-center gap-4">
                  <div className="h-px flex-1 bg-red-500/30" />
                  <span className="text-sm uppercase tracking-widest text-gray-400">
                    Coordinators
                  </span>
                  <div className="h-px flex-1 bg-red-500/30" />
                </div>

                <motion.div
                  key={`${selectedYear}-coordinators`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="grid gap-y-8 grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap lg:justify-center"
                >
                  {coordinators.map(({ name, role, img }) => (
                    <PersonCard key={name} name={name} role={role} img={img} />
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
