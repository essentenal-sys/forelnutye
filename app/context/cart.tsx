"use client";

import { createContext, useContext, useRef, useState } from "react";
import { PRICE } from "@/app/lib/data";

type CartItem = {
  product: string;
  name: string;
  image: string;
  qty: number;
};

type CartContextType = {
  cart: CartItem[];
  totalQty: number;
  total: number;
  addToCart: (product: string, item: any, imgElement?: HTMLImageElement | null, qty?: number) => void;
  removeItem: (index: number) => void;
  clearCart: () => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  orderOpen: boolean;
  setOrderOpen: (v: boolean) => void;
  cartRef: React.RefObject<HTMLButtonElement | null>;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const cartRef = useRef<HTMLButtonElement | null>(null);

  const addToCart = (
    product: string,
    item: any,
    imgElement?: HTMLImageElement | null,
    qty = 1
  ) => {
    if (imgElement && cartRef.current) {
      const rect = imgElement.getBoundingClientRect();
      const cartRect = cartRef.current.getBoundingClientRect();
      const clone = imgElement.cloneNode(true) as HTMLImageElement;
      clone.style.position = "fixed";
      clone.style.left = rect.left + "px";
      clone.style.top = rect.top + "px";
      clone.style.width = rect.width + "px";
      clone.style.height = rect.height + "px";
      clone.style.borderRadius = "12px";
      clone.style.zIndex = "9999";
      clone.style.transition = "all 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)";
      clone.style.pointerEvents = "none";
      document.body.appendChild(clone);
      requestAnimationFrame(() => {
        clone.style.left = cartRect.left + "px";
        clone.style.top = cartRect.top + "px";
        clone.style.width = "20px";
        clone.style.height = "20px";
        clone.style.opacity = "0.3";
        clone.style.transform = "scale(0.2)";
      });
      setTimeout(() => {
        clone.remove();
        cartRef.current?.classList.add("scale-125");
        setTimeout(() => cartRef.current?.classList.remove("scale-125"), 200);
      }, 700);
    }
    setCart((prev) => [...prev, { product, ...item, qty }]);
  };

  const removeItem = (index: number) =>
    setCart((prev) => prev.filter((_, i) => i !== index));

  const clearCart = () => setCart([]);

  const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
  const total = cart.reduce((sum, i) => sum + i.qty * PRICE, 0);

  return (
    <CartContext.Provider
      value={{ cart, totalQty, total, addToCart, removeItem, clearCart, cartOpen, setCartOpen, orderOpen, setOrderOpen, cartRef }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
