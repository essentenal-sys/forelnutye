import Link from "next/link";
import { products, PRICE } from "@/app/lib/data";

const gradients = [
  "linear-gradient(135deg, #1a0a2e 0%, #2d1b69 100%)",
  "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #24243e 100%)",
  "linear-gradient(135deg, #1a0533 0%, #6b21a8 100%)",
  "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
];

export default function CatalogPage() {
  return (
    <main className="text-white pt-24 pb-20 px-6 max-w-2xl mx-auto">
      <h1 className="font-title text-3xl md:text-5xl text-center mb-12">Каталог</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {products.map((product, i) => {
          const coverImage = product.cover ?? product.items?.[0]?.image;
          return (
            <Link
              key={i}
              href={`/catalog/${product.slug}`}
              className="group relative rounded-2xl overflow-hidden h-44 flex items-end block"
              style={coverImage ? undefined : { background: gradients[i % gradients.length] }}
            >
              {coverImage && (
                <img
                  src={coverImage}
                  className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="relative p-5 w-full flex items-end justify-between">
                <div>
                  <h3 className="font-title text-2xl mb-1">{product.name}</h3>
                  <span className="text-pink-400 font-bold text-sm">{PRICE} ₽</span>
                </div>
                <span className="text-white/50 text-sm group-hover:text-pink-400 transition">
                  Подробнее →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
