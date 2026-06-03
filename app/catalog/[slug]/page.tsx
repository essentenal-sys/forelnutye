"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { products, PRICE } from "@/app/lib/data";
import { useCart } from "@/app/context/cart";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const { addToCart } = useCart();
  const product = products.find((p) => p.slug === slug);
  const [addedIndex, setAddedIndex] = useState<number | null>(null);

  if (!product) {
    return (
      <main className="text-white pt-32 px-6 text-center">
        <p>Товар не найден</p>
      </main>
    );
  }

  const items = product.items ?? [];

  const handleAdd = (i: number) => {
    addToCart(product.name, 1, items[i]?.name);
    setAddedIndex(i);
    setTimeout(() => setAddedIndex(null), 1500);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#111" }} className="text-white">
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "90px 24px 60px" }}>

        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-sm mb-8 transition"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          ← Каталог
        </button>

        <h1 className="font-title mb-10" style={{ fontSize: "2.2rem" }}>
          {product.name}
        </h1>

        {items.length === 0 ? (
          <p style={{ color: "rgba(255,255,255,0.4)" }}>Скоро появится в наличии</p>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "16px",
          }}>
            {items.map((item, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.04)",
                borderRadius: "16px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}>
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "100%", aspectRatio: "1", objectFit: "cover" }}
                  />
                ) : (
                  <div style={{
                    width: "100%", aspectRatio: "1",
                    background: item.color ?? "rgba(255,255,255,0.06)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "12px", color: "rgba(255,255,255,0.3)",
                  }}>
                    Фото скоро
                  </div>
                )}

                <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {item.color && (
                      <span style={{
                        width: "14px", height: "14px", borderRadius: "50%",
                        background: item.color,
                        border: "1px solid rgba(255,255,255,0.2)",
                        flexShrink: 0,
                      }} />
                    )}
                    <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", lineHeight: 1.3 }}>
                      {item.name}
                    </span>
                  </div>

                  <span style={{ fontSize: "15px", fontWeight: 700, color: "#ec4899" }}>
                    {PRICE} ₽
                  </span>

                  <button
                    onClick={() => handleAdd(i)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "10px",
                      border: "none",
                      background: addedIndex === i ? "#22c55e" : "#ec4899",
                      color: "#fff",
                      fontSize: "14px",
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "background 0.2s",
                      fontFamily: "inherit",
                      marginTop: "auto",
                    }}
                  >
                    {addedIndex === i ? "Добавлено ✓" : "В корзину"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
