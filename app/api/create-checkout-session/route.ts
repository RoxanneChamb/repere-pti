import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const stripePriceId = process.env.STRIPE_PRICE_ID;

    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: "STRIPE_SECRET_KEY manquant dans Vercel." },
        { status: 500 }
      );
    }

    if (!stripePriceId) {
      return NextResponse.json(
        { error: "STRIPE_PRICE_ID manquant dans Vercel." },
        { status: 500 }
      );
    }

    const stripe = new Stripe(stripeSecretKey);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { error: "Non authentifié." },
        { status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return NextResponse.json(
        { error: "Utilisateur introuvable." },
        { status: 401 }
      );
    }

    const keyMode = stripeSecretKey.startsWith("sk_live_")
      ? "live"
      : stripeSecretKey.startsWith("sk_test_")
        ? "test"
        : "unknown";

    console.log("Stripe checkout mode:", keyMode);
    console.log("Stripe price id:", stripePriceId);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      locale: "fr",
      customer_email: user.email ?? undefined,
      client_reference_id: user.id,

      line_items: [
        {
          price: stripePriceId,
          quantity: 1,
        },
      ],

      metadata: {
        user_id: user.id,
        product: "repere-pti-premium",
      },

      success_url: "https://www.repere-pti.ca/dashboard?premium=success",
      cancel_url: "https://www.repere-pti.ca/premium?cancelled=true",
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error("Erreur Stripe checkout:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Erreur Stripe lors de la création de la session de paiement.";

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}