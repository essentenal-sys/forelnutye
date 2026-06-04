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
          <a href="https://vk.com/paidfishing" target="_blank" className="text-white/50 hover:text-white transition">
            <svg width="20" height="20" viewBox="2 2 20 20" fill="currentColor">
              <path d="M12.785 16.241s.288-.031.435-.186c.135-.142.13-.41.13-.41s-.019-1.252.563-1.436c.574-.181 1.312 1.21 2.095 1.744.593.406 1.043.317 1.043.317l2.096-.029s1.095-.068.575-.93c-.043-.07-.305-.642-1.569-1.816-1.322-1.228-1.146-1.03.447-3.155.97-1.293 1.358-2.082 1.237-2.42-.116-.322-.83-.237-.83-.237l-2.36.015s-.175-.024-.304.053c-.126.075-.207.25-.207.25s-.374.995-.871 1.841c-1.048 1.783-1.467 1.876-1.638 1.763-.398-.258-.298-1.036-.298-1.59 0-1.729.262-2.452-.51-2.64-.256-.062-.445-.103-1.102-.11-.843-.009-1.555.002-1.959.2-.269.132-.476.426-.35.443.155.02.507.095.694.35.242.33.234 1.07.234 1.07s.138 2.036-.323 2.289c-.316.173-.75-.18-1.681-1.796-.477-.83-.837-1.75-.837-1.75s-.069-.169-.193-.26c-.151-.11-.362-.146-.362-.146l-2.242.014s-.337.009-.461.154c-.11.129-.009.397-.009.397s1.754 4.104 3.739 6.169c1.819 1.894 3.885 1.769 3.885 1.769h.936z"/>
            </svg>
          </a>
          <a href="https://t.me/+ePTez2ROSA44YzAy" target="_blank" className="text-white/50 hover:text-white transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9.04 15.56l-.38 5.32c.55 0 .79-.24 1.07-.53l2.57-2.45 5.33 3.9c.98.54 1.68.26 1.94-.9l3.52-16.5h.01c.31-1.45-.52-2.02-1.48-1.66L1.68 10.2c-1.42.55-1.4 1.34-.24 1.7l5.58 1.74 12.96-8.17c.61-.37 1.16-.17.7.2"/>
            </svg>
          </a>
          <a href="https://www.youtube.com/@paidfishing" target="_blank" className="text-white/50 hover:text-white transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.5 6.2s-.2-1.6-.8-2.3c-.8-.8-1.6-.8-2-.9C17.8 2.8 12 2.8 12 2.8s-5.8 0-8.7.2c-.4.1-1.2.1-2 .9C.7 4.6.5 6.2.5 6.2S.3 8 .3 9.8v1.4c0 1.8.2 3.6.2 3.6s.2 1.6.8 2.3c.8.8 1.9.8 2.4.9 1.8.2 8.3.2 8.3.2s5.8 0 8.7-.2c.4-.1 1.2-.1 2-.9.6-.7.8-2.3.8-2.3s.2-1.8.2-3.6V9.8c0-1.8-.2-3.6-.2-3.6zM9.8 14.6V7.9l6.4 3.4-6.4 3.3z"/>
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
}
