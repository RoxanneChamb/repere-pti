import { createClient } from "@supabase/supabase-js";

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
        { error: "Non authentifié." },
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

    // Historique quiz
    await supabase
      .from("quiz_history")
      .delete()
      .eq("user_id", user.id);

    // Stats quiz
    await supabase
      .from("quiz_stats")
      .delete()
      .eq("user_id", user.id);

    // PTI
    await supabase
      .from("ptis")
      .delete()
      .eq("user_id", user.id);

    // Profil
    await supabase
      .from("profiles")
      .delete()
      .eq("id", user.id);

    // Auth user
    const { error } =
      await supabase.auth.admin.deleteUser(user.id);

    if (error) {
      return Response.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
    });
  } catch (error: any) {
    return Response.json(
      {
        error:
          error?.message ||
          "Erreur lors de la suppression.",
      },
      { status: 500 }
    );
  }
}