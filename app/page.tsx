export default function Home() {
  return (
    <main className="text-white">
      <section className="relative h-screen flex items-center justify-center text-center">
        <div className="absolute top-20 left-1/2 -translate-x-1/2">
          <img src="/logo.png" className="w-52 md:w-72" />
        </div>

        <div className="relative z-10 mt-32">
          <h1 className="font-title text-4xl md:text-7xl mb-6">
            ПРИМАНКИ, КОТОРЫЕ <br /> РАБОТАЮТ
          </h1>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
            <a
              href="/catalog"
              className="inline-block px-10 py-4 bg-pink-500 hover:bg-pink-400 rounded-full font-title text-xl transition"
            >
              В магазин
            </a>
            <a
              href="/reviews"
              className="inline-block px-10 py-4 bg-white/10 hover:bg-white/20 rounded-full font-title text-xl transition"
            >
              Отзывы
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
