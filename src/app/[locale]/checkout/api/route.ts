import { type NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createCheckoutSessionRequestSchema } from "~/types/Api";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    // const identifier = `${request.ip}-${request.headers.get("user-agent") ?? ""}`;
    // const { success } = await ratelimit.limit(identifier);

    // if (!success) {
    //   return NextResponse.json(
    //     { error: "Rate limit exceeded" },
    //     { status: 429 },
    //   );
    // }

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

export async function POST(req: NextRequest) {
  try {
    // const identifier = `${req.ip}-${req.headers.get("user-agent") ?? ""}`;
    // const { success } = await ratelimit.limit(identifier);

    // if (!success) {
    //   return NextResponse.json(
    //     { error: "Rate limit exceeded" },
    //     { status: 429 },
    //   );
    // }

    const payload: unknown = await req.json();

    // Validate the input items
    const { locale, items } = createCheckoutSessionRequestSchema.parse(payload);

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: items,
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: [
          "AT",
          "BE",
          "BG",
          "HR",
          "CY",
          "CZ",
          "DK",
          "EE",
          "FI",
          "FR",
          "DE",
          "GR",
          "HU",
          "IE",
          "IT",
          "LV",
          "LT",
          "LU",
          "MT",
          "NL",
          "PL",
          "PT",
          "RO",
          "SK",
          "SI",
          "ES",
          "SE",
        ],
      },
      return_url: `${req.headers.get("origin")}/${locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
