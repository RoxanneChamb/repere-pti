import Link from "next/link";
import {
  ArrowLeft,
  AlertTriangle,
  Activity,
  ClipboardCheck,
  ClipboardList,
  GraduationCap,
  HeartPulse,
  Lightbulb,
  Pill,
  ShieldAlert,
  ShieldCheck,
  Stethoscope,
  Syringe,
} from "lucide-react";

const sections = [
  {
    title: "Les 10 bons",
    icon: ClipboardCheck,
    items: [
      "Bon patient",
      "Bon médicament",
      "Bonne dose",
      "Bonne voie",
      "Bon moment",
      "Bonne documentation",
      "Bonne raison",
      "Bonne réponse",
      "Bonne éducation",
      "Droit de refus du patient",
    ],
  },
  {
    title: "Avant l’administration",
    icon: ClipboardList,
    items: [
      "Vérifier l’ordonnance",
      "Vérifier les allergies",
      "Valider l’identité du patient",
      "Consulter les paramètres requis",
      "Vérifier les résultats de laboratoire pertinents",
      "Préparer le médicament dans un environnement sécuritaire",
      "Clarifier toute ordonnance ambiguë avant d’administrer",
    ],
  },
  {
    title: "Pendant l’administration",
    icon: Syringe,
    items: [
      "Respecter la technique aseptique",
      "Expliquer le médicament au patient",
      "Respecter la voie prescrite",
      "Observer toute réaction immédiate",
      "Administrer selon les protocoles en vigueur",
      "Respecter le rythme d’administration si applicable",
    ],
  },
  {
    title: "Surveillance après l’administration",
    icon: Stethoscope,
    items: [
      "Vérifier l’efficacité du traitement",
      "Surveiller les effets secondaires",
      "Surveiller les effets indésirables",
      "Réévaluer l’état clinique du patient",
      "Documenter les observations pertinentes",
      "Aviser selon les paramètres ou la détérioration clinique",
    ],
  },
  {
    title: "Paramètres fréquemment vérifiés",
    icon: HeartPulse,
    items: [
      "Tension artérielle pour certains antihypertenseurs",
      "Fréquence cardiaque pour certains bêtabloquants ou la digoxine",
      "Glycémie pour l’insuline ou certains antidiabétiques",
      "Saturation pour certains traitements respiratoires",
      "Douleur avant et après certains analgésiques",
      "INR ou données de coagulation pour certains anticoagulants",
      "Résultats de laboratoire selon le médicament et le contexte",
    ],
  },
];

export default function MedicamentsPage() {
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
              <Pill className="h-4 w-4" />
              Aide-mémoire clinique
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">
              Administration sécuritaire des médicaments
            </h1>

            <div className="mt-4 h-px w-48 bg-gradient-to-r from-violet-300 via-pink-200 to-transparent" />

            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
              Aide-mémoire pour réviser les vérifications essentielles, les
              surveillances infirmières et les précautions à appliquer avant,
              pendant et après l’administration d’un médicament.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-violet-50 p-4">
                <ShieldCheck className="h-6 w-6 text-violet-800" />
                <p className="mt-3 text-sm font-black text-violet-800">
                  Priorité
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Sécurité du patient.
                </p>
              </div>

              <div className="rounded-2xl bg-violet-50 p-4">
                <ClipboardCheck className="h-6 w-6 text-violet-800" />
                <p className="mt-3 text-sm font-black text-violet-800">
                  À vérifier
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Ordonnance, allergies, paramètres.
                </p>
              </div>

              <div className="rounded-2xl bg-violet-50 p-4">
                <Activity className="h-6 w-6 text-violet-800" />
                <p className="mt-3 text-sm font-black text-violet-800">
                  But clinique
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Prévenir les erreurs et complications.
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
              L’administration sécuritaire ne se limite pas à donner le bon
              médicament : elle inclut l’évaluation avant l’administration, la
              surveillance de la réponse, l’enseignement au patient et la
              documentation des observations pertinentes.
            </p>

            <div className="mt-6 rounded-[28px] bg-gradient-to-br from-violet-100 via-white to-pink-50 p-5">
              <p className="flex items-start gap-2 text-sm font-extrabold text-violet-800">
                <GraduationCap className="mt-0.5 h-5 w-5 shrink-0" />
                Outil éducatif
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                À valider avec les ordonnances, les protocoles du milieu, les
                politiques locales, les normes professionnelles et les consignes
                de ton programme.
              </p>
            </div>
          </aside>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2">
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <div
                key={section.title}
                className="rounded-[32px] border border-white/80 bg-white/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-100"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-800">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h2 className="text-2xl font-black text-slate-950">
                    {section.title}
                  </h2>
                </div>

                <ul className="mt-5 space-y-3">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-6 text-slate-600"
                    >
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-violet-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </section>

        <section className="mt-8 rounded-[36px] border border-amber-100 bg-amber-50/80 p-6 shadow-sm backdrop-blur md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <ShieldAlert className="h-6 w-6" />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-700">
                Vigilance accrue
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Médicaments à haut risque
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Ces médicaments nécessitent une attention particulière, une
                surveillance adaptée et le respect strict des politiques locales.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Insuline",
              "Héparine",
              "Opioïdes",
              "Électrolytes concentrés",
              "Anticoagulants",
              "Chimiothérapie",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-amber-100 bg-white/70 p-4 text-sm font-bold leading-6 text-amber-900"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[36px] border border-red-100 bg-red-50/80 p-6 shadow-sm backdrop-blur md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-700">
              <AlertTriangle className="h-6 w-6" />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-red-700">
                À clarifier avant d’administrer
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Situations à risque
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Une ordonnance ou une situation douteuse doit être clarifiée
                avant l’administration.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Ordonnance illisible ou incomplète",
              "Dose inhabituelle ou incohérente",
              "Allergie ou réaction antérieure connue",
              "Paramètre clinique hors cible",
              "Résultat de laboratoire inquiétant",
              "Patient qui refuse ou questionne le médicament",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-red-100 bg-white/75 p-4 text-sm font-bold leading-6 text-red-900"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[36px] border border-violet-100 bg-white/80 p-6 shadow-xl shadow-violet-100 backdrop-blur md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-800">
              <Lightbulb className="h-6 w-6" />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-700">
                Astuce examen et stage
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950">
                La question à te poser
              </h2>

              <p className="mt-3 text-base font-bold leading-8 text-slate-700">
                Avant d’administrer un médicament, demande-toi : « Quels
                paramètres dois-je vérifier avant, pendant et après? »
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