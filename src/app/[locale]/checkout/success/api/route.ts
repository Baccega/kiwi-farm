import { type NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { sendTelegramMessage } from "~/server/telegram";
import {
  sendTelegramMessageRequestSchema,
} from "~/types/Api";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const payload: unknown = await req.json();

    // Validate the input items
    const { session_id } = sendTelegramMessageRequestSchema.parse(payload);

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.status !== "complete") {
      return NextResponse.json(
        { error: "Session is not complete" },
        { status: 400 },
      );
    }

    await sendTelegramMessage(
      `New order received! 🎉 \nSession: ${session_id}`,
    );

    return NextResponse.json(
      { status: "Telegram notification sent" },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
