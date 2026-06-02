export default function Navbar() {
  return (
    <header className="border-b border-slate-100 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
        <a href="/" className="text-2xl font-extrabold">
          Repère PT
          <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
            I
          </span>
        </a>

        <nav className="hidden gap-8 text-sm font-medium text-slate-600 md:flex">
          <a href="/generer">Générer un PTI</a>

          <a href="/mes-pti">Mes PTI</a>

          <a href="/quiz">Quiz clinique</a>

          <a href="/dashboard">Tableau de bord</a>

          <a href="/ressources">Ressources</a>
        </nav>
      </div>
    </header>
  );
}