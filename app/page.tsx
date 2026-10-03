const A = "/assets/";

const features = [
  { icon: "agenda.svg", title: "Agendamento Online", text: "Seus clientes agendam de onde quiserem, de forma rápida e prática." },
  { icon: "notifications.svg", title: "Lembretes semi-automáticos", text: "Reduza faltas com notificações por WhatsApp e tenha uma agenda mais cheia." },
  { icon: "clock.svg", title: "Gestão de horários", text: "Organize seus horários, defina disponibilidade e evite conflitos com facilidade." },
  { icon: "chart.svg", title: "Relatórios e controle", text: "Acompanhe seus atendimentos, serviços mais realizados e o crescimento da sua barbearia." },
];

const benefits = [
  { icon: "cursor.svg", title: "Interface intuitiva", text: "Simples de usar, sem complicação." },
  { icon: "devices.svg", title: "Acesso em qualquer lugar", text: "Gerencie sua barbearia pelo celular ou computador." },
  { icon: "security.svg", title: "Segurança de dados", text: "Seus dados protegidos e sempre disponíveis." },
  { icon: "headphone.svg", title: "Suporte especializado", text: "Estamos aqui para te ajudar sempre que precisar." },
];

const plans = [
  { name: "Básico", price: "29,90", description: "Ideal para barbearias em início de jornada.", items: ["Tudo do plano Básico", "Lembretes por WhatsApp", "Gestão de horários", "Suporte por WhatsApp"] },
  { name: "Profissional", price: "49,90", description: "Mais controle e recursos para o seu dia a dia.", featured: true, items: ["Tudo do plano Básico", "Relatórios de atendimentos", "Cadastro de múltiplos profissionais", "Personalização da marca"] },
  { name: "Empresarial", price: "119,90", description: "Ideal para barbearias em início de jornada.", items: ["Tudo do plano Profissional", "Integração com pagamentos", "Cadastro de múltiplos profissionais", "Suporte prioritário"] },
];

const reviews = [
  { quote: "O Agenda Barber me ajudou a organizar a agenda e reduzir as faltas. Hoje minha barbearia tá muito mais produtiva!", name: "Lucas Ferreira", role: "Barbeiro da barbearia Lucas", image: "barber-1.svg" },
  { quote: "Sistema simples, direto e muito completo. Atendimento excelente e sempre disponível pra ajudar. Recomendo demais!", name: "Felipe Lima", role: "Black Barber", image: "barber-2.svg" },
  { quote: "Desde que comecei a usar, meus agendamentos aumentaram e o controle ficou muito mais fácil. Top demais!", name: "Rafael Santos", role: "Estilo & Corte", image: "barber-3.svg" },
];

function Arrow() { return <span className="arrow" aria-hidden="true">→</span>; }
function Button({ children }: { children: React.ReactNode }) { return <a className="button" href="#planos">{children}<Arrow /></a>; }
function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) { return <div className={`eyebrow${dark ? " eyebrow-dark" : ""}`}><span />{children}</div>; }

export default function Home() {
  return (
    <main className="min-h-screen bg-[#141414] text-white">
      <section className="hero" id="inicio">
        <header className="topbar">
          <a href="#inicio" className="brand"><img src={`${A}logo.svg`} alt="Agenda Cortes" /></a>
          <nav aria-label="Navegação principal"><a href="#inicio">Início</a><a href="#recursos">Recursos</a><a href="#planos">Planos</a><a href="#demonstracao">Demonstração</a></nav>
          <a className="nav-cta" href="#planos">Começar agora <Arrow /></a>
          <button className="menu-toggle" aria-label="Abrir menu"><i /><i /><i /></button>
        </header>
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="kicker">SISTEMA DE AGENDAMENTO PARA BARBEARIAS</p>
            <h1>Mais tempo<br />para o que realmente<br /><em>importa.</em></h1>
            <p className="hero-description">O AgendaBarber é um sistema simples, rápido e eficiente para você organizar seus agendamentos, reduzir faltas e oferecer uma experiência profissional para seus clientes.</p>
            <div className="hero-actions"><Button>Começar agora</Button><a className="watch-link" href="#demonstracao"><img src={`${A}play.svg`} alt="" /> <span>Ver como funciona</span></a></div>
          </div>
          <div className="hero-phones" aria-label="Telas do aplicativo Agenda Barber">
            <img className="phone-confirm" src={`${A}booking-confirmation.png`} alt="Confirmação de agendamento no aplicativo" />
            <img className="phone-calendar" src={`${A}booking-phone.png`} alt="Escolha de data e horário no aplicativo" />
          </div>
        </div>
      </section>

      <section className="features section-light" id="recursos">
        <div className="section-inner features-inner">
          <div className="features-copy">
            <Eyebrow dark>PARA VOCÊ E SEUS CLIENTES</Eyebrow>
            <h2>Tudo que você precisa,<br />em um só lugar.</h2>
            <p className="section-intro">Do agendamento à gestão do seu negócio, o Agenda Barber foi feito para facilitar sua rotina e garantir uma experiência incrível para seus clientes.</p>
            <div className="feature-grid">{features.map((feature) => <article className="feature-item" key={feature.title}><img src={`${A}${feature.icon}`} alt="" /><div><h3>{feature.title}</h3><p>{feature.text}</p></div></article>)}</div>
          </div>
          <div className="feature-mockup"><img src={`${A}booking-dashboard.png`} alt="Aplicativo de agendamento da barbearia Léo Macedo" /></div>
        </div>
      </section>

      <section className="showcase" id="demonstracao">
        <div className="showcase-inner">
          <div className="showcase-copy"><span className="pill-label">SIMPLES E INTERATIVO</span><h2>Sua barbearia<br />mais <em>organizada.</em></h2><p>Com uma interface moderna e fácil de usar,<br className="desktop-break" /> o Agenda Barber ajuda você a focar no que<br className="desktop-break" /> mais importa: seus clientes.</p><Button>Começar agora</Button></div>
          <div className="benefit-grid">{benefits.map((benefit) => <article className="benefit-item" key={benefit.title}><img src={`${A}${benefit.icon}`} alt="" /><h3>{benefit.title}</h3><p>{benefit.text}</p></article>)}</div>
        </div>
      </section>

      <section className="plans section-light" id="planos">
        <div className="plans-heading"><Eyebrow dark>Planos</Eyebrow><h2>Escolha o plano ideal para sua barbearia</h2><p>Comece agora e veja como é fácil transformar sua rotina.</p></div>
        <div className="plan-grid">{plans.map((plan) => <article className={`plan-card${plan.featured ? " plan-featured" : ""}`} key={plan.name}>{plan.featured && <span className="popular">MAIS ESCOLHIDO</span>}<h3>{plan.name}</h3><p className="plan-description">{plan.description}</p><p className="price">R$ {plan.price}<small>/mês</small></p><ul>{plan.items.map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul><a href="#cadastro" className="plan-button">Começar Agora</a></article>)}</div>
      </section>

      <section className="testimonials">
        <div className="testimonials-inner"><div className="testimonials-heading"><Eyebrow>O QUE NOSSOS CLIENTES DIZEM</Eyebrow><h2>Barbearias que já usam<br />e recomendam.</h2></div><div className="review-grid">{reviews.map((review) => <article className="review-card" key={review.name}><p>“{review.quote}”</p><div className="review-author"><img src={`${A}${review.image}`} alt="" /><div><strong>{review.name}</strong><span>{review.role}</span></div></div></article>)}</div></div>
      </section>

      <section className="final-cta" id="cadastro"><div className="final-cta-inner"><Eyebrow>PRONTO PARA LEVAR SUA BARBEARIA AO PRÓXIMO NÍVEL?</Eyebrow><h2>Comece agora mesmo!</h2><p>Cadastre-se e tenha acesso a todas as funcionalidades.</p><a className="nav-cta" href="#inicio">Criar minha conta <Arrow /></a><a className="whatsapp" href="#inicio"><img src={`${A}whatsapp.svg`} alt="" /><span>Dúvidas?<br />Fale conosco pelo WhatsApp.</span></a></div></section>

      <footer className="footer"><div className="footer-main"><a href="#inicio" className="brand footer-brand"><img src={`${A}logo.svg`} alt="Agenda Cortes" /></a><nav aria-label="Navegação do rodapé"><a href="#inicio">Início</a><a href="#recursos">Recursos</a><a href="#planos">Planos</a><a href="#demonstracao">Demonstração</a></nav><div className="socials"><a href="#inicio"><img src={`${A}instagram.svg`} alt="Instagram" /></a><a href="#inicio"><img src={`${A}whatsapp.svg`} alt="WhatsApp" /></a><a href="#inicio"><img src={`${A}youtube.svg`} alt="YouTube" /></a></div><p className="credits">Design e desenvolvimento por <em>Neura</em></p></div><div className="footer-bottom"><span>2026 Agenda Cortes. Todos os direitos reservados.</span><div><a href="#inicio">Termos de uso</a><a href="#inicio">Privacidade</a></div></div></footer>
    </main>
  );
}
