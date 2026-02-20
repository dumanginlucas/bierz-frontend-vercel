import React, { useEffect, useMemo, useState } from "react";
import "./AboutCarousel.css";

export default function AboutCarousel() {
  const slides = useMemo(
    () => [
      {
        k: "tech",
        leftTitle: "Tecnologia e operação simples.",
        bullets: [
          "Escolha rápida de chopp e equipamentos",
          "Entrega, instalação e retirada programada",
          "Atendimento ágil e direto",
          "Processo pensado para eventos",
        ],
        cardTitle: "Experiência baseada em dados",
        cardSubtitle: "Organização e praticidade do início ao fim.",
        tag: "BIERZ",
      },
      {
        k: "quality",
        leftTitle: "Qualidade e experiência premium.",
        bullets: [
          "Chopp sempre gelado (HomeBar)",
          "Marcas selecionadas",
          "Espuma consistente do início ao fim",
          "Equipamentos revisados e higienizados",
        ],
        cardTitle: "Qualidade garantida",
        cardSubtitle: "Produtos e equipamentos que elevam seu evento.",
        tag: "Premium",
      },
      {
        k: "service",
        leftTitle: "Entrega rápida em Sorocaba.",
        bullets: [
          "Cobertura na região",
          "Agendamento simples",
          "Instalação no local",
          "Retirada sem dor de cabeça",
        ],
        cardTitle: "Entrega e instalação",
        cardSubtitle: "Você curte a festa — a gente cuida do resto.",
        tag: "Rápido",
      },
    ],
    []
  );

  const [i, setI] = useState(0);

  const go = (next) => {
    setI((prev) => {
      const n = slides.length;
      return (prev + next + n) % n;
    });
  };

  // auto-rotate leve (pausado no hover via CSS)
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, [slides.length]);

  const s = slides[i];

  return (
    <section className="aboutCarRoot" id="about" aria-label="Sobre a Bierz">
      <div className="aboutCarInner">
        <header className="aboutCarHeader">
          <h2 className="aboutCarTitle">
            Sobre a <span className="brandGrad">BIERZ</span>
          </h2>
          <p className="aboutCarSub">
            Distribuidora de Chopp, Cervejas e Conveniência em Sorocaba — entrega rápida, atendimento ágil e experiência premium.
          </p>
        </header>

        <div className="aboutCarGrid">
          <div className="aboutCarLeft">
            <h3 className="aboutCarLeftTitle">{s.leftTitle}</h3>
            <ul className="aboutCarList">
              {s.bullets.map((b) => (
                <li key={b} className="aboutCarBullet">
                  <span className="dot" aria-hidden="true" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="aboutCarControls">
              <button className="aboutCarBtn" type="button" onClick={() => go(-1)} aria-label="Anterior">
                ‹
              </button>
              <div className="aboutCarDots" role="tablist" aria-label="Slides">
                {slides.map((x, idx) => (
                  <button
                    key={x.k}
                    type="button"
                    className={"aboutCarDot" + (idx === i ? " isActive" : "")}
                    onClick={() => setI(idx)}
                    aria-label={`Ir para slide ${idx + 1}`}
                    aria-current={idx === i ? "true" : "false"}
                  />
                ))}
              </div>
              <button className="aboutCarBtn" type="button" onClick={() => go(1)} aria-label="Próximo">
                ›
              </button>
            </div>
          </div>

          <div className="aboutCarRight" aria-live="polite">
            <div className="aboutCarCard">
              <div className="aboutCarCardTop">
                <div className="aboutCarTag">{s.tag}</div>
              </div>
              <div className="aboutCarCardBody">
                <h4>{s.cardTitle}</h4>
                <p>{s.cardSubtitle}</p>
                <div className="aboutCarArtSlot" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
