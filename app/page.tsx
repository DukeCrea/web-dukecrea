'use client';

export default function Home() {
  const projects = [
    { num: 1, title: 'CamsMarketing', desc: 'Plataforma de marketing para autos', icon: '🚗' },
    { num: 2, title: 'ChampionDesk', desc: 'Sistema de ventas y cotizaciones', icon: '💼' },
    { num: 3, title: 'EventosQR', desc: 'Validador de eventos con QR', icon: '🎫' },
    { num: 4, title: 'GymFlow', desc: 'Reservas para gyms y fitness', icon: '💪' },
    { num: 5, title: 'DukeComment Bot', desc: 'Bot de comentarios en redes', icon: '🤖' },
    { num: 6, title: 'Social Media Bot', desc: 'Automatización de publicaciones', icon: '📱' },
    { num: 7, title: 'MGC Ecosystem', desc: 'Soluciones empresariales', icon: '🏢' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-xl">DukeCrea</div>
          <nav className="flex gap-8">
            <a href="#projects" className="text-gray-600 hover:text-black">Proyectos</a>
            <a href="#plan" className="text-gray-600 hover:text-black">Planes</a>
          </nav>
          <a href="#contact" className="px-6 py-2 bg-green-500 text-white rounded-full text-sm font-medium hover:bg-green-600">
            Contratar
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black">
            Full-Stack Developer
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Construyo soluciones digitales escalables para negocios. Especializado en Node.js, Python, React y automatización.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="#contact" className="px-8 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800">
              Comenzar
            </a>
            <a href="https://github.com/DukeCrea" className="px-8 py-3 border border-gray-300 text-black rounded-lg font-medium hover:bg-gray-50">
              Ver GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-gray-50 py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-black mb-2">7</div>
            <p className="text-gray-600">Proyectos activos</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-black mb-2">50+</div>
            <p className="text-gray-600">Clientes satisfechos</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-black mb-2">5+</div>
            <p className="text-gray-600">Años de experiencia</p>
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center text-black">Cómo trabajamos</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { step: 1, title: 'Briefing', desc: 'Entendemos tu visión' },
              { step: 2, title: 'Diseño', desc: 'Creamos la arquitectura' },
              { step: 3, title: 'Desarrollo', desc: 'Construimos la solución' },
              { step: 4, title: 'Testing', desc: 'Probamos exhaustivamente' },
              { step: 5, title: 'Deploy', desc: 'Lanzamos al mercado' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  {item.step}
                </div>
                <h3 className="font-bold text-black mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 Potencias Grid */}
      <section id="projects" className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center text-black">Mis 7 Potencias</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <a
                key={proj.num}
                href={`https://github.com/DukeCrea/${proj.title.toLowerCase().replace(/\s+/g, '-')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-6 rounded-lg border border-gray-200 hover:border-black hover:shadow-lg transition"
              >
                <div className="text-4xl mb-4">{proj.icon}</div>
                <h3 className="font-bold text-lg text-black mb-2">{proj.title}</h3>
                <p className="text-gray-600 text-sm">{proj.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="plan" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center text-black">Planes</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-gray-300 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-2 text-black">Freelance</h3>
              <p className="text-gray-600 mb-6">Para proyectos puntuales</p>
              <div className="text-4xl font-bold mb-6 text-black">$50<span className="text-lg text-gray-600">/h</span></div>
              <a href="#contact" className="block w-full px-6 py-3 border border-black text-black rounded-lg font-medium text-center hover:bg-black hover:text-white transition">
                Solicitar presupuesto
              </a>
            </div>
            <div className="border-2 border-black p-8 rounded-lg bg-black text-white">
              <div className="inline-block px-3 py-1 bg-white text-black rounded-full text-xs font-bold mb-4">Recomendado</div>
              <h3 className="text-2xl font-bold mb-2">Agencia</h3>
              <p className="text-gray-300 mb-6">Soluciones completas</p>
              <div className="text-4xl font-bold mb-6">Personalizado</div>
              <a href="#contact" className="block w-full px-6 py-3 bg-green-500 text-white rounded-lg font-medium text-center hover:bg-green-600 transition">
                Contratar ahora
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="bg-black text-white py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">¿Listo para tu proyecto?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Contacta conmigo y convirtamos tu idea en realidad
          </p>
          <div className="flex gap-4 justify-center">
            <a href="https://www.instagram.com/dukecrea" className="px-8 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-100">
              Instagram @dukecrea
            </a>
            <a href="mailto:duque629@gmail.com" className="px-8 py-3 border border-white text-white rounded-lg font-medium hover:bg-white hover:text-black transition">
              Email
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 px-6 text-center text-gray-600 text-sm">
        <div className="max-w-6xl mx-auto">
          <p>© 2026 DukeCrea. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
