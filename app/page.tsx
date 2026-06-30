const projects = [
  {
    id: 1,
    title: 'CamsMarketing',
    description: 'Plataforma de marketing para autos con storefront Vite',
    tags: ['Laravel', 'Node.js', 'Marketing'],
    link: 'https://github.com/DukeCrea/camsmark',
    status: 'active'
  },
  {
    id: 2,
    title: 'ChampionDesk',
    description: 'Sistema de gestión de ventas y cotizaciones con Telegram',
    tags: ['Python', 'Telegram', 'Ventas'],
    link: 'https://github.com/DukeCrea/championdesk',
    status: 'active'
  },
  {
    id: 3,
    title: 'EventosQR',
    description: 'Validador de eventos con códigos QR',
    tags: ['Node.js', 'Supabase', 'QR'],
    link: 'https://github.com/DukeCrea/eventos-qr',
    status: 'active'
  },
  {
    id: 4,
    title: 'GymFlow / BerkFW',
    description: 'Plataforma de reservas para gyms y fitness',
    tags: ['React', 'Next.js', 'SaaS'],
    link: 'https://github.com/DukeCrea/gymflow',
    status: 'active'
  },
  {
    id: 5,
    title: 'DukeComment Bot',
    description: 'Bot de Telegram para gestionar comentarios en redes sociales',
    tags: ['Python', 'Telegram', 'AI'],
    link: 'https://github.com/DukeCrea/duke-comment-bot',
    status: 'active'
  },
  {
    id: 6,
    title: 'Social Media Bot',
    description: 'Automatización de publicaciones en redes sociales',
    tags: ['Python', 'Telegram', 'Automation'],
    link: 'https://github.com/DukeCrea/social-media-bot',
    status: 'active'
  },
  {
    id: 7,
    title: 'MGC Ecosystem',
    description: 'Monorepo con soluciones empresariales',
    tags: ['Monorepo', 'TypeScript', 'Enterprise'],
    link: 'https://github.com/DukeCrea/mgc-ecosystem',
    status: 'active'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <nav className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg" />
            <span className="font-bold text-xl text-white">DukeCrea</span>
          </div>
          <div className="flex gap-6">
            <a href="#projects" className="text-slate-300 hover:text-white transition">Proyectos</a>
            <a href="#about" className="text-slate-300 hover:text-white transition">Sobre mí</a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Antonio Duque
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Full-Stack Developer | SaaS Builder | AI Enthusiast
          </p>
          <p className="text-slate-400 max-w-2xl mx-auto mb-12">
            Construyo soluciones digitales escalables para negocios.
            Especializado en Node.js, Python, React y automatización.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="https://github.com/DukeCrea" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
              GitHub
            </a>
            <a href="https://www.instagram.com/dukecrea" className="px-6 py-3 border border-slate-600 hover:border-slate-400 text-white rounded-lg transition">
              Instagram @dukecrea
            </a>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-white mb-12">Mis 7 Potencias</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-blue-500 transition hover:bg-slate-800/80"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm">{project.description}</p>
                </div>
                <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded">
                  {project.status}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-white mb-8">Sobre DukeCrea</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-slate-300 mb-4">
              Soy un desarrollador full-stack con pasión por construir soluciones digitales que resuelven problemas reales.
            </p>
            <p className="text-slate-300 mb-4">
              Mi expertise abarca desde APIs robustas en Node.js y Python, hasta interfaces modernas con React y Next.js.
            </p>
            <p className="text-slate-300">
              Especializado en automatización, bots inteligentes y sistemas SaaS escalables.
            </p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
            <h3 className="text-xl font-bold text-white mb-6">Tech Stack</h3>
            <div className="grid grid-cols-2 gap-4 text-slate-300">
              <div>
                <p className="font-semibold text-white mb-2">Backend</p>
                <ul className="text-sm space-y-1">
                  <li>Node.js / Express</li>
                  <li>Python</li>
                  <li>Laravel</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">Frontend</p>
                <ul className="text-sm space-y-1">
                  <li>React / Next.js</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">Tools</p>
                <ul className="text-sm space-y-1">
                  <li>Docker</li>
                  <li>Git / GitHub</li>
                  <li>Vercel / AWS</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">Databases</p>
                <ul className="text-sm space-y-1">
                  <li>PostgreSQL</li>
                  <li>Supabase</li>
                  <li>MongoDB</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-6 py-12 text-center">
          <p className="text-slate-400 mb-4">
            Construido con <span className="text-red-500">❤️</span> por DukeCrea
          </p>
          <p className="text-slate-500 text-sm">
            © 2026 Antonio Duque. Todos los derechos reservados.
          </p>
          <div className="flex justify-center gap-6 mt-6">
            <a href="https://github.com/DukeCrea" className="text-slate-400 hover:text-white transition">GitHub</a>
            <a href="https://www.instagram.com/dukecrea" className="text-slate-400 hover:text-white transition">Instagram</a>
            <a href="mailto:duque629@gmail.com" className="text-slate-400 hover:text-white transition">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
