"use client";

import { useCart } from "@/app/context/cart";
import { PRICE } from "@/app/lib/data";

export default function CartPanel() {
  const { cart, total, cartOpen, setCartOpen, setOrderOpen, removeItem, clearCart } = useCart();

  return (
    <div className={`fixed inset-0 z-40 ${cartOpen ? "visible" : "invisible"}`}>
      <div onClick={() => setCartOpen(false)} className="absolute inset-0 bg-black/60" />

      <div className="absolute right-0 top-0 h-full w-full md:w-96 bg-zinc-900/60 backdrop-blur-md p-5 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-title text-xl">Корзина</h2>
          <div className="flex items-center gap-3">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-white/30 hover:text-red-400"
              >
                Очистить
              </button>
            )}
            <button
              onClick={() => setCartOpen(false)}
              className="text-white/40 hover:text-white text-lg"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3">
          {cart.length === 0 ? (
            <p className="text-white/40 text-sm text-center mt-10">Корзина пуста</p>
          ) : (
            cart.map((item, i) => (
              <div key={i} className="bg-black/40 p-3 rounded-xl flex gap-3 items-center">
                <img src={item.image} className="w-12 h-12 rounded object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.product}</p>
                  <p className="text-xs text-white/50">{item.name} × {item.qty}</p>
                </div>
                <span className="text-sm font-bold mr-1">{item.qty * PRICE} ₽</span>
                <button onClick={() => removeItem(i)} className="text-white/30 hover:text-white">
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="mt-4 border-t border-white/10 pt-4">
            <div className="flex justify-between mb-4 font-bold text-lg">
              <span>Итого</span>
              <span>{total} ₽</span>
            </div>
            <button
              onClick={() => { setCartOpen(false); setOrderOpen(true); }}
              className="w-full bg-pink-500 hover:bg-pink-400 py-3 rounded-xl font-title text-lg transition"
            >
              Оформить заказ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
