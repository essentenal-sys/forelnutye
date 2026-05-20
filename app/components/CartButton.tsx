"use client";

import { useCart } from "@/app/context/cart";

export default function CartButton() {
  const { totalQty, setCartOpen, cartRef } = useCart();

  return (
    <button
      ref={cartRef}
      onClick={() => setCartOpen(true)}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-2xl transition"
    >
      🛒
      {totalQty > 0 && (
        <span className="absolute -top-2 -right-2 bg-white text-black text-xs px-2 rounded-full">
          {totalQty}
        </span>
      )}
    </button>
  );
}
