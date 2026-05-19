import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/app/context/cart";
import Nav from "@/app/components/Nav";
import CartButton from "@/app/components/CartButton";
import CartPanel from "@/app/components/CartPanel";
import OrderForm from "@/app/components/OrderForm";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Форельнутые",
  description: "Приманки для форели",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={montserrat.className}>
        <CartProvider>
          <Nav />
          {children}
          <CartButton />
          <CartPanel />
          <OrderForm />
        </CartProvider>
      </body>
    </html>
  );
}
