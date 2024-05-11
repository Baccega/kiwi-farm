import { type NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const session_id = searchParams.get("session_id");

    if (!session_id) {
      return NextResponse.json(
        { error: "session_id is required" },
        { status: 400 },
      );
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    return NextResponse.json({
      status: session.status,
      customer_email: session?.customer_details?.email,
    });
  } catch (err: unknown) {
    return NextResponse.json(err, { status: 500 });
  }
}

export const createCheckoutSessionRequestSchema = z.object({
  items: z.array(z.object({ price: z.string(), quantity: z.number() })),
});

export async function POST(req: NextRequest) {
  try {
    const payload: unknown = await req.json();

    // Validate the input items
    const { items } = createCheckoutSessionRequestSchema.parse(payload);

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: items,
      mode: "payment",
      return_url: `${req.headers.get("origin")}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
