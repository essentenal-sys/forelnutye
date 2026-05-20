"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { products, PRICE } from "@/app/lib/data";
import { useCart } from "@/app/context/cart";

const colorMap: Record<string, string> = {
  "Оранжевый": "#f97316",
  "Зелёный": "#22c55e",
  "Розовый": "#ec4899",
  "Жёлтый": "#fbbf24",
  "Белый": "#e2e8f0",
  "Чёрный": "#1c1c1e",
  "Красный": "#ef4444",
  "Фиолетовый": "#a855f7",
};

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const { addToCart } = useCart();
  const product = products.find((p) => p.slug === slug);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <main className="text-white pt-32 px-6 text-center">
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
    <div style={{ minHeight: "100vh", background: "#111" }}>
      {/* Фото на всю ширину с отступом под навбар */}
      <div className="relative w-full" style={{ paddingTop: "64px" }}>
        <img
          src={selected.image}
          alt={product.name}
          className="w-full object-cover transition duration-300"
          style={{ height: "300px" }}
        />
        <button
          onClick={() => router.back()}
          className="absolute top-20 left-4 flex items-center gap-1 text-white text-sm px-3 py-1.5 rounded-full"
          style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
        >
          ← Каталог
        </button>
      </div>

      {/* Контент */}
      <div style={{ background: "#111", padding: "32px 24px 60px" }}>
        <div style={{ maxWidth: "520px", margin: "0 auto" }}>

          <h1 className="font-title text-white mb-6" style={{ fontSize: "2rem" }}>
            {product.name}
          </h1>

          {/* Цвет */}
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", marginBottom: "12px" }}>
            Цвет: <span style={{ color: "#fff" }}>{selected.name}</span>
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "32px" }}>
            {product.items.map((item, i) => (
              <button
                key={i}
                onClick={() => { setSelectedIndex(i); setQty(1); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 18px",
                  borderRadius: "12px",
                  border: selectedIndex === i ? "2px solid #ec4899" : "2px solid rgba(255,255,255,0.15)",
                  background: selectedIndex === i ? "rgba(236,72,153,0.15)" : "rgba(255,255,255,0.05)",
                  color: "#fff",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                <span style={{
                  width: "14px", height: "14px", borderRadius: "50%",
                  background: colorMap[item.name] ?? "#888",
                  border: "1px solid rgba(255,255,255,0.3)",
                  flexShrink: 0,
                }} />
                {item.name}
              </button>
            ))}
          </div>

          {/* Цена + количество */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
            <span style={{ color: "#fff", fontSize: "2rem", fontWeight: 700 }}>
              {PRICE * qty} ₽
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              {[["−", () => setQty(q => Math.max(1, q - 1))], ["+", () => setQty(q => q + 1)]].map(([label, fn], i) => (
                <button key={i} onClick={fn as () => void}
                  style={{
                    width: "40px", height: "40px", borderRadius: "50%",
                    background: "rgba(255,255,255,0.1)", color: "#fff",
                    fontSize: "20px", border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >{label as string}</button>
              ))}
              <span style={{ color: "#fff", fontSize: "18px", fontWeight: 600, minWidth: "20px", textAlign: "center" }}>
                {qty}
              </span>
            </div>
          </div>

          {/* Кнопка в корзину */}
          <button
            onClick={handleAdd}
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "16px",
              border: "none",
              background: added ? "#22c55e" : "#ec4899",
              color: "#fff",
              fontSize: "18px",
              fontWeight: 700,
              cursor: "pointer",
              transition: "background 0.2s",
              fontFamily: "inherit",
            }}
          >
            {added ? "Добавлено ✓" : "В корзину"}
          </button>
        </div>
      </div>
    </div>
  );
}
