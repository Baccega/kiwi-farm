import { type NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { sendTelegramMessage } from "~/server/telegram";
import { sendTelegramMessageRequestSchema } from "~/types/Api";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const dynamic = "force-dynamic";

const isProduction = process.env.NODE_ENV === "production";

export async function POST(req: NextRequest) {
  try {
    const payload: unknown = await req.json();

    // Validate the input items
    const { session_id } = sendTelegramMessageRequestSchema.parse(payload);

    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "shipping_cost.shipping_rate"],
    });

    if (session.status !== "complete") {
      return NextResponse.json(
        { error: "Session is not complete" },
        { status: 400 },
      );
    }

    if (typeof session?.shipping_cost?.shipping_rate === "string") {
      throw new Error("Shipping Rate not found");
    }

    const message = [
      `<b>${!isProduction ? "🚧 DEV 🚧 " : ""}New order received!</b> 🎉`,
      `<i>Session</i>: ${session_id.slice(0, 20)}`,
      `<i>Total</i>: ${Number(session.amount_total) / 100}€`,
      `<i>Items</i>: ${(Number(session.amount_total) / 100 - Number(session.shipping_cost?.amount_total) / 100).toFixed(2)}€`,
      ...(session.line_items?.data?.map(
        (cur) =>
          `- x${cur.quantity} ${cur.description} (${Number(cur.amount_total) / 100}€)`,
      ) ?? []),
      `<i>Shipping</i>: ${session?.shipping_cost?.shipping_rate?.display_name} (${Number(session.shipping_cost?.amount_total) / 100}€)`,
      ...[
        session.shipping_details?.name,
        session.shipping_details?.address?.city
          ? `${session.shipping_details?.address?.city} (${session.shipping_details?.address?.state}), ${session.shipping_details?.address?.country} ${session.shipping_details?.address?.postal_code}`
          : "",
        session.shipping_details?.address?.line1,
        session.shipping_details?.address?.line2,
      ]
        .filter(Boolean)
        .map((cur) => `- ${cur}`),
    ];

    await sendTelegramMessage(message.join("\n"));

    return NextResponse.json(
      { status: "Telegram notification sent" },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
