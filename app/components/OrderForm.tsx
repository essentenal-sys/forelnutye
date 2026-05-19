"use client";

import { useState } from "react";
import { useCart } from "@/app/context/cart";
import { PRICE } from "@/app/lib/data";

export default function OrderForm() {
  const { cart, total, orderOpen, setOrderOpen, clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    delivery: "pickup",
    address: "",
    payment: "СБП",
    comment: "",
  });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const set = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const send = async () => {
    if (!form.name.trim() || !form.phone.trim()) {
      setError("Заполни имя и телефон");
      return;
    }
    if (form.delivery === "delivery" && !form.address.trim()) {
      setError("Укажи адрес пункта выдачи ОЗОН");
      return;
    }
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, total, ...form }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError("Не удалось отправить заказ. Попробуй ещё раз.");
    } finally {
      setSending(false);
    }
  };

  if (!orderOpen) return null;

  if (sent) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
        <div className="bg-zinc-900/60 backdrop-blur-md w-full max-w-md rounded-2xl p-8 flex flex-col items-center gap-5 text-center">
          <div className="w-20 h-20 rounded-full bg-pink-500/20 flex items-center justify-center text-4xl">
            ✓
          </div>
          <div>
            <h2 className="font-title text-3xl mb-2">Заказ принят!</h2>
            <p className="text-white/50 text-sm">
              Мы свяжемся с тобой в ближайшее время для подтверждения
            </p>
          </div>
          <div className="w-full bg-black/40 rounded-xl p-4 space-y-2 text-sm text-left">
            {cart.map((item, i) => (
              <div key={i} className="flex justify-between">
                <span>{item.product} <span className="text-white/50">({item.name}) × {item.qty}</span></span>
                <span>{item.qty * PRICE} ₽</span>
              </div>
            ))}
            <div className="border-t border-white/10 pt-2 flex justify-between font-bold">
              <span>Итого</span>
              <span>{total} ₽</span>
            </div>
            <div className="border-t border-white/10 pt-2 text-white/50 space-y-1">
              <p>👤 {form.name} · {form.phone}</p>
              <p>{form.delivery === "pickup" ? "🚇 Самовывоз (м. ЦСКА)" : `📦 ОЗОН — ${form.address}`}</p>
              <p>💳 {form.payment}</p>
            </div>
          </div>
          <button
            onClick={() => { clearCart(); setOrderOpen(false); setSent(false); }}
            className="w-full bg-pink-500 hover:bg-pink-400 py-3 rounded-xl font-title text-lg transition"
          >
            Отлично!
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div className="bg-zinc-900/60 backdrop-blur-md w-full max-w-md rounded-2xl p-6 flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="font-title text-2xl">Оформление заказа</h2>
          <button onClick={() => setOrderOpen(false)} className="text-white/40 hover:text-white">✕</button>
        </div>

        <div className="bg-black/40 rounded-xl p-3 space-y-2 text-sm">
          {cart.map((item, i) => (
            <div key={i} className="flex justify-between">
              <span>{item.product} <span className="text-white/50">({item.name}) × {item.qty}</span></span>
              <span>{item.qty * PRICE} ₽</span>
            </div>
          ))}
          <div className="border-t border-white/10 pt-2 flex justify-between font-bold">
            <span>Итого</span>
            <span>{total} ₽</span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-white/50">Имя *</label>
          <input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Иван"
            className="bg-black/40 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-pink-500 placeholder:text-white/20" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-white/50">Телефон *</label>
          <input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+7 (999) 999-99-99" type="tel"
            className="bg-black/40 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-pink-500 placeholder:text-white/20" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs text-white/50">Способ получения</label>
          <div className="grid grid-cols-2 gap-2">
            {(["pickup", "delivery"] as const).map((type) => (
              <button key={type} onClick={() => set("delivery", type)}
                className={`py-2 rounded-lg text-sm transition ${form.delivery === type ? "bg-pink-500" : "bg-black/40 hover:bg-white/10"}`}>
                {type === "pickup" ? "🚇 Самовывоз (м. ЦСКА)" : "📦 ОЗОН"}
              </button>
            ))}
          </div>
        </div>

        {form.delivery === "delivery" && (
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-white/50">Адрес пункта выдачи ОЗОН *</label>
              <input value={form.address} onChange={(e) => set("address", e.target.value)}
                placeholder="Напр.: г. Москва, ул. Ленина, д. 5"
                className="bg-black/40 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-pink-500 placeholder:text-white/20" />
            </div>
            <p className="text-xs text-white/30">Найди ближайший пункт в приложении OZON → «Пункты выдачи»</p>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label className="text-xs text-white/50">Способ оплаты</label>
          <div className="grid grid-cols-3 gap-2">
            {["СБП", "Наличные", "Карта"].map((p) => (
              <button key={p} onClick={() => set("payment", p)}
                className={`py-2 rounded-lg text-sm transition ${form.payment === p ? "bg-pink-500" : "bg-black/40 hover:bg-white/10"}`}>
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-white/50">Комментарий</label>
          <textarea value={form.comment} onChange={(e) => set("comment", e.target.value)}
            placeholder="Пожелания к заказу..." rows={2}
            className="bg-black/40 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-pink-500 resize-none placeholder:text-white/20" />
        </div>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <button onClick={send} disabled={sending}
          className="w-full bg-pink-500 hover:bg-pink-400 disabled:opacity-50 py-3 rounded-xl font-title text-lg transition mt-1">
          {sending ? "Отправляем..." : "Отправить заказ →"}
        </button>
      </div>
    </div>
  );
}
