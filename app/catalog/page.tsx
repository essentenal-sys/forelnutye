"use client";

import { useState } from "react";
import { products, PRICE } from "@/app/lib/data";
import ProductModal from "@/app/components/ProductModal";

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

export default function CatalogPage() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  return (
    <main className="text-white pt-24 pb-20 px-6 max-w-6xl mx-auto">
      <h1 className="font-title text-3xl md:text-5xl text-center mb-16">Каталог</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {products.map((product, i) => (
          <div
            key={i}
            onClick={() => setSelectedProduct(product)}
            className="group relative rounded-2xl overflow-hidden cursor-pointer h-72 md:h-80"
          >
            <img
              src={product.items[0].image}
              className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute top-4 right-4 bg-pink-500 text-white text-sm font-bold px-3 py-1 rounded-full">
              {PRICE} ₽
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="font-title text-2xl mb-3">{product.name}</h3>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {product.items.map((item, j) => (
                    <div
                      key={j}
                      title={item.name}
                      className="w-5 h-5 rounded-full border-2 border-white/30"
                      style={{ backgroundColor: colorMap[item.name] ?? "#888" }}
                    />
                  ))}
                </div>
                <span className="text-white/60 text-sm group-hover:text-pink-400 transition">
                  Подробнее →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </main>
  );
}
