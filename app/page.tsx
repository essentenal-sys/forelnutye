export default function Home() {
  return (
    <main className="text-white">
      <section className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden">

        <div className="mb-4">
          <img src="/logo.png" className="w-44 md:w-64" />
        </div>

        <h1 className="font-title text-3xl md:text-6xl lg:text-7xl mb-6 px-4 leading-tight">
          ПРИМАНКИ, КОТОРЫЕ <br /> РАБОТАЮТ
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
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

      </section>
    </main>
  );
}
