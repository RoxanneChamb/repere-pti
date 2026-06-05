import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return Response.json(
        { error: "Tu dois être connectée." },
        { status: 401 }
      );
    }

    const {
      data: { user },
    } = await supabase.auth.getUser(token);

    if (!user) {
      return Response.json(
        { error: "Utilisateur introuvable." },
        { status: 401 }
      );
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("premium, stripe_customer_id")
      .eq("id", user.id)
      .single();

    if (profile?.premium !== true) {
      return Response.json(
        { error: "Aucun abonnement Premium actif trouvé." },
        { status: 403 }
      );
    }

    let customerId = profile?.stripe_customer_id;

    if (!customerId && user.email) {
      const customers = await stripe.customers.list({
        email: user.email,
        limit: 1,
      });

      customerId = customers.data[0]?.id;

      if (customerId) {
        await supabase
          .from("profiles")
          .update({ stripe_customer_id: customerId })
          .eq("id", user.id);
      }
    }

    if (!customerId) {
      return Response.json(
        {
          error:
            "Impossible de trouver ton profil client Stripe. Contacte le support.",
        },
        { status: 400 }
      );
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: "https://repere-pti.ca/dashboard",
    });

    return Response.json({
      url: portalSession.url,
    });
  } catch (error: any) {
    console.error("ERREUR PORTAIL STRIPE :", error?.message);

    return Response.json(
      {
        error:
          error?.message ||
          "Erreur lors de l'ouverture du portail d'abonnement.",
      },
      { status: 500 }
    );
  }
}