"use client";

import {
  createContext,
  FormEvent,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { AnimatedLink, InteractiveCard, StaggerItem } from "./motion";
import { playHoverTick, playTap } from "./ui-sounds";

type PreviewOfferValue = { active: boolean; activate: () => void; reset: () => void };
const PreviewOfferContext = createContext<PreviewOfferValue | null>(null);

export function PreviewOfferProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(false);
  const reset = useCallback(() => setActive(false), []);
  const activate = useCallback(() => {
    window.setTimeout(() => {
      const target = document.getElementById("plano-profissional");
      if (!target) {
        setActive(true);
        return;
      }

      let finished = false;
      let observedScroll = false;
      let quietTimer = 0;
      let noScrollTimer = 0;
      let safetyTimer = 0;
      const finishAfterScroll = () => {
        if (finished) return;
        finished = true;
        window.clearTimeout(quietTimer);
        window.clearTimeout(noScrollTimer);
        window.clearTimeout(safetyTimer);
        window.removeEventListener("scroll", handleScroll);
        setActive(true);
      };
      const handleScroll = () => {
        observedScroll = true;
        window.clearTimeout(quietTimer);
        quietTimer = window.setTimeout(finishAfterScroll, 180);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      noScrollTimer = window.setTimeout(() => {
        if (!observedScroll) finishAfterScroll();
      }, 800);
      safetyTimer = window.setTimeout(finishAfterScroll, 4000);
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 120);
  }, []);

  return (
    <PreviewOfferContext.Provider value={{ active, activate, reset }}>
      {children}
    </PreviewOfferContext.Provider>
  );
}

function usePreviewOffer() {
  const context = useContext(PreviewOfferContext);
  if (!context) throw new Error("PreviewOfferProvider não encontrado");
  return context;
}

type Plan = {
  name: string;
  price: string;
  description: string;
  featured?: boolean;
  items: string[];
};

export function PreviewPlanCard({ plan }: { plan: Plan }) {
  const { active } = usePreviewOffer();
  const featuredTrial = Boolean(plan.featured && active);

  return (
    <StaggerItem className="plan-slot" soundHover={false}>
      <div id={plan.featured ? "plano-profissional" : undefined}>
        <InteractiveCard
          className={`plan-card${plan.featured ? " plan-featured" : ""}${featuredTrial ? " plan-preview-highlight" : ""}`}
          featured={Boolean(plan.featured)}
        >
          {plan.featured && <span className="popular">{featuredTrial ? "TESTE GRÁTIS" : "MAIS ESCOLHIDO"}</span>}
          <h3>{plan.name}</h3>
          <p className="plan-description">{plan.description}</p>
          <div className={`plan-price-transition${featuredTrial ? " has-trial" : ""}`} aria-live="polite">
            <p className="price" aria-hidden={featuredTrial}>R$ {plan.price}<small>/mês</small></p>
            {plan.featured && <div className="plan-trial-offer" aria-hidden={!featuredTrial}>
              <strong>Teste grátis por 15 dias</strong>
              <span>Ao final, o acesso pausa. Para continuar, escolha um plano.</span>
              <small>Sem cobrança automática. Profissional por R$ {plan.price}/mês se contratar.</small>
            </div>}
          </div>
          <ul>{plan.items.map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul>
          <AnimatedLink href="#cadastro" className="plan-button">{featuredTrial ? "Quero conhecer o plano" : "Começar Agora"}</AnimatedLink>
        </InteractiveCard>
      </div>
    </StaggerItem>
  );
}

const categories = [
  { id: "cabelo", name: "Cabelo" },
  { id: "barba", name: "Barba" },
  { id: "sobrancelha", name: "Sobrancelha" },
] as const;

const services = [
  { category: "cabelo", name: "Corte de Cabelo", minutes: 20, price: 20 },
  { category: "cabelo", name: "Corte Navalhado", minutes: 30, price: 35 },
  { category: "cabelo", name: "Corte Degradê", minutes: 30, price: 30 },
  { category: "cabelo", name: "Corte Infantil", minutes: 20, price: 25 },
  { category: "cabelo", name: "Pigmentação", minutes: 40, price: 45 },
  { category: "barba", name: "Barba Completa", minutes: 25, price: 25 },
  { category: "barba", name: "Barboterapia", minutes: 35, price: 40 },
  { category: "barba", name: "Aparar Barba", minutes: 15, price: 18 },
  { category: "barba", name: "Barba na Navalha", minutes: 30, price: 35 },
  { category: "barba", name: "Desenho de Barba", minutes: 20, price: 22 },
  { category: "sobrancelha", name: "Design de Sobrancelha", minutes: 15, price: 15 },
  { category: "sobrancelha", name: "Sobrancelha na Navalha", minutes: 15, price: 18 },
  { category: "sobrancelha", name: "Sobrancelha na Pinça", minutes: 15, price: 15 },
  { category: "sobrancelha", name: "Henna na Sobrancelha", minutes: 20, price: 25 },
  { category: "sobrancelha", name: "Sobrancelha Completa", minutes: 25, price: 30 },
] as const;

type Step = "categories" | "services" | "schedule" | "details" | "done";

function Chevron() {
  return <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5" /></svg>;
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits ? `(${digits}` : "";
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function nextOpenDays() {
  const days: Date[] = [];
  const day = new Date();
  day.setHours(12, 0, 0, 0);
  for (let offset = 1; days.length < 4 && offset < 8; offset++) {
    const date = new Date(day);
    date.setDate(day.getDate() + offset);
    if (date.getDay() !== 0) days.push(date);
  }
  return days;
}

export function BookingPreview() {
  const { activate, reset } = usePreviewOffer();
  const [step, setStep] = useState<Step>("categories");
  const [categoryId, setCategoryId] = useState<(typeof categories)[number]["id"]>("cabelo");
  const [serviceIndex, setServiceIndex] = useState(0);
  const [dateIndex, setDateIndex] = useState(0);
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [days] = useState(nextOpenDays);

  const category = categories.find((item) => item.id === categoryId)!;
  const categoryServices = useMemo(() => services.filter((item) => item.category === categoryId), [categoryId]);
  const selectedService = categoryServices[serviceIndex];
  const times = ["09:00", "10:30", "13:00", "14:30", "16:00"];

  function back() {
    if (step === "services") setStep("categories");
    else if (step === "schedule") setStep("services");
    else if (step === "details") setStep("schedule");
    else if (step === "done") setStep("details");
  }

  function chooseCategory(id: (typeof categories)[number]["id"]) {
    setCategoryId(id);
    setServiceIndex(0);
    setStep("services");
  }

  function submitDetails(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (name.trim().length < 2) {
      setError("Digite seu nome para continuar.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 10) {
      setError("Digite um WhatsApp válido com DDD.");
      return;
    }
    setError("");
    setStep("done");
    activate();
  }

  return (
    <div className="booking-preview" aria-label="Preview interativo do agendamento da Léo Macedo Barbearia">
      <img className="booking-preview-frame" src="/assets/booking-dashboard.png" alt="Celular com a tela de agendamento da Léo Macedo Barbearia" />
      <div
        className="booking-preview-screen"
        onClickCapture={(event) => {
          if ((event.target as HTMLElement).closest("button")) playTap();
        }}
        onPointerOverCapture={(event) => {
          if ((event.target as HTMLElement).closest("button")) playHoverTick();
        }}
      >
        <div className="preview-content" key={step}>
          {step === "categories" && <>
            <p className="preview-welcome">Seja bem-vindo(a) ao</p>
            <h3 className="preview-brand-title">Léo Macedo Barbearia</h3>
            <p className="preview-prompt">O que você deseja agendar?</p>
            <div className="preview-list preview-category-list">
              {categories.map((item) => (
                <button className="preview-category" key={item.id} onClick={() => chooseCategory(item.id)}>
                  <span>{item.name}<small>5 serviços</small></span><Chevron />
                </button>
              ))}
            </div>
            <div className="preview-home-footer"><span>▦ &nbsp; Meus agendamentos</span><div><i /></div></div>
          </>}

          {step === "services" && <>
            <button className="preview-back" onClick={back}>‹ <span>Voltar</span></button>
            <p className="preview-prompt preview-step-title">{category.name}</p>
            <p className="preview-subtitle">Escolha o serviço que deseja agendar.</p>
            <div className="preview-list preview-service-list">
              {categoryServices.map((service, index) => (
                <button className="preview-service" key={service.name} onClick={() => { setServiceIndex(index); setTime(""); setStep("schedule"); }}>
                  <span><strong>{service.name}</strong><small>{service.minutes} min · R$ {service.price.toFixed(2).replace(".", ",")}</small></span><Chevron />
                </button>
              ))}
            </div>
          </>}

          {step === "schedule" && <>
            <button className="preview-back" onClick={back}>‹ <span>Voltar</span></button>
            <p className="preview-prompt preview-step-title">Data e horário</p>
            <p className="preview-subtitle">{selectedService.name}</p>
            <div className="preview-month">Escolha uma data disponível</div>
            <div className="preview-days">
              {days.map((day, index) => (
                <button className={dateIndex === index ? "selected" : ""} key={day.toISOString()} onClick={() => { setDateIndex(index); setTime(""); }}>
                  <small>{new Intl.DateTimeFormat("pt-BR", { weekday: "short" }).format(day).replace(".", "")}</small><strong>{day.getDate()}</strong>
                </button>
              ))}
            </div>
            <p className="preview-available-label">Horários disponíveis</p>
            <div className="preview-times">
              {times.map((slot) => <button key={slot} className={time === slot ? "selected" : ""} onClick={() => setTime(slot)}>{slot}</button>)}
            </div>
            <button className="preview-primary" disabled={!time} onClick={() => time && setStep("details")}>Continuar</button>
          </>}

          {step === "details" && <>
            <button className="preview-back" onClick={back}>‹ <span>Voltar</span></button>
            <p className="preview-prompt preview-step-title">Seus dados</p>
            <p className="preview-subtitle">Só falta preencher seus dados para concluir.</p>
            <div className="preview-summary"><strong>{selectedService.name}</strong><span>{days[dateIndex]?.toLocaleDateString("pt-BR")} · {time} · R$ {selectedService.price.toFixed(2).replace(".", ",")}</span></div>
            <form className="preview-form" onSubmit={submitDetails}>
              <label>Nome<input autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Seu nome" /></label>
              <label>WhatsApp<input autoComplete="tel" inputMode="tel" value={phone} onChange={(event) => setPhone(formatPhone(event.target.value))} placeholder="(00) 00000-0000" /></label>
              {error && <p className="preview-error" role="alert">{error}</p>}
              <p className="preview-privacy">Demonstração: seus dados não serão enviados nem salvos.</p>
              <button className="preview-primary" type="submit">Confirmar</button>
            </form>
          </>}

          {step === "done" && <div className="preview-success">
            <div className="preview-check">✓</div>
            <p className="preview-prompt preview-step-title">Prévia concluída!</p>
            <p className="preview-subtitle">Esse foi o fluxo de agendamento da Léo Macedo Barbearia.</p>
            <div className="preview-summary"><strong>{selectedService.name}</strong><span>{days[dateIndex]?.toLocaleDateString("pt-BR")} às {time}</span><span>Em um agendamento real, seus dados seriam enviados para a barbearia.</span></div>
            <p className="preview-trial-hint">Confira o teste grátis de 15 dias do plano Profissional.</p>
            <button className="preview-back preview-restart" onClick={() => { reset(); setStep("categories"); setName(""); setPhone(""); setTime(""); }}>Fazer outra prévia</button>
          </div>}
        </div>
        {step !== "categories" && step !== "done" && <div className="preview-progress"><i style={{ width: `${({ services: 25, schedule: 50, details: 75 } as const)[step]}%` }} /><span>{({ services: 2, schedule: 3, details: 4 } as const)[step]}/4</span></div>}
      </div>
    </div>
  );
}
