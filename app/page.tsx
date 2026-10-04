import {
  AnimatedLink,
  HeroMockups,
  Reveal,
  StaggerGrid,
  StaggerItem,
} from "./motion";
import { SoundToggle } from "./sound-toggle";
import { BookingPreview, PreviewOfferProvider, PreviewPlanCard } from "./booking-preview";

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

function Arrow() { return <svg className="arrow" viewBox="0 0 24 18" aria-hidden="true"><path d="M2 9H20M13 2L20 9L13 16" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function Button({ children }: { children: React.ReactNode }) { return <AnimatedLink className="button" href="#planos">{children}<Arrow /></AnimatedLink>; }
function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) { return <div className={`eyebrow${dark ? " eyebrow-dark" : ""}`}><span />{children}</div>; }

export default function Home() {
  return (
    <PreviewOfferProvider>
    <main className="min-h-screen bg-[#141414] text-white">
      <section className="hero" id="inicio">
        <Reveal className="topbar-reveal" trigger="load" direction="up">
          <header className="topbar">
            <a href="#inicio" className="brand"><img src={`${A}logo.svg`} alt="Agenda Cortes" /></a>
            <nav aria-label="Navegação principal"><AnimatedLink className="nav-link" href="#inicio">Início</AnimatedLink><AnimatedLink className="nav-link" href="#recursos">Recursos</AnimatedLink><AnimatedLink className="nav-link" href="#planos">Planos</AnimatedLink><AnimatedLink className="nav-link" href="#demonstracao">Demonstração</AnimatedLink></nav>
            <AnimatedLink className="nav-cta" href="#planos">Começar agora <Arrow /></AnimatedLink>
            <SoundToggle />
            <button className="menu-toggle" aria-label="Abrir menu"><i /><i /><i /></button>
          </header>
        </Reveal>
        <div className="hero-inner">
          <Reveal className="hero-copy" trigger="load" delay={0.08}>
            <p className="kicker">SISTEMA DE AGENDAMENTO PARA BARBEARIAS</p>
            <h1>Mais tempo<br />para o que realmente<br /><em>importa.</em></h1>
            <p className="hero-description">O Agenda Cortes é um sistema simples, rápido e eficiente para você organizar seus agendamentos, reduzir faltas e oferecer uma experiência profissional para seus clientes.</p>
            <div className="hero-actions"><Button>Começar agora</Button><AnimatedLink className="watch-link" href="#demonstracao"><img src={`${A}play.svg`} alt="" /> <span>Ver como funciona</span></AnimatedLink></div>
          </Reveal>
          <HeroMockups />
        </div>
      </section>

      <section className="features section-light" id="recursos">
        <div className="section-inner features-inner">
          <Reveal className="features-copy" direction="left">
            <Eyebrow dark>PARA VOCÊ E SEUS CLIENTES</Eyebrow>
            <h2>Tudo que você precisa,<br />em um só lugar.</h2>
            <p className="section-intro">Do agendamento à gestão do seu negócio, o Agenda Barber foi feito para facilitar sua rotina e garantir uma experiência incrível para seus clientes.</p>
            <StaggerGrid className="feature-grid">{features.map((feature) => <StaggerItem className="feature-item" key={feature.title}><img src={`${A}${feature.icon}`} alt="" /><div><h3>{feature.title}</h3><p>{feature.text}</p></div></StaggerItem>)}</StaggerGrid>
          </Reveal>
          <Reveal className="feature-mockup" direction="right"><BookingPreview /></Reveal>
        </div>
      </section>

      <section className="showcase" id="demonstracao">
        <div className="showcase-inner">
          <Reveal className="showcase-copy" direction="left"><span className="pill-label">SIMPLES E INTERATIVO</span><h2>Sua barbearia<br />mais <em>organizada.</em></h2><p>Com uma interface moderna e fácil de usar, o Agenda Barber ajuda você a focar no que mais importa: seus clientes.</p><Button>Começar agora</Button></Reveal>
          <StaggerGrid className="benefit-grid">{benefits.map((benefit) => <StaggerItem className="benefit-item" key={benefit.title}><img src={`${A}${benefit.icon}`} alt="" /><h3>{benefit.title}</h3><p>{benefit.text}</p></StaggerItem>)}</StaggerGrid>
        </div>
      </section>

      <section className="plans section-light" id="planos">
        <Reveal className="plans-heading"><Eyebrow dark>Planos</Eyebrow><h2>Escolha o plano ideal para sua barbearia</h2><p>Comece agora e veja como é fácil transformar sua rotina.</p></Reveal>
        <StaggerGrid className="plan-grid">{plans.map((plan) => <PreviewPlanCard plan={plan} key={plan.name} />)}</StaggerGrid>
      </section>

      <section className="testimonials">
        <div className="testimonials-inner"><Reveal className="testimonials-heading"><Eyebrow>O QUE NOSSOS CLIENTES DIZEM</Eyebrow><h2>Barbearias que já usam<br />e recomendam.</h2></Reveal><StaggerGrid className="review-grid">{reviews.map((review) => <StaggerItem className="review-card" key={review.name}><p>“{review.quote}”</p><div className="review-author"><img src={`${A}${review.image}`} alt="" /><div><strong>{review.name}</strong><span>{review.role}</span></div></div></StaggerItem>)}</StaggerGrid></div>
      </section>

      <section className="final-cta" id="cadastro"><Reveal className="final-cta-inner" direction="left"><Eyebrow>PRONTO PARA LEVAR SUA BARBEARIA AO PRÓXIMO NÍVEL?</Eyebrow><h2>Comece agora mesmo!</h2><p>Cadastre-se e tenha acesso a todas as funcionalidades.</p><AnimatedLink className="nav-cta" href="#inicio">Criar minha conta <Arrow /></AnimatedLink><AnimatedLink className="whatsapp" href="#inicio"><img src={`${A}whatsapp.svg`} alt="" /><span>Dúvidas?<br />Fale conosco pelo WhatsApp.</span></AnimatedLink></Reveal></section>

      <footer className="footer"><div className="footer-main"><AnimatedLink href="#inicio" className="brand footer-brand"><img src={`${A}logo.svg`} alt="Agenda Cortes" /></AnimatedLink><nav aria-label="Navegação do rodapé"><AnimatedLink className="footer-link" href="#inicio">Início</AnimatedLink><AnimatedLink className="footer-link" href="#recursos">Recursos</AnimatedLink><AnimatedLink className="footer-link" href="#planos">Planos</AnimatedLink><AnimatedLink className="footer-link" href="#demonstracao">Demonstração</AnimatedLink></nav><div className="socials"><a href="#inicio"><img src={`${A}instagram.svg`} alt="Instagram" /></a><a href="#inicio"><img src={`${A}whatsapp.svg`} alt="WhatsApp" /></a><a href="#inicio"><img src={`${A}youtube.svg`} alt="YouTube" /></a></div><p className="credits">Design e desenvolvimento por <em>Neura</em></p></div><div className="footer-bottom"><span>2026 Agenda Cortes. Todos os direitos reservados.</span><div><AnimatedLink className="footer-link" href="#inicio">Termos de uso</AnimatedLink><AnimatedLink className="footer-link" href="#inicio">Privacidade</AnimatedLink></div></div></footer>
    </main>
    </PreviewOfferProvider>
  );
}
