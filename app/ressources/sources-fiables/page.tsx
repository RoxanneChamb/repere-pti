import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  ExternalLink,
  GraduationCap,
  Landmark,
  Library,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

const sources = [
  {
    nom: "OIIQ",
    description: "Ordre des infirmières et infirmiers du Québec",
    url: "https://www.oiiq.org",
    icon: Stethoscope,
    tag: "Profession infirmière",
  },
  {
    nom: "INESSS",
    description: "Institut national d’excellence en santé et services sociaux",
    url: "https://www.inesss.qc.ca",
    icon: ShieldCheck,
    tag: "Guides et recommandations",
  },
  {
    nom: "MSSS",
    description: "Ministère de la Santé et des Services sociaux du Québec",
    url: "https://www.msss.gouv.qc.ca",
    icon: Landmark,
    tag: "Santé publique Québec",
  },
  {
    nom: "INSPQ",
    description: "Institut national de santé publique du Québec",
    url: "https://www.inspq.qc.ca",
    icon: Library,
    tag: "Santé publique",
  },
  {
    nom: "CDC",
    description: "Centers for Disease Control and Prevention",
    url: "https://www.cdc.gov",
    icon: BookOpen,
    tag: "Référence internationale",
  },
];

export default function SourcesFiablesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fbf8fd] px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <div className="pointer-events-none fixed -right-40 top-0 h-[420px] w-[420px] rounded-full bg-violet-200/50 blur-3xl" />
      <div className="pointer-events-none fixed -left-40 bottom-20 h-[360px] w-[360px] rounded-full bg-pink-100/70 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <Link
          href="/ressources"
          className="inline-flex items-center gap-2 text-sm font-extrabold text-slate-500 transition hover:text-violet-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux ressources
        </Link>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[36px] border border-white/80 bg-white/80 p-7 shadow-xl shadow-violet-100 backdrop-blur md:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-violet-700">
              <BookOpen className="h-4 w-4" />
              Références cliniques
            </div>

            <h1 className="mt-6 text-5xl font-black tracking-tight text-slate-950 sm:text-6xl">
              Sources fiables
            </h1>

            <div className="mt-4 h-px w-48 bg-gradient-to-r from-violet-300 via-pink-200 to-transparent" />

            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
              Références professionnelles et organismes reconnus pour valider
              les informations cliniques, les recommandations, les politiques de
              santé et les contenus utilisés en contexte de formation.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-violet-50 p-4">
                <ShieldCheck className="h-6 w-6 text-violet-800" />
                <p className="mt-3 text-sm font-black text-violet-800">
                  Priorité
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Valider avant d’appliquer.
                </p>
              </div>

              <div className="rounded-2xl bg-violet-50 p-4">
                <Stethoscope className="h-6 w-6 text-violet-800" />
                <p className="mt-3 text-sm font-black text-violet-800">
                  À consulter
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Protocoles, normes, guides.
                </p>
              </div>

              <div className="rounded-2xl bg-violet-50 p-4">
                <GraduationCap className="h-6 w-6 text-violet-800" />
                <p className="mt-3 text-sm font-black text-violet-800">
                  But
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Soutenir ton raisonnement.
                </p>
              </div>
            </div>
          </div>

          <aside className="rounded-[36px] border border-white/80 bg-white/70 p-6 shadow-sm backdrop-blur md:p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-violet-800 text-white shadow-lg shadow-violet-100">
              <ShieldCheck className="h-7 w-7" />
            </div>

            <h2 className="mt-5 text-2xl font-black text-slate-950">
              Point clé
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Une information clinique doit toujours être validée avec une
              source fiable, récente et adaptée au contexte : normes
              professionnelles, protocoles du milieu, guides reconnus et
              consignes de ton programme.
            </p>

            <div className="mt-6 rounded-[28px] bg-gradient-to-br from-violet-100 via-white to-pink-50 p-5">
              <p className="flex items-start gap-2 text-sm font-extrabold text-violet-800">
                <GraduationCap className="mt-0.5 h-5 w-5 shrink-0" />
                Outil éducatif
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Repère PTI aide à apprendre et structurer le raisonnement, mais
                ne remplace jamais les sources officielles.
              </p>
            </div>
          </aside>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2">
          {sources.map((source) => {
            const Icon = source.icon;

            return (
              <a
                key={source.nom}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-[32px] border border-white/80 bg-white/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-100"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-800">
                      <Icon className="h-6 w-6" />
                    </div>

                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-700">
                        {source.tag}
                      </p>

                      <h2 className="mt-2 text-2xl font-black text-slate-950">
                        {source.nom}
                      </h2>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {source.description}
                      </p>
                    </div>
                  </div>

                  <ExternalLink className="h-5 w-5 shrink-0 text-slate-300 transition group-hover:text-violet-700" />
                </div>
              </a>
            );
          })}
        </section>

        <section className="mt-8 rounded-[36px] border border-amber-100 bg-amber-50/80 p-6 shadow-sm backdrop-blur md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <ShieldCheck className="h-6 w-6" />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-700">
                À retenir
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Les politiques locales priment toujours
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Même lorsqu’une source est fiable, les soins doivent être
                adaptés aux ordonnances, aux protocoles de ton établissement,
                aux outils cliniques en vigueur et aux consignes données par ton
                programme ou ton milieu de stage.
              </p>
            </div>
          </div>
        </section>

        <p className="mt-8 text-center text-xs leading-6 text-slate-400">
          Repère PTI est un outil éducatif. Il ne remplace pas le jugement
          clinique, l’évaluation complète, les ordonnances, les protocoles du
          milieu ou l’encadrement professionnel.
        </p>
      </div>
    </main>
  );
}