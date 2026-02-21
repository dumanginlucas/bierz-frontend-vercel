import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const [active, setActive] = useState(null);
  const navigate = useNavigate();

  // eslint-disable-next-line no-console
  console.log("BIERZ FRONT v7 - Como funciona");

  const steps = useMemo(
    () => [
      {
        id: 1,
        media: "calc",
        kicker: "Comece aqui",
        title: "Calcule quantos litros você precisa",
        desc: "Use a calculadora e descubra a quantidade ideal para o seu evento.",
        cta: "Calcular agora",
        action: () => {
          const el = document.getElementById("calculator");
          if (el) {
            const headerEl = document.querySelector('header');
            const headerH = headerEl?.offsetHeight ?? 0;
            const y = el.getBoundingClientRect().top + window.scrollY - headerH - 12;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        },
      },
      {
        id: 2,
        media: "beer",
        kicker: "Escolha seu chopp",
        title: "Escolha o chopp da vez",
        desc: "Selecione seus estilos preferidos e adicione ao carrinho em poucos cliques.",
        cta: "Escolher chopp",
        action: () => {
          const el = document.getElementById("products");
          if (el) {
            const headerEl = document.querySelector('header');
            const headerH = headerEl?.offsetHeight ?? 0;
            const y = el.getBoundingClientRect().top + window.scrollY - headerH - 12;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        },
      },
      {
        id: 3,
        media: "tap",
        kicker: "Defina o equipamento",
        title: "Chopeira elétrica ou HomeBar?",
        desc: "Compare as opções e escolha o equipamento ideal para o seu evento.",
        cta: "Ver equipamentos",
        action: () => {
          const el = document.getElementById("services");
          if (el) {
            const headerEl = document.querySelector('header');
            const headerH = headerEl?.offsetHeight ?? 0;
            const y = el.getBoundingClientRect().top + window.scrollY - headerH - 12;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        },
      },
      {
        id: 4,
        media: "truck",
        kicker: "Preencha os dados e finalize",
        title: "Entregamos, instalamos e retiramos",
        desc: "Preencha os dados do evento e finalize seu pedido com data, horário e local definidos.",
        cta: "Finalizar pedido",
        action: () => navigate("/cart"),
      },
    ],
    [navigate]
  );


  const MediaIcon = ({ name }) => {
    switch (name) {
      case "calc":
        return (
          <svg viewBox="0 0 64 64" className="how-media__icon" aria-hidden="true">
            <defs>
              <linearGradient id="amber" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#f59e0b" />
                <stop offset="1" stopColor="#f97316" />
              </linearGradient>
            </defs>
            <rect x="14" y="10" width="36" height="44" rx="10" fill="rgba(255,255,255,0.06)" stroke="rgba(245,158,11,0.35)" />
            <rect x="20" y="16" width="24" height="10" rx="4" fill="rgba(245,158,11,0.15)" stroke="rgba(245,158,11,0.35)" />
            <g fill="url(#amber)" opacity="0.95">
              <circle cx="24" cy="34" r="3" />
              <circle cx="32" cy="34" r="3" />
              <circle cx="40" cy="34" r="3" />
              <circle cx="24" cy="42" r="3" />
              <circle cx="32" cy="42" r="3" />
              <circle cx="40" cy="42" r="3" />
              <rect x="22" y="48" width="20" height="4" rx="2" />
            </g>
            <path d="M48 22c2.5 1.5 4 4.3 4 7.5 0 4.6-3.1 8.5-7.4 9.6" fill="none" stroke="url(#amber)" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        );
      case "beer":
        return (
          <svg viewBox="0 0 64 64" className="how-media__icon" aria-hidden="true">
            <defs>
              <linearGradient id="amber2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#f59e0b" />
                <stop offset="1" stopColor="#f97316" />
              </linearGradient>
            </defs>
            <path d="M18 18h26v30a8 8 0 0 1-8 8H26a8 8 0 0 1-8-8V18z" fill="rgba(255,255,255,0.06)" stroke="rgba(245,158,11,0.35)" />
            <path d="M22 28h18v18a4 4 0 0 1-4 4H26a4 4 0 0 1-4-4V28z" fill="url(#amber2)" opacity="0.65"/>
            <path d="M44 24h6a6 6 0 0 1 0 12h-6" fill="none" stroke="rgba(245,158,11,0.55)" strokeWidth="3" strokeLinecap="round"/>
            <path d="M20 18c2-6 8-10 14-10s12 4 14 10" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="3" strokeLinecap="round"/>
            <path d="M24 16c1-4 4-6 8-6s7 2 8 6" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        );
      case "tap":
        return (
          <svg viewBox="0 0 64 64" className="how-media__icon" aria-hidden="true">
            <defs>
              <linearGradient id="amber3" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#f59e0b" />
                <stop offset="1" stopColor="#f97316" />
              </linearGradient>
            </defs>
            <path d="M30 10h12v10h-6v6h8a8 8 0 0 1 8 8v2h-8v-2a2 2 0 0 0-2-2h-14v-8h4v-4z" fill="rgba(255,255,255,0.06)" stroke="rgba(245,158,11,0.35)" />
            <path d="M20 26h18v8H20z" fill="rgba(255,255,255,0.06)" stroke="rgba(245,158,11,0.35)" />
            <path d="M20 34h10v14a6 6 0 0 1-6 6h-4V34z" fill="rgba(255,255,255,0.06)" stroke="rgba(245,158,11,0.35)" />
            <path d="M30 38c6 2 10 6 12 12" fill="none" stroke="url(#amber3)" strokeWidth="3" strokeLinecap="round"/>
            <path d="M42 50c0 3-2.2 6-5.5 6" fill="none" stroke="url(#amber3)" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        );
      case "truck":
        return (
          <svg viewBox="0 0 64 64" className="how-media__icon" aria-hidden="true">
            <defs>
              <linearGradient id="amber4" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#f59e0b" />
                <stop offset="1" stopColor="#f97316" />
              </linearGradient>
            </defs>
            <path d="M10 22h28v22H10z" fill="rgba(255,255,255,0.06)" stroke="rgba(245,158,11,0.35)" />
            <path d="M38 28h10l6 8v8H38V28z" fill="rgba(255,255,255,0.06)" stroke="rgba(245,158,11,0.35)" />
            <circle cx="20" cy="46" r="4" fill="url(#amber4)" />
            <circle cx="46" cy="46" r="4" fill="url(#amber4)" />
            <path d="M18 18h12" stroke="rgba(255,255,255,0.35)" strokeWidth="3" strokeLinecap="round"/>
            <path d="M16 14h18" stroke="rgba(255,255,255,0.25)" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const handleCardClick = (id) => {
    // Mobile: toque alterna o flip
    setActive((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="how-it-works"
      className="pt-36 pb-10 bg-black relative overflow-visible how-hero"
    >
      <span className="sr-only">BIERZ_FRONT_VERSION_V7</span>
      <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.25)_0%,rgba(0,0,0,0)_55%)]" />
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Distribuidora{" "}
            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
              BIERZ
            </span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            <span className="text-white font-semibold">Como funciona</span>{" "}
            <span className="text-gray-400">—</span>{" "}
            Em 4 passos você finaliza seu pedido e garante seu evento.
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          onMouseLeave={() => setActive(null)}
        >
          {steps.map((s) => {
            const flipped = active === s.id;

            return (
              <div
                key={s.id}
                className={"how-card " + (flipped ? "is-flipped" : "")}
                onMouseEnter={() => setActive(s.id)}
                onClick={() => handleCardClick(s.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleCardClick(s.id);
                }}
                aria-label={`Como funciona - ${s.kicker}`}
              >
                <div className="how-card__inner">
                  {/* FRONT */}
                  <div className="how-card__face how-card__front">
                    <div className="how-card__top">
                      <div className="how-card__kicker">{s.kicker}</div>
                      <div className="how-card__badge">{s.id}</div>
                    </div>

                    {/* Espaço reservado para imagem/arte (PNG sem fundo) */}
                    <div className="how-card__frontBody">
                      <div className={`how-card__mediaSlot how-media how-media--${s.media}`} data-step={s.id} aria-hidden="true">
                        <MediaIcon name={s.media} />
                        <span className="how-media__glow" />
                      </div>
                    </div>
                  </div>

                  {/* BACK */}
                  <div className="how-card__face how-card__back">
                    <div className="how-card__top">
                      <div className="how-card__kicker">{s.kicker}</div>
                      <div className="how-card__badge">{s.id}</div>
                    </div>

                    <div className="how-card__backBody">
                      <div className="how-card__title">{s.title}</div>
                      <p className="how-card__desc">{s.desc}</p>

                      <button
                        className="how-card__cta"
                        onClick={(e) => {
                          e.stopPropagation();
                          s.action();
                          setActive(null);
                        }}
                      >
                        {s.cta} <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
