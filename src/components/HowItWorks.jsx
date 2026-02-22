import React, { useState, useRef, useEffect, useCallback } from "react";
import "./HowItWorks.css";
import { useNavigate } from "react-router-dom";
import { Calculator, Beer, Zap, MapPin, ArrowRight, ChevronRight } from "lucide-react";

/* ─────────────────────────────────────────────
   Dados dos passos
───────────────────────────────────────────── */
const STEPS = [
  {
    id: 1,
    number: "01",
    icon: Calculator,
    accent: "#f59e0b",
    accentRgb: "245,158,11",
    tag: "Primeiro passo",
    title: "Calcule quanto Chopp você precisa",
    subtitle: "Descubra a quantidade exata para o seu evento",
    desc: "Use nossa calculadora inteligente e saiba exatamente quantos litros de chopp você precisa. Sem desperdício, sem falta — só a medida certa para a sua festa.",
    cta: "Calcular",
    targetId: "calculator",
    particles: ["🍺", "🍻", "🫧"],
  },
  {
    id: 2,
    number: "02",
    icon: Beer,
    accent: "#fb923c",
    accentRgb: "251,146,60",
    tag: "Segundo passo",
    title: "Escolha o seu Chopp da vez",
    subtitle: "Aproveite e selecione outros produtos para complementar",
    desc: "Explore nosso catálogo com os melhores rótulos e estilos de chopp. Adicione ao carrinho em poucos cliques e complemente com outros produtos para tornar seu evento ainda mais especial.",
    cta: "Ver produtos",
    targetId: "products",
    particles: ["🍺", "🌾", "✨"],
  },
  {
    id: 3,
    number: "03",
    icon: Zap,
    accent: "#eab308",
    accentRgb: "234,179,8",
    tag: "Terceiro passo",
    title: "Selecione o equipamento ideal para o seu evento",
    subtitle: "Chopeira elétrica ou HomeBar — você escolhe",
    desc: "Temos o equipamento perfeito para cada tipo de evento. Compare as opções, veja as especificações e escolha o que melhor se encaixa no seu espaço e no seu estilo.",
    cta: "Escolher",
    targetId: "services",
    particles: ["⚡", "🔧", "🏆"],
  },
  {
    id: 4,
    number: "04",
    icon: MapPin,
    accent: "#22c55e",
    accentRgb: "34,197,94",
    tag: "Último passo",
    title: "Informe o endereço do seu evento",
    subtitle: "Entregamos, instalamos e recolhemos no horário programado",
    desc: "Preencha os dados do evento com data, horário e endereço. Nossa equipe entrega, instala tudo no local e recolhe ao final — você só precisa aproveitar.",
    cta: "Finalizar meu pedido",
    targetId: "cart",
    particles: ["📍", "🚚", "🎉"],
  },
];

/* ─────────────────────────────────────────────
   Partículas flutuantes por card
───────────────────────────────────────────── */
function FloatingParticles({ particles, active, accent }) {
  return (
    <div className="hiw-particles" aria-hidden="true">
      {particles.map((p, i) => (
        <span
          key={i}
          className={`hiw-particle hiw-particle--${i + 1} ${active ? "hiw-particle--active" : ""}`}
          style={{ "--accent": accent }}
        >
          {p}
        </span>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Card individual
───────────────────────────────────────────── */
function StepCard({ step, index, isActive, onHover, onLeave, onAction }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  /* Efeito de spotlight magnético no mouse */
  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -8;
    const rotY = ((x - cx) / cx) * 8;
    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(6px)`;
    glow.style.background = `radial-gradient(280px circle at ${x}px ${y}px, rgba(${step.accentRgb},0.22), transparent 70%)`;
  }, [step.accentRgb]);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (card) card.style.transform = "";
    if (glow) glow.style.background = "";
    onLeave();
  }, [onLeave]);

  const Icon = step.icon;

  return (
    <div
      ref={cardRef}
      className={`hiw-card ${isActive ? "hiw-card--active" : ""}`}
      style={{ "--accent": step.accent, "--accent-rgb": step.accentRgb, "--delay": `${index * 0.12}s` }}
      onMouseEnter={onHover}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="article"
      aria-label={`Passo ${step.id}: ${step.title}`}
    >
      {/* Glow spotlight */}
      <div ref={glowRef} className="hiw-card__glow" aria-hidden="true" />

      {/* Borda animada */}
      <div className="hiw-card__border" aria-hidden="true" />

      {/* Partículas */}
      <FloatingParticles particles={step.particles} active={isActive} accent={step.accent} />

      {/* Conteúdo */}
      <div className="hiw-card__inner">
        {/* Topo: número + tag */}
        <div className="hiw-card__head">
          <span className="hiw-card__tag">{step.tag}</span>
          <span className="hiw-card__num">{step.number}</span>
        </div>

        {/* Ícone com anel pulsante */}
        <div className="hiw-card__iconWrap">
          <div className="hiw-card__iconRing" aria-hidden="true" />
          <div className="hiw-card__iconBg">
            <Icon size={26} strokeWidth={1.8} />
          </div>
        </div>

        {/* Textos */}
        <div className="hiw-card__body">
          <h3 className="hiw-card__title">{step.title}</h3>
          <p className="hiw-card__subtitle">{step.subtitle}</p>
          <p className="hiw-card__desc">{step.desc}</p>
        </div>

        {/* CTA */}
        {step.targetId === 'cart' ? (
          <button
            type="button"
            className="hiw-card__cta"
            onClick={() => onAction(step)}
          >
            <span>{step.cta}</span>
            <span className="hiw-card__ctaArrow">
              <ArrowRight size={15} strokeWidth={2.5} />
            </span>
          </button>
        ) : (
          <a
            href={`#${step.targetId}`}
            className="hiw-card__cta"
          >
            <span>{step.cta}</span>
            <span className="hiw-card__ctaArrow">
              <ArrowRight size={15} strokeWidth={2.5} />
            </span>
          </a>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Linha conectora animada
───────────────────────────────────────────── */
function ConnectorLine({ activeStep }) {
  const progress = activeStep ? ((activeStep - 1) / 3) * 100 : 0;
  return (
    <div className="hiw-connector" aria-hidden="true">
      <div className="hiw-connector__track" />
      <div
        className="hiw-connector__fill"
        style={{ width: `${progress}%` }}
      />
      {STEPS.map((s) => (
        <div
          key={s.id}
          className={`hiw-connector__dot ${activeStep >= s.id ? "hiw-connector__dot--active" : ""}`}
          style={{
            left: `calc(${((s.id - 1) / 3) * 100}% + ${s.id === 1 ? "0px" : s.id === 4 ? "0px" : "0px"})`,
            "--accent": s.accent,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Componente principal
───────────────────────────────────────────── */
const HowItWorks = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  /* Intersection Observer para animação de entrada */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    // Verifica se já está visível no carregamento inicial
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const scrollTo = useCallback((id) => {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const headerH = document.querySelector("header")?.offsetHeight ?? 80;
        const targetY = el.offsetTop - headerH - 20;
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }
    }, 100);
  }, []);

  const handleAction = useCallback((step) => {
    console.log('handleAction called with:', step.targetId);
    if (step.targetId === "cart") {
      console.log('Navigating to cart');
      navigate("/carrinho");
    } else {
      console.log('Scrolling to:', step.targetId);
      scrollTo(step.targetId);
    }
  }, [navigate, scrollTo]);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className={`hiw-section ${visible ? "hiw-section--visible" : ""}`}
    >
      {/* Background decorativo */}
      <div className="hiw-bg" aria-hidden="true">
        <div className="hiw-bg__orb hiw-bg__orb--1" />
        <div className="hiw-bg__orb hiw-bg__orb--2" />
        <div className="hiw-bg__orb hiw-bg__orb--3" />
        <div className="hiw-bg__grid" />
      </div>

      <div className="hiw-container">
        {/* Header da seção */}
        <div className="hiw-header">
          <div className="hiw-header__badge">
            <span className="hiw-header__badgeDot" />
            Como funciona
          </div>
          <h2 className="hiw-header__title">
            Seu evento perfeito em{" "}
            <span className="hiw-header__titleAccent">4 passos</span>
          </h2>
          <p className="hiw-header__sub">
            Da calculadora à entrega — tudo simples, rápido e sem complicação.
          </p>
        </div>

        {/* Linha conectora (desktop) */}
        <ConnectorLine activeStep={activeStep} />

        {/* Grid de cards */}
        <div
          className="hiw-grid"
          onMouseLeave={() => setActiveStep(null)}
        >
          {STEPS.map((step, i) => (
            <StepCard
              key={step.id}
              step={step}
              index={i}
              isActive={activeStep === step.id}
              onHover={() => setActiveStep(step.id)}
              onLeave={() => setActiveStep(null)}
              onAction={handleAction}
            />
          ))}
        </div>

        {/* Rodapé da seção */}
        <div className="hiw-footer">
          <p className="hiw-footer__text">
            Pronto para começar?
          </p>
          <button
            type="button"
            className="hiw-footer__cta"
            onClick={() => scrollTo("calculator")}
          >
            Começar agora
            <ChevronRight size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
