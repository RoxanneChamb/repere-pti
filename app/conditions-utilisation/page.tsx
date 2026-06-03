export default function ConditionsUtilisationPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-white p-8 text-slate-900">
      <div className="mx-auto max-w-4xl rounded-[32px] bg-white/85 p-10 shadow-xl">
        <a href="/" className="text-sm font-semibold text-violet-600">
          ← Retour à l'accueil
        </a>

        <h1 className="mt-6 text-5xl font-extrabold">
          Conditions d'utilisation
        </h1>

        <p className="mt-6 text-slate-600">
          Dernière mise à jour : Juin 2026
        </p>

        <div className="mt-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold">
              Outil pédagogique
            </h2>

            <p className="mt-3 text-slate-600">
              Repère PTI est une plateforme éducative destinée à soutenir
              l'apprentissage du raisonnement clinique, la rédaction de plans
              thérapeutiques infirmiers (PTI) et la préparation aux stages en
              soins infirmiers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">
              Limitation de responsabilité
            </h2>

            <p className="mt-3 text-slate-600">
              Les contenus générés par Repère PTI sont fournis à titre
              éducatif seulement. Ils ne remplacent pas le jugement clinique,
              les politiques institutionnelles, les normes professionnelles
              ou l'avis d'un professionnel qualifié.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">
              Responsabilité de l'utilisateur
            </h2>

            <p className="mt-3 text-slate-600">
              L'utilisateur demeure responsable des informations qu'il saisit
              dans la plateforme ainsi que de l'utilisation des contenus
              générés.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">
              Confidentialité
            </h2>

            <p className="mt-3 text-slate-600">
              Aucune information permettant l'identification d'un patient ne
              doit être inscrite dans la plateforme.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">
              Modification du service
            </h2>

            <p className="mt-3 text-slate-600">
              Repère PTI se réserve le droit de modifier, améliorer ou retirer
              certaines fonctionnalités sans préavis.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">
              Acceptation des conditions
            </h2>

            <p className="mt-3 text-slate-600">
              En utilisant la plateforme, l'utilisateur accepte les présentes
              conditions d'utilisation.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}