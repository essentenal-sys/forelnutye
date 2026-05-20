"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { products, PRICE } from "@/app/lib/data";
import { useCart } from "@/app/context/cart";

const colorMap: Record<string, string> = {
  "Оранжевый": "#f97316",
  "Зелёный": "#22c55e",
  "Розовый": "#ec4899",
  "Жёлтый": "#fbbf24",
  "Белый": "#f1f5f9",
  "Чёрный": "#1c1c1e",
  "Красный": "#ef4444",
  "Фиолетовый": "#a855f7",
};

export default function ProductPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const product = products.find((p) => p.slug === params.slug);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <main className="text-white pt-24 px-6 text-center">
        <p>Товар не найден</p>
      </main>
    );
  }

  const selected = product.items[selectedIndex];

  const handleAdd = () => {
    addToCart(product.name, selected, null, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <main className="text-white min-h-screen">
      {/* Фото */}
      <div className="relative w-full h-72 md:h-96">
        <img
          src={selected.image}
          className="w-full h-full object-cover transition duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm flex items-center gap-2"
        >
          ← Каталог
        </button>
      </div>

      {/* Контент */}
      <div className="px-6 py-8 max-w-lg mx-auto flex flex-col gap-6">
        <h1 className="font-title text-3xl">{product.name}</h1>

        {/* Выбор цвета */}
        <div>
          <p className="text-xs text-white/50 mb-3">
            Цвет: <span className="text-white">{selected.name}</span>
          </p>
          <div className="flex gap-3 flex-wrap">
            {product.items.map((item, i) => (
              <button
                key={i}
                onClick={() => { setSelectedIndex(i); setQty(1); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition border ${
                  selectedIndex === i
                    ? "border-pink-500 bg-pink-500/20 text-white"
                    : "border-white/20 bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                <span
                  className="w-4 h-4 rounded-full border border-white/30 flex-shrink-0"
                  style={{ backgroundColor: colorMap[item.name] ?? "#888" }}
                />
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Цена и количество */}
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold">{PRICE * qty} ₽</span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xl"
            >−</button>
            <span className="w-6 text-center font-medium text-lg">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xl"
            >+</button>
          </div>
        </div>

        {/* Кнопка */}
        <button
          onClick={handleAdd}
          className={`w-full py-4 rounded-2xl font-title text-xl transition ${
            added ? "bg-green-500" : "bg-pink-500 hover:bg-pink-400"
          }`}
        >
          {added ? "Добавлено ✓" : "В корзину"}
        </button>
      </div>
    </main>
  );
}
