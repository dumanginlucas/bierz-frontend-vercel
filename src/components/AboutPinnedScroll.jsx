import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronRight, MapPin } from 'lucide-react';
import './AboutPinnedScroll.css';

/**
 * Sobre a Bierz — efeito "pinned" (sticky) + telas que sobem conforme o scroll.
 * - Não trava o scroll da página (não altera overflow do body)
 */
export default function AboutPinnedScroll() {
  const sectionRef = useRef(null);
  const innerRef = useRef(null);
  const rafRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [layout, setLayout] = useState({ heightPx: 0, topPx: 86, innerHeightPx: 0 });
  const [pinState, setPinState] = useState('before');

  const screens = useMemo(
    () => [
      {
        kicker: 'Gestão',
        title: 'Experiência baseada em dados',
        subtitle:
          'Do pedido ao pós-evento: controle, histórico e recorrência — com tudo registrado.',
        theme: 'teal',
      },
      {
        kicker: 'Operação',
        title: 'Entrega, instalação e retirada',
        subtitle:
          'Equipe preparada para deixar tudo pronto — você só aproveita o evento.',
        theme: 'amber',
      },
      {
        kicker: 'Qualidade',
        title: 'Chopp gelado do início ao fim',
        subtitle:
          'Equipamentos e processo pensados para manter o padrão BIERZ em cada copo.',
        theme: 'blue',
      },
      {
        kicker: 'Atendimento',
        title: 'Suporte rápido no WhatsApp',
        subtitle:
          'Precisa ajustar algo? A gente responde rápido e resolve sem complicação.',
        theme: 'gold',
      },
    ],
    []
  );

  // altura total (em px) para o "pinned" funcionar com 1 estágio por tela.
  // Isso evita criar um espaço gigante e mantém o scroll fluido.
  const stages = screens.length;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const calcLayout = () => {
      const vh = Math.max(window.innerHeight || 0, 1);
      // altura total da seção: (stages + 1) * viewport
      // +1 dá respiro para entrar/sair sem "pulo".
      const heightPx = vh * (stages + 1);
      // tenta ler o header do site (se existir) para não colar no topo.
      const header = document.querySelector('header');
      const headerH = header ? header.getBoundingClientRect().height : 0;
      const topPx = Math.max(74, Math.min(96, Math.round(headerH + 18)));

      // altura real do conteúdo interno (para "assentar" ao final)
      const inner = innerRef.current;
      const innerHeightPx = inner ? inner.getBoundingClientRect().height : 0;

      setLayout({ heightPx, topPx, innerHeightPx });
    };

    const compute = () => {
      const vh = Math.max(window.innerHeight || 0, 1);
      const start = el.offsetTop;
      const end = start + Math.max(layout.heightPx - vh, 1);
      const y = window.scrollY;

      if (y < start) setPinState('before');
      else if (y > end) setPinState('after');
      else setPinState('pinned');

      const p = Math.min(Math.max((y - start) / Math.max(end - start, 1), 0), 1);
      setProgress(p);

      rafRef.current = requestAnimationFrame(compute);
    };

    calcLayout();
    window.addEventListener('resize', calcLayout);
    rafRef.current = requestAnimationFrame(compute);

    return () => {
      window.removeEventListener('resize', calcLayout);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [layout.heightPx, layout.topPx, stages]);

  const activeFloat = progress * (screens.length - 1);

  const scrollToStage = (idx) => {
    const el = sectionRef.current;
    if (!el) return;
    const vh = Math.max(window.innerHeight || 0, 1);
    const total = Math.max(layout.heightPx - vh, 1);
    const target =
      el.getBoundingClientRect().top +
      window.scrollY +
      (idx / (screens.length - 1)) * total;
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="aboutPinnedSection"
      style={{ height: `${layout.heightPx}px` }}
      aria-label="Sobre a Bierz"
    >
      {/* marcador de versão (para você validar no deploy) */}
      <span className="sr-only">BIERZ_ABOUT_PINNED_V13</span>

      <div
        ref={innerRef}
        className={`aboutPinnedSticky is-${pinState}`}
        style={{
          position: pinState === 'pinned' ? 'fixed' : 'absolute',
          top:
            pinState === 'pinned'
              ? `${layout.topPx}px`
              : pinState === 'before'
                ? '0px'
                : `${Math.max(layout.heightPx - layout.innerHeightPx, 0)}px`,
          left: 0,
          right: 0,
        }}
      >
        <div className="aboutPinnedHeader">
          <h2 className="aboutPinnedTitle">
            Sobre a <span className="bierzGradientText">BIERZ</span>
          </h2>
          <p className="aboutPinnedSub">
            Distribuidora de Chopp e Cervejas Especiais em Sorocaba — com entrega, instalação e retirada programada.
          </p>
        </div>

        <div className="aboutPinnedGrid">
          {/* Painel esquerdo */}
          <div className="aboutPinnedLeft">
            <div className="aboutPinnedCard">
              <h3 className="aboutPinnedCardTitle">Tecnologia e operação simples.</h3>
              <p className="aboutPinnedCardText">
                Você escolhe, a gente entrega e instala. Depois, retiramos no horário combinado.
                Tudo com padrão premium e atendimento rápido.
              </p>

              <div className="aboutPinnedBullets">
                {screens.map((s, idx) => {
                  const isActive = Math.round(activeFloat) === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      className={`aboutPinnedBullet ${isActive ? 'isActive' : ''}`}
                      onClick={() => scrollToStage(idx)}
                    >
                      <span className="aboutPinnedBulletDot" />
                      <span className="aboutPinnedBulletText">{s.title}</span>
                      <ChevronRight className="aboutPinnedBulletIcon" />
                    </button>
                  );
                })}
              </div>

              <div className="aboutPinnedLocation">
                <MapPin className="aboutPinnedLocationIcon" />
                <div>
                  <div className="aboutPinnedLocationTitle">Localização</div>
                  <div className="aboutPinnedLocationText">
                    Rua Professor Toledo, 665, Centro — Sorocaba/SP
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Painel direito (telas animadas) */}
          <div className="aboutPinnedRight" aria-hidden="false">
            <div className="aboutPinnedStage">
              {screens.map((s, idx) => {
                const dist = idx - activeFloat;
                const abs = Math.abs(dist);

                const y = dist * 90; // px
                const scale = 1 - Math.min(abs * 0.06, 0.18);
                const opacity = 1 - Math.min(abs * 0.22, 0.75);
                const blur = Math.min(abs * 1.2, 5);

                return (
                  <div
                    key={idx}
                    className={`aboutPinnedScreen theme-${s.theme}`}
                    style={{
                      transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                      opacity,
                      filter: `blur(${blur}px)`,
                      zIndex: 100 - idx,
                    }}
                  >
                    <div className="aboutPinnedScreenTop">
                      <div className="aboutPinnedScreenKicker">{s.kicker}</div>
                      <div className="aboutPinnedScreenBadge">BIERZ</div>
                    </div>

                    <div className="aboutPinnedScreenBody">
                      <div className="aboutPinnedScreenText">
                        <div className="aboutPinnedScreenTitle">{s.title}</div>
                        <div className="aboutPinnedScreenSub">{s.subtitle}</div>
                      </div>

                      {/* Slot vazio para suas imagens PNG sem fundo */}
                      <div className="aboutPinnedScreenArt" />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="aboutPinnedHint">Role para ver mais</div>
          </div>
        </div>
      </div>
    </section>
  );
}
