import React, { useMemo, useState } from "react";
import { Zap, Refrigerator, GitCompare, Thermometer, Snowflake, CheckCircle2 } from "lucide-react";
import { useCart } from "../contexts/CartContext";

const Services = () => {
  const [active, setActive] = useState(null);
  const { chooseEquipment } = useCart();

  // Debug visual version marker (helps confirm deploy is serving latest bundle)
  // eslint-disable-next-line no-console
  console.log("BIERZ FRONT v7 - Equipamentos/Comparativo");

  const cards = useMemo(
    () => [
      {
        id: "electric",
        kicker: "Chopeira elétrica",
        title: "Praticidade e alto fluxo",
        image:
          "https://customer-assets.emergentagent.com/job_full-stack-deploy-38/artifacts/ox30kitc_imagem_2026-02-17_202943222.png",
        desc:
          "Ideal para eventos com consumo rápido. Setup simples e operação direta.",
        points: [
          "Barril em temperatura ambiente",
          "1 a 2 dias após aberto",
          "Pode ficar mais espumosa no início",
          "Pode perder gás mais rapidamente",
        ],
        equipment: { id: "electric", name: "Chopeira Elétrica" },
        icon: Zap,
      },
      {
        id: "homebar",
        kicker: "HomeBar",
        title: "Experiência premium",
        image:
          "https://customer-assets.emergentagent.com/job_full-stack-deploy-38/artifacts/wlovzyvh_SaveClip.App_588356761_18015442988800944_3145914457951544553_n.png",
        desc:
          "Barril refrigerado com temperatura estável. Qualidade do primeiro ao último copo.",
        points: [
          "Barril mantido sempre refrigerado (0° a 3°C)",
          "Até 30 dias refrigerado",
          "Espuma mais cremosa e consistente do início ao fim",
          "Mantém sabor original e gás preservado",
        ],
        equipment: { id: "homebar", name: "HomeBar" },
        icon: Refrigerator,
      },
      {
        id: "compare",
        kicker: "Comparativo",
        title: "",
        desc: "",
        compareFront: {
          electric: [
            "Barril em temperatura ambiente",
            "1 a 2 dias após aberto",
            "Pode ficar mais espumosa no início",
            "Pode perder gás mais rapidamente",
          ],
          homebar: [
            "Barril mantido sempre refrigerado (0° a 3°C)",
            "Até 30 dias refrigerado",
            "Espuma mais cremosa e consistente do início ao fim",
            "Mantém sabor original e gás preservado",
          ],
        },
        compareBack: {
          electric: [
            "Depende do ambiente",
            "Industrial / Eventos simples",
            "Ideal para consumo rápido",
            "Eventos outdoor",
          ],
          homebar: [
            "Temperatura estável e controlada",
            "Premium, elegante e moderno",
            "Ideal para consumo gradual com máxima qualidade",
            "Festas, áreas gourmet, residências, eventos indoor e outdoor",
          ],
        },
        icon: GitCompare,
      },
    ],
    []
  );

  const handleToggle = (id) => setActive((prev) => (prev === id ? null : id));

  const renderCompare = (data) => (
    <div className="equip-compare2">
      <div className="equip-compare2__header">
        <div className="equip-compare2__hcol equip-compare2__hcol--electric">
          <div className="equip-compare2__hicon" aria-hidden="true"><Thermometer size={18} /></div>
          <div className="equip-compare2__htxt">
            <div className="equip-compare2__htitle">Chopeira Elétrica</div>
            <div className="equip-compare2__hsub">(Barril no Chão)</div>
          </div>
        </div>
        <div className="equip-compare2__hcol equip-compare2__hcol--homebar">
          <div className="equip-compare2__hicon" aria-hidden="true"><Snowflake size={18} /></div>
          <div className="equip-compare2__htxt">
            <div className="equip-compare2__htitle">HomeBar</div>
            <div className="equip-compare2__hsub equip-compare2__hsub--accent">(Barril Gelado)</div>
          </div>
          <div className="equip-compare2__badge">Premium</div>
        </div>
      </div>

      <div className="equip-compare2__rows">
        {data.electric.map((left, idx) => (
          <div className="equip-compare2__row" key={idx}>
            <div className="equip-compare2__cell equip-compare2__cell--left">{left}</div>
            <div className="equip-compare2__cell equip-compare2__cell--right">
              <span className="equip-compare2__ok" aria-hidden="true"><CheckCircle2 size={16} /></span>
              <span>{data.homebar[idx]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="services" className="py-16 bg-black relative overflow-visible">
      <span className="sr-only">bierz-front-v7</span>
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
            Escolha o equipamento e finalize seu pedido com tudo certo para o evento.
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
                onClick={() => handleToggle(c.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleToggle(c.id);
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

                    {c.id === "compare" ? (
                      renderCompare(c.compareFront)
                    ) : (
                      <div className="equip-card__imgWrap">
                        <img className="equip-card__img" src={c.image} alt={c.kicker} />
                      </div>
                    )}

                    {c.id !== "compare" && <div className="equip-card__title">{c.title}</div>}
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

                      {c.id === "compare" ? (
                        renderCompare(c.compareBack)
                      ) : (
                        <>
                          <ul className="equip-card__list">
                            {c.points.map((p) => (
                              <li key={p}>{p}</li>
                            ))}
                          </ul>

                          <button
                            className="equip-card__cta"
                            onClick={(e) => {
                              e.stopPropagation();
                              chooseEquipment(c.equipment);
                              setActive(null);
                            }}
                          >
                            Escolher este equipamento
                          </button>
                          <div className="equip-card__ctaNote">Verificar disponibilidade</div>
                        </>
                      )}
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
