"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Главная" },
  { href: "/catalog", label: "Каталог" },
  { href: "/reviews", label: "Отзывы" },
  { href: "/delivery", label: "Доставка" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-4 bg-zinc-950/90 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center gap-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm font-medium transition ${
              pathname === link.href
                ? "text-white"
                : "text-white/50 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs text-white/50 hidden md:block">
          +7 (999) 999-99-99
        </span>
        <div className="flex gap-2">
          <a href="https://vk.com/paidfishing" target="_blank">
            <img src="/vk.svg" className="w-5" />
          </a>
          <a href="https://t.me/+ePTez2ROSA44YzAy" target="_blank">
            <img src="/tg.svg" className="w-5" />
          </a>
          <a href="https://www.youtube.com/@paidfishing" target="_blank">
            <img src="/yt.svg" className="w-5" />
          </a>
        </div>
      </div>
    </nav>
  );
}
