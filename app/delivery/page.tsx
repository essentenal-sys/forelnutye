export default function DeliveryPage() {
  return (
    <main className="text-white pt-24 pb-20 px-6 max-w-4xl mx-auto">
      <h1 className="font-title text-3xl md:text-5xl text-center mb-12">
        Доставка и получение
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-900/60 backdrop-blur-sm rounded-2xl p-6 flex flex-col gap-3">
          <div className="text-3xl">🚇</div>
          <h3 className="font-title text-xl">Самовывоз</h3>
          <p className="text-white/60 text-sm leading-relaxed">
            Забирайте заказ лично — мы находимся рядом с метро{" "}
            <span className="text-white font-medium">ЦСКА</span>.
            Адрес и время выдачи уточняются при оформлении заказа.
          </p>
          <p className="text-pink-400 text-sm font-medium mt-auto">Бесплатно</p>
        </div>

        <div className="bg-zinc-900/60 backdrop-blur-sm rounded-2xl p-6 flex flex-col gap-3">
          <div className="text-3xl">📦</div>
          <h3 className="font-title text-xl">Доставка через ОЗОН</h3>
          <p className="text-white/60 text-sm leading-relaxed">
            Отправляем в любой пункт выдачи ОЗОН по России. При оформлении
            укажи адрес ближайшего к тебе пункта выдачи — найти его можно
            на сайте или в приложении OZON.
          </p>
          <p className="text-pink-400 text-sm font-medium mt-auto">По тарифам ОЗОН</p>
        </div>
      </div>
    </main>
  );
}
