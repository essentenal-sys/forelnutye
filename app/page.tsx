import SwimmingFish from "@/app/components/SwimmingFish";

export default function Home() {
  return (
    <main className="text-white">
      <section className="relative min-h-screen flex flex-col items-center text-center overflow-hidden">

        {/* Логотип */}
        <div className="mt-16 md:mt-20 mb-3">
          <img src="/logo.png" className="w-36 md:w-56" />
        </div>

        {/* Заголовок */}
        <h1 className="font-title text-3xl md:text-6xl lg:text-7xl mb-5 px-4 leading-tight">
          ПРИМАНКИ, КОТОРЫЕ <br /> РАБОТАЮТ
        </h1>

        {/* Кнопки */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <a
            href="/catalog"
            className="inline-block px-8 py-3 md:px-10 md:py-4 bg-pink-500 hover:bg-pink-400 rounded-full font-title text-lg md:text-xl transition"
          >
            В магазин
          </a>
          <a
            href="/reviews"
            className="inline-block px-8 py-3 md:px-10 md:py-4 bg-white/10 hover:bg-white/20 rounded-full font-title text-lg md:text-xl transition"
          >
            Отзывы
          </a>
        </div>

        {/* Рыба — под текстом, плавает влево-вправо */}
        <div className="trout-swim-lr w-[95vw] md:w-[78vw] max-w-[680px]">
          <SwimmingFish />
        </div>

      </section>
    </main>
  );
}
