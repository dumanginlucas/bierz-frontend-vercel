import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "./AboutBierz.css";
import Marquee from "./Marquee.jsx";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { blogPosts } from "../data/blogPosts";
import {
  ProgressSlider,
  SliderContent,
  SliderWrapper,
  SliderBtnGroup,
  SliderBtn,
} from "./ui/progressive-carousel";

/* ─────────────────────────────────────────────
   Dados da seção
───────────────────────────────────────────── */
const STATS = [
  { value: 500, suffix: "+", label: "Eventos realizados" },
  { value: 100, suffix: "%", label: "Clientes satisfeitos" },
  { value: 7, suffix: "", label: "Artigos postados" },
  { value: 24, suffix: "h", label: "Suporte ao cliente" },
];

const PILLARS = [
  {
    icon: "🍺",
    title: "Chopp sempre gelado",
    text: "Com a HomeBar, o barril é mantido entre 0° e 3°C do primeiro ao último copo.",
    color: "amber",
  },
  {
    icon: "⚡",
    title: "Entrega rápida",
    text: "Cobrimos Sorocaba e região com agendamento simples e instalação no local.",
    color: "blue",
  },
  {
    icon: "✨",
    title: "Experiência premium",
    text: "Equipamentos revisados, higienizados e marcas selecionadas para seu evento.",
    color: "gold",
  },
  {
    icon: "🎯",
    title: "Processo simples",
    text: "Escolha, agende, receba. A gente cuida de tudo — você só curte a festa.",
    color: "green",
  },
];

const MARQUEE_ITEMS = [
  "Chopp Gelado", "HomeBar", "Sorocaba", "Eventos Premium",
  "Cerveja Artesanal", "Barril Refrigerado", "Entrega Rápida",
  "Experiência Única", "Chopeira Elétrica", "Qualidade Garantida",
];

/* ─────────────────────────────────────────────
   Hook: Intersection Observer (Scroll Reveal)
───────────────────────────────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─────────────────────────────────────────────
   Hook: Counter animado
───────────────────────────────────────────── */
function useCounter(target, active, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
}

/* ─────────────────────────────────────────────
   Hook: Parallax via scroll
───────────────────────────────────────────── */
function useParallax(speed = 0.15) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.setProperty("--parallax-y", `${center * speed}px`);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);
  return ref;
}

/* ─────────────────────────────────────────────
   Hook: Tilt 3D
───────────────────────────────────────────── */
function useTilt(strength = 12) {
  const ref = useRef(null);
  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * strength}deg) rotateX(${-y * strength}deg) scale(1.02)`;
  }, [strength]);
  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
  }, []);
  return { ref, handleMove, handleLeave };
}

/* ─────────────────────────────────────────────
   Hook: Mouse Follow (background glow)
───────────────────────────────────────────── */
function useMouseFollow() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);
  return ref;
}

/* ─────────────────────────────────────────────
   Hook: Typing Effect
───────────────────────────────────────────── */
function useTyping(words, speed = 80, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx % words.length];
    let timeout;
    if (!deleting && charIdx <= word.length) {
      timeout = setTimeout(() => {
        setDisplay(word.slice(0, charIdx));
        setCharIdx((c) => c + 1);
        if (charIdx === word.length) {
          timeout = setTimeout(() => setDeleting(true), pause);
        }
      }, speed);
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => {
        setDisplay(word.slice(0, charIdx));
        setCharIdx((c) => c - 1);
        if (charIdx === 0) {
          setDeleting(false);
          setWordIdx((w) => (w + 1) % words.length);
        }
      }, speed / 2);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

/* ─────────────────────────────────────────────
   Sub-componente: Stat Card
───────────────────────────────────────────── */
function StatCard({ value, suffix, label, active }) {
  const count = useCounter(value, active);
  return (
    <div className="ab-stat">
      <div className="ab-stat__value">
        {count}<span className="ab-stat__suffix">{suffix}</span>
      </div>
      <div className="ab-stat__label">{label}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Sub-componente: Pillar Card (Tilt + Hover)
───────────────────────────────────────────── */
function PillarCard({ icon, title, text, color, delay }) {
  const [revRef, visible] = useReveal(0.1);
  const { ref: tiltRef, handleMove, handleLeave } = useTilt(8);

  return (
    <div
      ref={(node) => { revRef.current = node; tiltRef.current = node; }}
      className={`ab-pillar ab-pillar--${color} ${visible ? "ab-pillar--visible" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="ab-pillar__glow" aria-hidden="true" />
      <div className="ab-pillar__icon">{icon}</div>
      <h4 className="ab-pillar__title">{title}</h4>
      <p className="ab-pillar__text">{text}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Componente principal: AboutBierz
───────────────────────────────────────────── */
export default function AboutBierz() {
  const sectionRef = useMouseFollow();
  const parallaxRef = useParallax(0.12);
  const [heroRef, heroVisible] = useReveal(0.05);
  const [statsRef, statsVisible] = useReveal(0.2);
  const [storyRef, storyVisible] = useReveal(0.15);

  const typingWords = ["Sorocaba", "seu evento", "sua festa", "sua área gourmet"];
  const typedText = useTyping(typingWords, 75, 2200);
  const featuredPosts = blogPosts.slice(0, 5);

  return (
    <section
      id="about"
      className="ab-root"
      ref={sectionRef}
      aria-label="Sobre a Bierz"
    >
      {/* Animated background */}
      <div className="ab-bg" aria-hidden="true">
        <div className="ab-bg__orb ab-bg__orb--1" />
        <div className="ab-bg__orb ab-bg__orb--2" />
        <div className="ab-bg__orb ab-bg__orb--3" />
        <div className="ab-bg__grid" />
        <div className="ab-bg__mouse-glow" />
      </div>

      {/* ── HERO ── */}
      <div className="ab-container">
        <div
          ref={heroRef}
          className={`ab-hero ${heroVisible ? "ab-hero--visible" : ""}`}
        >
          <div className="ab-hero__badge">
            <span className="ab-hero__badge-dot" />
            Distribuidora em Sorocaba
          </div>

          <h2 className="ab-hero__title">
            <span className="ab-hero__title-line ab-hero__title-line--1">
              Sobre a
            </span>
            <span className="ab-hero__title-line ab-hero__title-line--2">
              <span className="ab-grad">Bierz</span>
            </span>
          </h2>

          <p className="ab-hero__sub">
            Chopp e cervejas especiais para{" "}
            <span className="ab-typing">
              {typedText}
            </span>
            !
          </p>
        </div>

        {/* ── STATS ── */}
        <div
          ref={statsRef}
          className={`ab-stats ${statsVisible ? "ab-stats--visible" : ""}`}
        >
          {STATS.map((s, i) => (
            <StatCard key={s.label} {...s} active={statsVisible} />
          ))}
        </div>

        {/* ── MARQUEE ── */}
        <Marquee speed={28}>
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={i} className="ab-marquee__item">
              {item} <span className="ab-marquee__sep">·</span>
            </span>
          ))}
        </Marquee>

        {/* ── STORY + BLOG CARD ── */}
        <div
          ref={storyRef}
          className={`ab-story ${storyVisible ? "ab-story--visible" : ""}`}
        >
          {/* Left: texto */}
          <div className="ab-story__left">
            <div className="ab-story__tag">Nossa história</div>
            <h3 className="ab-story__title">
              Nascemos para elevar a experiência do chopp em Sorocaba.
            </h3>
            <p className="ab-story__text">
              A Bierz surgiu da vontade de transformar eventos comuns em momentos
              memoráveis. Combinamos tecnologia, qualidade e agilidade para
              entregar o melhor chopp gelado da região — do barril ao seu copo.
            </p>
            <p className="ab-story__text">
              Com a <strong>HomeBar</strong>, mantemos o barril sempre refrigerado
              e preservado, garantindo espuma cremosa e sabor original do
              primeiro ao último copo. Simples assim.
            </p>
            <div className="ab-story__cta-row">
              <a href="#services" className="ab-story__cta ab-story__cta--primary">
                Ver equipamentos
              </a>
              <a href="#products" className="ab-story__cta ab-story__cta--ghost">
                Ver produtos
              </a>
            </div>
          </div>

          {/* Right: Blog do Chopp Carousel */}
          <div className="ab-story__right" ref={parallaxRef}>
            <div className="ab-blog-showcase">
              <ProgressSlider
                vertical={false}
                activeSlider={featuredPosts[0]?.slug || "post-1"}
                duration={6500}
                fastDuration={450}
              >
                <SliderContent>
                  {featuredPosts.map((post) => (
                    <SliderWrapper key={post.slug} value={post.slug} className="w-full">
                      <div className="ab-blog-showcase__frame">
                        <div className="ab-blog-showcase__media">
                          <img src={post.image} alt={post.title} className="ab-blog-showcase__image" />
                          <div className="ab-blog-showcase__overlay" />
                          <div className="ab-blog-showcase__content">
                            <span className="ab-blog-showcase__badge">Destaque do blog</span>
                            <h3 className="ab-blog-showcase__title">{post.title}</h3>
                            <p className="ab-blog-showcase__excerpt">{post.excerpt}</p>
                            <div className="ab-blog-showcase__meta">
                              <span><Calendar className="h-3.5 w-3.5" /> {post.date}</span>
                              <span><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
                            </div>
                            <Link to={`/blog/${post.slug}`} className="ab-blog-showcase__cta">
                              Ler artigo <ArrowRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </SliderWrapper>
                  ))}
                </SliderContent>

                <SliderBtnGroup className="ab-blog-showcase__tabs">
                  {featuredPosts.map((post) => (
                    <SliderBtn
                      key={post.slug}
                      value={post.slug}
                      className="ab-blog-showcase__tab"
                      progressBarClass="ab-blog-showcase__progress"
                    >
                      <h4>{post.title}</h4>
                      <p>{post.excerpt}</p>
                    </SliderBtn>
                  ))}
                </SliderBtnGroup>
              </ProgressSlider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
