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
        kicker: "Preencha os dados e finalize",
        title: "Entregamos, instalamos e retiramos",
        desc: "Preencha os dados do evento e finalize seu pedido com data, horário e local definidos.",
        cta: "Finalizar pedido",
        action: () => navigate("/carrinho"),
      },
    ],
    [navigate]
  );

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
                data-step={s.id}
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
                      <div className="how-card__mediaSlot" aria-hidden="true">
                      {s.id === 2 && (
                        <img
                          className="how-card__obj how-card__obj--keg"
                          src="/howitworks/step2.png"
                          alt=""
                          loading="lazy"
                          decoding="async"
                        />
                      )}
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