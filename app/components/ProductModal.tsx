"use client";

import { useRef, useState } from "react";
import { useCart } from "@/app/context/cart";
import { PRICE } from "@/app/lib/data";

export default function ProductModal({ product, onClose }: { product: any; onClose: () => void }) {
  const { addToCart, cartRef } = useCart();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const imgRef = useRef<HTMLImageElement>(null);
  const selected = product.items[selectedIndex];

  const handleAdd = () => {
    if (imgRef.current && cartRef.current) {
      const rect = imgRef.current.getBoundingClientRect();
      const cartRect = cartRef.current.getBoundingClientRect();
      const clone = imgRef.current.cloneNode(true) as HTMLImageElement;
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
    addToCart(product.name, selected, null, qty);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70" onClick={onClose}>
      <div
        className="bg-zinc-900/60 backdrop-blur-md w-full max-w-lg rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex-shrink-0">
          <img ref={imgRef} src={selected.image} className="w-full h-64 sm:h-72 object-cover transition duration-300" />
          <button onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-black/60 rounded-full flex items-center justify-center text-white/70 hover:text-white">
            ✕
          </button>
        </div>

        <div className="p-6 flex flex-col gap-5 overflow-y-auto">
          <h2 className="font-title text-2xl">{product.name}</h2>

          <div>
            <p className="text-xs text-white/50 mb-2">
              Цвет: <span className="text-white">{selected.name}</span>
            </p>
            <div className="flex gap-2 flex-wrap">
              {product.items.map((item: any, i: number) => (
                <button key={i} onClick={() => { setSelectedIndex(i); setQty(1); }}
                  className={`px-4 py-2 rounded-lg text-sm transition ${selectedIndex === i ? "bg-pink-500" : "bg-white/10 hover:bg-white/20"}`}>
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">{PRICE * qty} ₽</span>
            <div className="flex items-center gap-3">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xl leading-none">−</button>
              <span className="w-5 text-center font-medium">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xl leading-none">+</button>
            </div>
          </div>

          <button onClick={handleAdd}
            className="w-full bg-pink-500 hover:bg-pink-400 py-3 rounded-xl font-title text-lg transition">
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
}
