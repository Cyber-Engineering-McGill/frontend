"use client";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 backdrop-blur bg-black/40 h-navbar">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo + desktop links */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
              <Image
                src="/logo.png"
                alt="Cyber Engineering McGill"
                fill
                sizes="(min-width: 768px) 3rem, (min-width: 640px) 2.5rem, 2rem"
                className="object-contain"
              />
            </div>
          </Link>

          {/* desktop-only nav */}
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-red-400">
            <li>
              <Link
                href="/registration"
                className="hover:text-white transition"
              >
                Registration
              </Link>
            </li>
            <li>
              <Link href="/sponsors" className="hover:text-white transition">
                Sponsors
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition">
                Contact&nbsp;Us
              </Link>
            </li>
          </ul>
        </div>

        {/* right-side links */}
        <div className="flex items-center gap-6 text-red-400">
          {/* mobile-only Contact link */}
          <Link
            href="/contact"
            className="text-sm font-medium hover:text-white transition md:hidden"
          >
            Contact&nbsp;Us
          </Link>

          <Link
            href="/shop"
            className="text-sm font-medium hover:text-white transition"
          >
            Shop
          </Link>

          <Link
            href="/shop/cart"
            className="relative flex h-8 w-8 items-center justify-center rounded-md border border-red-300/80 text-red-400 hover:bg-red-400/10"
            suppressHydrationWarning
          >
            🛒
          </Link>
        </div>
      </nav>
    </header>
  );
}
