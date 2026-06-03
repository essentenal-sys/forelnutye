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

  const [pickingIndex, setPickingIndex] = useState<number | null>(null);
  const [qtys, setQtys] = useState<Record<number, number>>({});
  const [addedIndex, setAddedIndex] = useState<number | null>(null);

  if (!product) {
    return (
      <main className="text-white pt-32 px-6 text-center">
        <p>Товар не найден</p>
      </main>
    );
  }

  const items = product.items ?? [];

  const getQty = (i: number) => qtys[i] ?? 1;

  const setQty = (i: number, v: number) =>
    setQtys((prev) => ({ ...prev, [i]: Math.max(1, v) }));

  const handleAdd = (i: number) => {
    addToCart(product.name, getQty(i), items[i]?.name);
    setPickingIndex(null);
    setQtys((prev) => ({ ...prev, [i]: 1 }));
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
                    {PRICE * getQty(i)} ₽
                  </span>

                  {addedIndex === i ? (
                    <button disabled style={{
                      width: "100%", padding: "10px", borderRadius: "10px",
                      border: "none", background: "#22c55e", color: "#fff",
                      fontSize: "14px", fontWeight: 700, fontFamily: "inherit",
                    }}>
                      Добавлено ✓
                    </button>
                  ) : pickingIndex === i ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                        <button
                          onClick={() => setQty(i, getQty(i) - 1)}
                          style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", color: "#fff", fontSize: "18px", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit" }}
                        >−</button>
                        <span style={{ fontSize: "16px", fontWeight: 600, minWidth: "20px", textAlign: "center" }}>
                          {getQty(i)}
                        </span>
                        <button
                          onClick={() => setQty(i, getQty(i) + 1)}
                          style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", color: "#fff", fontSize: "18px", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit" }}
                        >+</button>
                      </div>
                      <button
                        onClick={() => handleAdd(i)}
                        style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "none", background: "#ec4899", color: "#fff", fontSize: "14px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
                      >
                        В корзину →
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setPickingIndex(i)}
                      style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "none", background: "#ec4899", color: "#fff", fontSize: "14px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginTop: "auto" }}
                    >
                      В корзину
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
