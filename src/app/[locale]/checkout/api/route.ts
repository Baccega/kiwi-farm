import { type NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import {
  AVAILABLE_COUNTRIES,
  AVAILABLE_COUNTRIES_ZONES,
  getDHLShippingPrice,
  WEIGHT_LIMIT,
} from "~/lib/dhl";
import {
  AVAILABLE_HOME_DELIVERIES,
  getHomeDeliveryShippingPrice,
} from "~/lib/homeDelivery";
import { getPickupShippingOption } from "~/lib/pickup";
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
    const payload: unknown = await req.json();

    // Validate the input items
    const { locale, items, shippingLocation } =
      createCheckoutSessionRequestSchema.parse(payload);

    const isPickup = shippingLocation === "pickup";
    const isHomeDelivery = Object.keys(AVAILABLE_HOME_DELIVERIES).includes(
      shippingLocation ?? "",
    );
    const isDHLDelivery = !isPickup && !isHomeDelivery;

    const itemsPrices = items.map((cur) => cur.price);
    const stripeProducts = (
      await stripe.prices.list({ expand: ["data.product"] })
    ).data.filter((cur) => itemsPrices.includes(cur.id));

    let shippingPriceId;
    let shippingAddressCollection:
      | Stripe.Checkout.SessionCreateParams.ShippingAddressCollection
      | undefined;
    let shippingZone;

    switch (true) {
      case isPickup === true:
        shippingPriceId = getPickupShippingOption().shipping_id;
        shippingAddressCollection = undefined;
        break;
      case isHomeDelivery === true:
        shippingZone = AVAILABLE_HOME_DELIVERIES[shippingLocation]?.zone;

        if (!shippingZone) throw new Error("Shipping Zone not found");

        const taxableTotal = stripeProducts.reduce((acc, cur) => {
          const quantity =
            items.find((cur2) => cur2.price === cur.id)?.quantity ?? 0;
          return (Number(cur?.unit_amount ?? 0) / 100) * quantity + acc;
        }, 0);

        shippingPriceId = getHomeDeliveryShippingPrice(
          taxableTotal,
          shippingZone,
        )?.shipping_id;
        shippingAddressCollection = {
          allowed_countries: ["IT"],
        };
        break;
      case isDHLDelivery === true:
        shippingZone = AVAILABLE_COUNTRIES_ZONES[shippingLocation]?.zone;

        if (!shippingZone) throw new Error("Shipping Zone not found");

        const totalWeight = stripeProducts.reduce((acc, cur) => {
          const quantity =
            items.find((cur2) => cur2.price === cur.id)?.quantity ?? 0;
          return (
            Number((cur?.product as Stripe.Product)?.metadata?.weight ?? 0) *
              quantity +
            acc
          );
        }, 0);

        if (totalWeight > WEIGHT_LIMIT) {
          throw new Error("Weight limit reached");
        }

        shippingPriceId = getDHLShippingPrice(
          totalWeight,
          shippingZone,
        )?.shipping_id;

        shippingAddressCollection = {
          allowed_countries: AVAILABLE_COUNTRIES.filter(
            (cur) => cur === shippingLocation,
          ),
        };
        break;
    }

    const session = await stripe.checkout.sessions.create({
      locale: locale as Stripe.Checkout.SessionCreateParams.Locale,
      ui_mode: "embedded",
      line_items: items,
      mode: "payment",
      shipping_address_collection: shippingAddressCollection,
      shipping_options: [{ shipping_rate: shippingPriceId }],
      return_url: `${req.headers.get("origin")}/${locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
