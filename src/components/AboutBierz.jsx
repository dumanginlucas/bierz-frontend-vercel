import React from "react";
import { Link } from "react-router-dom";
import "./AboutBierz.css";
import Marquee from "./Marquee.jsx";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import {
  ProgressSlider,
  SliderContent,
  SliderWrapper,
  SliderBtnGroup,
  SliderBtn,
} from "./ui/progressive-carousel";

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
    slug: "chopp-chop-chope-como-escrever",
    title: "Chopp, chop ou chope? Qual é o jeito certo de escrever",
    excerpt: "Descubra qual é a forma mais correta de escrever e o que realmente importa na hora de pedir.",
    image: "/blog/blog2.png",
    date: "18 de março de 2026",
    readTime: "4 min",
  },
  {
    slug: "diferenca-entre-chopp-e-cerveja",
    title: "Qual a diferença entre chopp e cerveja?",
    excerpt: "Veja de forma simples a diferença entre chopp e cerveja e entenda o que é pasteurização.",
    image: "/blog/blog1.png",
    date: "18 de março de 2026",
    readTime: "5 min",
  },
  {
    slug: "guia-chopp-sorocaba",
    title: "Guia Completo de Chopp em Sorocaba",
    excerpt: "Entenda como escolher chopp em Sorocaba, calcular volume e acertar no delivery.",
    image: "/blog/blog3.jpg",
    date: "15 de março de 2026",
    readTime: "6 min",
  },
  {
    slug: "chope-para-eventos",
    title: "Chope para eventos: como servir bem em festas",
    excerpt: "Veja como acertar no chope para eventos com temperatura e estrutura ideal.",
    image: "/blog/blog4.png",
    date: "12 de março de 2026",
    readTime: "5 min",
  },
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
            <div className="ab-blog-header">
              <h4 className="ab-blog-section-title">Destaques do Blog</h4>
              <Link to="/blog" className="ab-blog-view-all">Ver todos <ArrowRight size={16} /></Link>
            </div>

            <div className="ab-blog-carousel-wrapper">
              <ProgressSlider
                activeSlider={BLOG_ARTICLES[0].slug}
                duration={5000}
                fastDuration={400}
              >
                <div className="ab-blog-carousel-main">
                  <SliderContent>
                    {BLOG_ARTICLES.map((article) => (
                      <SliderWrapper key={article.slug} value={article.slug} className="w-full">
                        <div className="ab-blog-card">
                          <div className="ab-blog-card__image-container">
                            <img src={article.image} alt={article.title} className="ab-blog-card__image" />
                          </div>
                          <div className="ab-blog-card__content">
                            <h5 className="ab-blog-card__title">{article.title}</h5>
                            <p className="ab-blog-card__excerpt">{article.excerpt}</p>
                            <div className="ab-blog-card__meta">
                              <span><CalendarDays size={14} /> {article.date}</span>
                              <span><Clock3 size={14} /> {article.readTime}</span>
                            </div>
                            <Link to={`/blog/${article.slug}`} className="ab-blog-card__link">
                              Ler artigo <ArrowRight size={16} />
                            </Link>
                          </div>
                        </div>
                      </SliderWrapper>
                    ))}
                  </SliderContent>
                </div>

                <div className="ab-blog-carousel-nav">
                  <SliderBtnGroup className="ab-blog-nav-group">
                    {BLOG_ARTICLES.map((article) => (
                      <SliderBtn
                        key={article.slug}
                        value={article.slug}
                        className="ab-blog-nav-item"
                        progressBarClass="ab-blog-nav-progress"
                      >
                        <span className="ab-blog-nav-title">{article.title}</span>
                      </SliderBtn>
                    ))}
                  </SliderBtnGroup>
                </div>
              </ProgressSlider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
