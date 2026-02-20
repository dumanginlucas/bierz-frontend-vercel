import React, { useMemo, useState } from "react";
import { Zap, Refrigerator, GitCompare } from "lucide-react";
import { useCart } from "../contexts/CartContext";

const Services = () => {
  const [active, setActive] = useState(null);
  const { chooseEquipment } = useCart();

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
          "Pode espumar mais no início",
          "Perde gás mais rapidamente",
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
          "Barril sempre refrigerado (0° a 3°C)",
          "Até 30 dias refrigerado",
          "Espuma mais cremosa e consistente",
          "Sabor e gás preservados",
        ],
        equipment: { id: "homebar", name: "HomeBar" },
        icon: Refrigerator,
      },
      {
        id: "compare",
        kicker: "Comparativo",
        title: "Elétrica vs HomeBar",
        desc:
          "Veja os principais pontos. Passe o mouse/toque para ver mais.",
        compareFront: {
          electric: [
            "Temperatura depende do ambiente",
            "Industrial / eventos simples",
            "Ideal para consumo rápido",
            "Eventos outdoor",
          ],
          homebar: [
            "Temperatura estável e controlada",
            "Premium, elegante e moderno",
            "Consumo gradual com máxima qualidade",
            "Residências / festas / indoor",
          ],
        },
        compareBack: {
          electric: [
            "Setup simples",
            "Mais econômica",
            "Boa para alta rotatividade",
            "Operação direta",
          ],
          homebar: [
            "Experiência mais constante",
            "Qualidade do início ao fim",
            "Visual premium",
            "Chopp sempre gelado",
          ],
        },
        icon: GitCompare,
      },
    ],
    []
  );

  const handleToggle = (id) => setActive((prev) => (prev === id ? null : id));

  const renderCompare = (data) => (
    <div className="equip-compare">
      <div className="equip-compare__head">
        <div className="equip-compare__colTitle">Chopeira Elétrica</div>
        <div className="equip-compare__colTitle">HomeBar</div>
      </div>
      <div className="equip-compare__grid">
        {data.electric.map((left, idx) => (
          <React.Fragment key={idx}>
            <div className="equip-compare__cell">{left}</div>
            <div className="equip-compare__cell">{data.homebar[idx]}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  return (
    <section id="services" className="py-16 bg-black relative overflow-visible">
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
