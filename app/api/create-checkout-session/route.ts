import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",

      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],

      success_url:
        "https://repere-pti.ca/dashboard?premium=success",

      cancel_url:
        "https://repere-pti.ca/premium?cancelled=true",
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur Stripe" },
      { status: 500 }
    );
  }
}