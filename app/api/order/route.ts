import { NextRequest, NextResponse } from "next/server";

const TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { cart, total, name, phone, delivery, address, payment, comment } = body;

  const lines = cart.map(
    (i: any) => `• ${i.product} (${i.name}) × ${i.qty} — ${i.qty * 250} ₽`
  );

  const text = [
    "🎣 <b>Новый заказ!</b>",
    "━━━━━━━━━━━━━━",
    ...lines,
    "━━━━━━━━━━━━━━",
    `💰 <b>Сумма: ${total} ₽</b>`,
    "",
    `👤 Имя: ${name}`,
    `📞 Телефон: ${phone}`,
    `📦 Получение: ${delivery === "pickup" ? "Самовывоз (м. ЦСКА)" : `ОЗОН — ${address}`}`,
    `💳 Оплата: ${payment}`,
    ...(comment ? [`💬 Комментарий: ${comment}`] : []),
  ].join("\n");

  const res = await fetch(
    `https://api.telegram.org/bot${TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: "HTML" }),
    }
  );

  if (!res.ok) {
    return NextResponse.json({ error: "Telegram error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
