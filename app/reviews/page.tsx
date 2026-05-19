const reviews = [
  {
    name: "Илья",
    text: "Сегодня твоих биг джуниоров ела как не в себя",
    image: "/reviews/review1.jpg",
  },
  {
    name: "Андрей",
    text: "Андрей спасибо большое будем теперь тестить.",
    image: "/reviews/review2.jpg",
  },
  {
    name: "Сергей",
    text: "Спасибо за оперативность и подарок",
    image: "/reviews/review3.jpg",
  },
];

export default function ReviewsPage() {
  return (
    <main className="text-white pt-24 pb-20 px-6 max-w-6xl mx-auto">
      <h1 className="font-title text-3xl md:text-5xl text-center mb-16">Отзывы</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <div key={i} className="bg-zinc-900/60 backdrop-blur-sm rounded-2xl overflow-hidden flex flex-col">
            {r.image && (
              <img src={r.image} className="w-full h-64 object-cover" />
            )}
            <div className="p-6 flex flex-col gap-3 flex-1">
              {!r.image && <div className="text-2xl">🎣</div>}
              <p className="text-white/70 text-sm leading-relaxed flex-1">"{r.text}"</p>
              <p className="text-pink-400 text-sm font-medium">{r.name}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
