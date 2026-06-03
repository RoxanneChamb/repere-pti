export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-white p-8 text-slate-900">
      <div className="mx-auto max-w-4xl rounded-[32px] bg-white/85 p-10 shadow-xl">
        <a href="/" className="text-sm font-semibold text-violet-600">
          ← Retour à l'accueil
        </a>

        <h1 className="mt-6 text-5xl font-extrabold">Contact</h1>

        <p className="mt-6 text-slate-600">
          Pour toute question, signalement de problème ou demande liée à vos
          données personnelles.
        </p>

        <div className="mt-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold">Nous joindre</h2>

            <p className="mt-3 text-slate-600">
              Vous pouvez communiquer avec l'équipe de Repère PTI à l'adresse
              suivante :
            </p>

            <p className="mt-3 font-bold text-violet-600">
              roxy_1_73@hotmail.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Suppression de compte</h2>

            <p className="mt-3 text-slate-600">
              Pour demander la suppression de votre compte et de vos données,
              envoyez un courriel avec l'objet :
            </p>

            <p className="mt-3 font-bold">
              Suppression de compte Repère PTI
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Important</h2>

            <p className="mt-3 text-slate-600">
              N'envoyez jamais de renseignements permettant d'identifier un
              patient dans vos communications.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}