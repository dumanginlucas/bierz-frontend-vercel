import React from "react";
import "./AboutBierz.css";
import Marquee from "./Marquee.jsx";
import BlogCarousel from "./BlogCarousel.jsx";

const STATS = [
  { value: "500+", label: "Eventos realizados" },
  { value: "100%", label: "Clientes satisfeitos" },
  { value: "7", label: "Artigos postados" },
  { value: "24h", label: "Suporte ao cliente" },
];

const MARQUEE_ITEMS = [
  "Chopp Gelado", "HomeBar", "Sorocaba", "Barril Refrigerado", "Entrega Rápida",
  "Experiência Única", "Chopeira Elétrica", "Qualidade Garantida", "Chopp Gelado", "HomeBar", "Sorocaba"
];

export default function AboutBierz() {
  return (
    <section id="about" className="ab-root" aria-label="Sobre a Bierz">
      <div className="ab-bg" aria-hidden="true">
        <div className="ab-bg__orb ab-bg__orb--1" />
        <div className="ab-bg__orb ab-bg__orb--2" />
        <div className="ab-bg__orb ab-bg__orb--3" />
        <div className="ab-bg__grid" />
      </div>

      <div className="ab-container">
        <div className="ab-hero ab-hero--visible">
          <div className="ab-hero__badge"><span className="ab-hero__badge-dot" />Distribuidora em Sorocaba</div>
          <h2 className="ab-hero__title">
            <span className="ab-hero__title-line ab-hero__title-line--1">Sobre a</span>
            <span className="ab-hero__title-line ab-hero__title-line--2"><span className="ab-grad">Bierz</span></span>
          </h2>
          <p className="ab-hero__sub">Chopp e cervejas especiais para <span className="ab-typing">Sorocaba</span>!</p>
        </div>

        <div className="ab-stats ab-stats--visible">
          {STATS.map((s) => (
            <div key={s.label} className="ab-stat">
              <div className="ab-stat__value">{s.value}</div>
              <div className="ab-stat__label">{s.label}</div>
            </div>
          ))}
        </div>

        <Marquee speed={28}>
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={i} className="ab-marquee__item">{item} <span className="ab-marquee__sep">·</span></span>
          ))}
        </Marquee>

        <div className="ab-story ab-story--stacked ab-story--visible">
          <div className="ab-story__top ab-story__top--wide">
            <div className="ab-story__tag">Nossa história</div>
            <h3 className="ab-story__title">Nascemos para elevar a experiência do chopp em Sorocaba.</h3>
            <div className="ab-story__copy-grid">
              <p className="ab-story__text">A Bierz surgiu da vontade de transformar eventos comuns em momentos memoráveis. Combinamos tecnologia, qualidade e agilidade para entregar o melhor chopp gelado da região — do barril ao seu copo.</p>
              <p className="ab-story__text">Com a <strong>HomeBar</strong>, mantemos o barril sempre refrigerado e preservado, garantindo espuma cremosa e sabor original do primeiro ao último copo. Simples assim.</p>
            </div>
            <div className="ab-story__cta-row">
              <a href="#services" className="ab-story__cta ab-story__cta--primary">Ver equipamentos</a>
              <a href="#products" className="ab-story__cta ab-story__cta--ghost">Ver produtos</a>
            </div>
          </div>

          <div className="ab-blog-section">
            <BlogCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
