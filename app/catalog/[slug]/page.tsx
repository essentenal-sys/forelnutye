"use client";

import { use, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { products, PRICE } from "@/app/lib/data";
import { useCart } from "@/app/context/cart";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const { addToCart } = useCart();
  const product = products.find((p) => p.slug === slug);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!product) {
    return (
      <main className="text-white pt-32 px-6 text-center">
        <p>Товар не найден</p>
      </main>
    );
  }

  const items = product.items ?? [];
  const selected = items[selectedIndex];

  const handleAdd = () => {
    addToCart(product.name, qty, selected?.name);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#111" }} className="text-white">
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "90px 24px 60px" }}>

        {/* Назад */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-sm mb-8 transition"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          ← Каталог
        </button>

        {/* Основной блок: фото + инфо */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-start">

          {/* Фото */}
          <div className="w-full md:w-1/2">
            {selected?.image ? (
              <img
                src={selected.image}
                alt={product.name}
                className="w-full h-auto rounded-2xl"
              />
            ) : (
              <div className="w-full rounded-2xl flex items-center justify-center"
                style={{ aspectRatio: "1", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.2)", fontSize: "14px" }}>
                Фото скоро
              </div>
            )}
          </div>

          {/* Информация */}
          <div className="w-full md:w-1/2 flex flex-col gap-6">

            <h1 className="font-title" style={{ fontSize: "2rem" }}>
              {product.name}
            </h1>

            {/* Выбор цвета — дропдаун */}
            {items.length > 0 && (
              <div ref={dropdownRef} style={{ position: "relative" }}>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", marginBottom: "8px" }}>
                  Цвет
                </p>
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    border: "2px solid rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.05)",
                    color: "#fff",
                    fontSize: "15px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                    fontFamily: "inherit",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {selected?.color && (
                      <span style={{
                        width: "18px", height: "18px", borderRadius: "50%",
                        background: selected.color,
                        border: "1px solid rgba(255,255,255,0.25)",
                        flexShrink: 0,
                      }} />
                    )}
                    {selected?.name ?? "Выберите цвет"}
                  </span>
                  <span style={{
                    transition: "transform 0.2s",
                    transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                    opacity: 0.5,
                  }}>▼</span>
                </button>

                {dropdownOpen && (
                  <div style={{
                    position: "absolute",
                    top: "calc(100% + 6px)",
                    left: 0,
                    right: 0,
                    background: "#1e1e1e",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "12px",
                    overflow: "hidden",
                    zIndex: 50,
                    maxHeight: "280px",
                    overflowY: "auto",
                  }}>
                    {items.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => { setSelectedIndex(i); setQty(1); setDropdownOpen(false); }}
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          textAlign: "left",
                          background: selectedIndex === i ? "rgba(236,72,153,0.2)" : "transparent",
                          color: selectedIndex === i ? "#ec4899" : "#fff",
                          fontSize: "14px",
                          border: "none",
                          borderBottom: "1px solid rgba(255,255,255,0.06)",
                          cursor: "pointer",
                          fontFamily: "inherit",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        {item.color && (
                          <span style={{
                            width: "16px", height: "16px", borderRadius: "50%",
                            background: item.color,
                            border: "1px solid rgba(255,255,255,0.2)",
                            flexShrink: 0,
                          }} />
                        )}
                        {item.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Цена + количество */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "2rem", fontWeight: 700 }}>
                {PRICE * qty} ₽
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))}
                  style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", color: "#fff", fontSize: "20px", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  −
                </button>
                <span style={{ fontSize: "18px", fontWeight: 600, minWidth: "24px", textAlign: "center" }}>
                  {qty}
                </span>
                <button onClick={() => setQty(q => q + 1)}
                  style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", color: "#fff", fontSize: "20px", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  +
                </button>
              </div>
            </div>

            {/* В корзину */}
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
    </div>
  );
}
