export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-white p-8 text-slate-900">
      <div className="mx-auto max-w-3xl rounded-[32px] bg-white/85 p-10 shadow-xl">
        <a href="/" className="text-sm font-semibold text-violet-600">
          ← Retour à l'accueil
        </a>

        <h1 className="mt-6 text-5xl font-extrabold">Contact</h1>

        <p className="mt-4 text-slate-600">
          Une question, une suggestion ou un problème ? Écris-nous.
        </p>

        <form
          action="https://formspree.io/f/mpqeadlq"
          method="POST"
          className="mt-8 space-y-4"
        >
          <input
            type="text"
            name="nom"
            placeholder="Votre nom"
            required
            className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
          />

          <input
            type="email"
            name="email"
            placeholder="Votre courriel"
            required
            className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
          />

          <textarea
            name="message"
            placeholder="Votre message"
            required
            rows={6}
            className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
          />

          <button
            type="submit"
            className="rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 px-6 py-3 font-bold text-white shadow-lg shadow-pink-200"
          >
            Envoyer
          </button>
        </form>
      </div>
    </main>
  );
}