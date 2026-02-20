import React, { useMemo, useState } from "react";
import { Beer, Zap, Refrigerator, ArrowRight, GitCompare } from "lucide-react";

const Services = () => {
  const [active, setActive] = useState(null);

  const cards = useMemo(
    () => [
      {
        id: "electric",
        kicker: "Chopeira elétrica",
        title: "Praticidade e alto fluxo",
        image:
          "https://customer-assets.emergentagent.com/job_full-stack-deploy-38/artifacts/ox30kitc_imagem_2026-02-17_202943222.png",
        desc:
          "Sistema elétrico tradicional. Ideal quando você quer praticidade e atendimento rápido no bar.",
        points: [
          "Setup rápido",
          "Boa para eventos com alta rotatividade",
          "Operação simples",
          "Ótimo custo-benefício",
        ],
        cta: "Ver chopps",
        action: () => {
          const el = document.getElementById("products");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        },
        icon: Zap,
      },
      {
        id: "homebar",
        kicker: "HomeBar",
        title: "Experiência premium",
        image:
          "https://customer-assets.emergentagent.com/job_full-stack-deploy-38/artifacts/wlovzyvh_SaveClip.App_588356761_18015442988800944_3145914457951544553_n.png",
        desc:
          "Sistema premium com barril refrigerado. Mantém o chopp na temperatura ideal do início ao fim.",
        points: [
          "Barril gelado (0° a 3°C)",
          "Temperatura estável",
          "Visual premium",
          "Qualidade do primeiro ao último copo",
        ],
        cta: "Ver chopps",
        action: () => {
          const el = document.getElementById("products");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        },
        icon: Refrigerator,
      },
      {
        id: "compare",
        kicker: "Comparativo",
        title: "Escolha o ideal",
        image: null,
        desc:
          "Principais diferenças para você escolher com segurança (foco no que mais muda a experiência).",
        pointsFront: [
          ["Temperatura", "HomeBar (barril gelado)"],
          ["Fluxo", "Elétrica (alto consumo)"],
          ["Visual", "HomeBar (premium)"],
          ["Custo", "Elétrica (mais econômica)"],
        ],
        pointsBack: [
          ["Setup", "Elétrica (simples)"],
          ["Experiência", "HomeBar (mais constante)"],
          ["Ambiente", "Elétrica (outdoor ok)"],
          ["Evento", "Depende do estilo"],
        ],
        cta: "Calcular litros",
        action: () => {
          const el = document.getElementById("calculator");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        },
        icon: GitCompare,
      },
    ],
    []
  );

  const handleClick = (id) => setActive((prev) => (prev === id ? null : id));

  return (
    <section id="services" className="py-16 bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.22)_0%,rgba(0,0,0,0)_60%)]" />
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Nossos{" "}
            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
              Equipamentos
            </span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            Chopeira elétrica, HomeBar e um comparativo rápido para você decidir.
          </p>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          onMouseLeave={() => setActive(null)}
        >
          {cards.map((c) => {
            const Icon = c.icon;
            const flipped = active === c.id;

            return (
              <div
                key={c.id}
                className={"equip-card " + (flipped ? "is-flipped" : "")}
                onMouseEnter={() => setActive(c.id)}
                onClick={() => handleClick(c.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleClick(c.id);
                }}
              >
                <div className="equip-card__inner">
                  {/* FRONT */}
                  <div className="equip-card__face equip-card__front">
                    <div className="equip-card__top">
                      <div className="equip-card__kicker">{c.kicker}</div>
                      <div className="equip-card__icon">
                        <Icon size={22} />
                      </div>
                    </div>

                    {c.image ? (
                      <div className="equip-card__imgWrap">
                        <img className="equip-card__img" src={c.image} alt={c.kicker} />
                      </div>
                    ) : (
                      <div className="equip-card__comparePreview">
                        <div className="equip-card__compareGrid">
                          {(c.pointsFront || []).map(([k, v]) => (
                            <div key={k} className="equip-card__row">
                              <span className="equip-card__k">{k}</span>
                              <span className="equip-card__v">{v}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="equip-card__title">{c.title}</div>
                  </div>

                  {/* BACK */}
                  <div className="equip-card__face equip-card__back">
                    <div className="equip-card__top">
                      <div className="equip-card__kicker">{c.kicker}</div>
                      <div className="equip-card__icon">
                        <Icon size={22} />
                      </div>
                    </div>

                    <div className="equip-card__body">
                      <p className="equip-card__desc">{c.desc}</p>

                      {c.points ? (
                        <ul className="equip-card__list">
                          {c.points.map((p) => (
                            <li key={p}>{p}</li>
                          ))}
                        </ul>
                      ) : (
                        <div className="equip-card__compareGrid">
                          {(c.pointsBack || []).map(([k, v]) => (
                            <div key={k} className="equip-card__row">
                              <span className="equip-card__k">{k}</span>
                              <span className="equip-card__v">{v}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <button
                        className="equip-card__cta"
                        onClick={(e) => {
                          e.stopPropagation();
                          c.action?.();
                          setActive(null);
                        }}
                      >
                        {c.cta} <ArrowRight size={16} />
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

export default Services;
