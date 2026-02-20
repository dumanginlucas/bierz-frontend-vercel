import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calculator, Beer, Zap, MapPin, ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const [active, setActive] = useState(null);
  const navigate = useNavigate();

  const steps = useMemo(
    () => [
      {
        id: 1,
        kicker: "Comece aqui",
        title: "Calcule quantos litros você precisa",
        desc: "Use a calculadora e descubra a quantidade ideal para o seu evento.",
        cta: "Calcular agora",
        icon: Calculator,
        action: () => {
          const el = document.getElementById("calculator");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        },
      },
      {
        id: 2,
        kicker: "Escolha seu chopp",
        title: "Escolha o chopp da vez",
        desc: "Selecione seus estilos preferidos e adicione ao carrinho em poucos cliques.",
        cta: "Escolher chopp",
        icon: Beer,
        action: () => {
          const el = document.getElementById("products");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        },
      },
      {
        id: 3,
        kicker: "Defina o equipamento",
        title: "Chopeira elétrica ou HomeBar?",
        desc: "Compare as opções e escolha o equipamento ideal para o seu evento.",
        cta: "Ver equipamentos",
        icon: Zap,
        action: () => {
          const el = document.getElementById("services");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        },
      },
      {
        id: 4,
        kicker: "Local do evento",
        title: "Entregamos, instalamos e retiramos",
        desc: "Finalize o pedido e combinamos data, horário e endereço pelo carrinho ou WhatsApp.",
        cta: "Finalizar pedido",
        icon: MapPin,
        action: () => navigate("/cart"),
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
      className="pt-28 pb-10 bg-black relative overflow-hidden"
    >
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
            const Icon = s.icon;
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

                    <div className="how-card__frontBody">
                      <div className="how-card__iconWrap" aria-hidden="true">
                        <Icon size={28} />
                      </div>
                      <div className="how-card__title">{s.title}</div>
                    </div>

                    <div className="how-card__hint"> </div>
                  </div>

                  {/* BACK */}
                  <div className="how-card__face how-card__back">
                    <div className="how-card__top">
                      <div className="how-card__kicker">{s.kicker}</div>
                      <div className="how-card__badge">{s.id}</div>
                    </div>

                    <div className="how-card__backBody">
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
