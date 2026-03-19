import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./AboutBierz.css";
import Marquee from "./Marquee.jsx";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";

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

const BLOG_ARTICLES = [
  {
    slug: "/blog/chopp-chop-chope-como-escrever",
    title: "Chopp, chop ou chope? Qual é o jeito certo de escrever",
    excerpt: "Descubra qual é a forma mais correta de escrever, por que chope e chop também aparecem no dia a dia e o que realmente importa na hora de pedir.",
    image: "/blog/blog2.png",
    date: "18 de março de 2026",
    readTime: "4 min de leitura",
  },
  {
    slug: "/blog/diferenca-entre-chopp-e-cerveja",
    title: "Qual a diferença entre chopp e cerveja?",
    excerpt: "Veja de forma simples a diferença entre chopp e cerveja, entenda o que é pasteurização e por que o chopp costuma ser tão valorizado em eventos e churrascos.",
    image: "/blog/blog1.png",
    date: "18 de março de 2026",
    readTime: "5 min de leitura",
  },
  {
    slug: "/blog/guia-chopp-sorocaba",
    title: "Guia Completo de Chopp em Sorocaba: como pedir certo para seu evento",
    excerpt: "Entenda como escolher chopp em Sorocaba, calcular volume, definir estilos e acertar no delivery para churrascos, aniversários e eventos corporativos.",
    image: "/blog/blog3.jpg",
    date: "15 de março de 2026",
    readTime: "6 min de leitura",
  },
  {
    slug: "/blog/chope-para-eventos",
    title: "Chope para eventos: como servir bem em festas, aniversários e confraternizações",
    excerpt: "Veja como acertar no chope para eventos com temperatura, tipo do copo e estrutura ideal para receber seus convidados.",
    image: "/blog/blog4.png",
    date: "12 de março de 2026",
    readTime: "5 min de leitura",
  },
  {
    slug: "/blog/disk-chopp-sorocaba",
    title: "Disk chopp Sorocaba: como funciona a entrega rápida para sua casa ou evento",
    excerpt: "Entenda como funciona o disk chopp em Sorocaba, prazos de entrega, montagem da chopeira e o que observar antes de pedir.",
    image: "/blog/blog5.png",
    date: "10 de março de 2026",
    readTime: "5 min de leitura",
  },
  {
    slug: "/blog/tipos-de-chopp",
    title: "Tipos de chopp: pilsen, IPA, weiss e stout — qual combina melhor com seu evento?",
    excerpt: "Conheça os principais estilos de chopp e descubra qual combina melhor com o tipo de comida que você pretende servir no seu evento.",
    image: "/blog/blog6.png",
    date: "08 de março de 2026",
    readTime: "5 min de leitura",
  },
  {
    slug: "/blog/equipamentos-chopp",
    title: "Equipamentos para servir chopp: o que realmente faz diferença no resultado final",
    excerpt: "Veja quais equipamentos importam para servir um chopp de qualidade: chopeira elétrica, cilindros de CO2 e limpeza da linha.",
    image: "/blog/blog7.jpg",
    date: "05 de março de 2026",
    readTime: "4 min de leitura",
  },
];

export default function AboutBierz() {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const railRef = useRef(null);
  const featured = BLOG_ARTICLES[featuredIndex];

  useEffect(() => {
    const node = railRef.current;
    if (!node) return;
    const cards = Array.from(node.querySelectorAll('[data-article-index]'));
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const idx = Number(visible.target.getAttribute('data-article-index'));
          if (!Number.isNaN(idx)) setFeaturedIndex(idx);
        }
      },
      { root: node, threshold: 0.65 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

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

          <div className="ab-blog-showcase">
            <div className="ab-blog-featured">
              <div className="ab-blog-featured__media">
                <img src={featured.image} alt={featured.title} className="ab-blog-featured__image" />
              </div>
              <div className="ab-blog-featured__content">
                <div className="ab-blog-featured__badge">Destaque do blog</div>
                <h4 className="ab-blog-featured__title">{featured.title}</h4>
                <p className="ab-blog-featured__excerpt">{featured.excerpt}</p>
                <div className="ab-blog-featured__meta">
                  <span><CalendarDays size={15} /> {featured.date}</span>
                  <span><Clock3 size={15} /> {featured.readTime}</span>
                </div>
                <Link to={featured.slug} className="ab-blog-featured__cta">Ler artigo <ArrowRight size={16} /></Link>
              </div>
            </div>

            <div className="ab-blog-rail" ref={railRef}>
              {BLOG_ARTICLES.map((article, index) => (
                <Link
                  key={article.slug}
                  to={article.slug}
                  className={`ab-blog-mini ${featuredIndex === index ? 'is-active' : ''}`}
                  data-article-index={index}
                >
                  <div className="ab-blog-mini__thumb-wrap">
                    <img src={article.image} alt={article.title} className="ab-blog-mini__thumb" />
                  </div>
                  <div className="ab-blog-mini__body">
                    <h5 className="ab-blog-mini__title">{article.title}</h5>
                    <p className="ab-blog-mini__excerpt">{article.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
