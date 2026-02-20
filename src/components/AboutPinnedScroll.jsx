import React, { useEffect, useMemo, useRef, useState } from "react";
import "./AboutPinnedScroll.css";

/**
 * BIERZ_ABOUT_PINNED_V15
 * Sticky-pinned section (no fixed pin, no body lock).
 * The section is taller than the viewport; the inner content is `position: sticky`.
 * Scroll progress is computed from the section's own track (offsetHeight - viewportHeight).
 */
export default function AboutPinnedScroll() {
  const rootRef = useRef(null);
  const [progress, setProgress] = useState(0); // 0..1

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

  // Track size: ajuste do "tempo" do pinned scroll (mais curto = menos espaço depois)
  const trackVh = Math.max(1, screens.length - 1) * 65; // ex: 130vh for 3 screens

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const onScroll = () => {
      const headerEl = document.querySelector("header");
      const headerH = headerEl?.offsetHeight ?? 0;

      const rect = el.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;

      // começa quando o topo da seção encosta abaixo do header fixo
      const start = scrollY + rect.top - headerH;

      // viewport útil (sem o header)
      const viewport = window.innerHeight - headerH;

      // quanto a seção pode "rolar" enquanto o sticky segura
      const track = el.offsetHeight - viewport;

      const y = scrollY - start;
      const p = Math.max(0, Math.min(1, y / Math.max(1, track)));

      setProgress(p);
      el.style.setProperty("--about-progress", String(p));
      el.style.setProperty("--header-h", `${headerH}px`);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const maxStage = screens.length - 1;
  const stage = Math.max(0, Math.min(maxStage, Math.floor(progress * (maxStage + 0.00001))));
  const active = screens[stage] || screens[0];

  return (
    <section
      ref={rootRef}
      className="aboutPinnedRoot"
      id="about"
      aria-label="Sobre a Bierz"
      style={{ "--about-track": `${trackVh}vh` }}
    >
      <div className="aboutPinnedPin">
        <div className="aboutPinnedInner">
          <header className="aboutPinnedHeader">
            <h2 className="aboutPinnedTitle">
              Sobre a <span className="brandGrad">BIERZ</span>
            </h2>
            <p className="aboutPinnedSub">
              Distribuidora de Chopp, Cervejas e Conveniência em Sorocaba — entrega rápida, atendimento ágil e experiência premium.
            </p>
            <span className="srOnly">BIERZ_ABOUT_PINNED_V15</span>
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
              <div className="aboutPinnedHint">Role para ver as telas mudando.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
