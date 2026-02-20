
import React, { useEffect, useMemo, useRef, useState } from "react";
import "./AboutPinnedScroll.css";

/**
 * BIERZ_ABOUT_PINNED_V14
 * Pinned section that DOES NOT lock page scroll.
 * Uses extra section height to "consume" scroll while content is fixed.
 */
export default function AboutPinnedScroll() {
  const rootRef = useRef(null);

  const screens = useMemo(
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

  const PIN_SCROLL = 1200; // px of scroll reserved for animation
  const [isPinned, setIsPinned] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const update = () => {
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight || 0;

      // We pin when section top reaches 20% from the top.
      const startLine = vh * 0.2;

      const entered = rect.top <= startLine;
      const finished = rect.bottom <= startLine;

      const pinActive = entered && !finished;

      // How far we've "scrolled" within the pin range.
      const raw = (startLine - rect.top) / PIN_SCROLL;
      const clamped = Math.max(0, Math.min(1, raw));

      setIsPinned(pinActive);
      setProgress(pinActive ? clamped : rect.top > startLine ? 0 : 1);

      // expose as CSS variable for transforms
      root.style.setProperty("--about-progress", String(pinActive ? clamped : rect.top > startLine ? 0 : 1));
      root.style.setProperty("--about-pin-scroll", `${PIN_SCROLL}px`);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const stage = Math.round(progress * (screens.length - 1));
  const active = screens[stage] || screens[0];

  return (
    <section
      ref={rootRef}
      className={`aboutPinnedRoot ${isPinned ? "isPinned" : ""}`}
      aria-label="Sobre a Bierz"
    >
      {/* spacer height is handled by CSS using --about-pin-scroll */}
      <div className="aboutPinnedPin">
        <div className="aboutPinnedInner">
          <header className="aboutPinnedHeader">
            <h2 className="aboutPinnedTitle">
              Sobre a <span className="brandGrad">BIERZ</span>
            </h2>
            <p className="aboutPinnedSub">
              Distribuidora de Chopp, Cervejas e Conveniência em Sorocaba — entrega rápida, atendimento ágil e experiência premium.
            </p>
            <span className="srOnly">BIERZ_ABOUT_PINNED_V14</span>
          </header>

          <div className="aboutPinnedGrid">
            <div className="aboutPinnedLeft">
              <h3 className="aboutPinnedLeftTitle">{active.leftTitle}</h3>
              <ul className="aboutPinnedList">
                {active.bullets.map((b) => (
                  <li key={b} className="aboutPinnedBullet">
                    <span className="dot" aria-hidden="true" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="aboutPinnedRight">
              {/* "screens" stack - you can later replace the empty art slot with PNGs */}
              <div className="aboutPinnedStack" aria-hidden="true">
                {screens.map((s, idx) => {
                  const d = idx - stage; // 0 active, positive behind
                  return (
                    <div
                      key={s.k}
                      className="aboutPinnedCard"
                      style={{
                        transform: `translateY(${d * 22}px) scale(${1 - Math.abs(d) * 0.04})`,
                        opacity: d === 0 ? 1 : 0.35,
                        filter: d === 0 ? "blur(0px)" : "blur(1.5px)",
                      }}
                    >
                      <div className="aboutPinnedCardTop">
                        <div className="aboutPinnedTag">{s.tag}</div>
                      </div>
                      <div className="aboutPinnedCardBody">
                        <h4>{s.cardTitle}</h4>
                        <p>{s.cardSubtitle}</p>
                        <div className="aboutPinnedArtSlot" />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="aboutPinnedHint">
                Role para ver as telas mudando.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
