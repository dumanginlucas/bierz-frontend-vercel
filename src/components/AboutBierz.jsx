import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import "./AboutBierz.css";
import Marquee from "./Marquee.jsx";
import { blogPosts } from "../data/blogPosts";

const STATS = [
  { value: 500, suffix: "+", label: "Eventos realizados" },
  { value: 100, suffix: "%", label: "Clientes satisfeitos" },
  { value: 7, suffix: "", label: "Artigos postados" },
  { value: 24, suffix: "h", label: "Suporte ao cliente" },
];

const MARQUEE_ITEMS = [
  "Chopp Gelado", "HomeBar", "Sorocaba", "Eventos Premium",
  "Barril Refrigerado", "Entrega Rápida", "Experiência Única",
  "Chopeira Elétrica", "Qualidade Garantida", "Chopp Gelado",
] ;

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useCounter(target, active, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    let frame;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * target));
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);
  return count;
}

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

export default function AboutBierz() {
  const sectionRef = useMouseFollow();
  const [heroRef, heroVisible] = useReveal(0.05);
  const [statsRef, statsVisible] = useReveal(0.2);
  const [storyRef, storyVisible] = useReveal(0.15);
  const posts = blogPosts.slice(0, 5);
  const [activeIndex, setActiveIndex] = useState(0);
  const activePost = posts[activeIndex] || posts[0];

  useEffect(() => {
    if (posts.length <= 1) return undefined;
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % posts.length);
    }, 6500);
    return () => window.clearInterval(interval);
  }, [posts.length]);

  const typingWords = ["Sorocaba", "seu evento", "sua festa", "sua área gourmet"];
  const typedText = useTyping(typingWords, 75, 2200);

  return (
    <section id="about" className="ab-root" ref={sectionRef} aria-label="Sobre a Bierz">
      <div className="ab-bg" aria-hidden="true">
        <div className="ab-bg__orb ab-bg__orb--1" />
        <div className="ab-bg__orb ab-bg__orb--2" />
        <div className="ab-bg__orb ab-bg__orb--3" />
        <div className="ab-bg__grid" />
        <div className="ab-bg__mouse-glow" />
      </div>

      <div className="ab-container">
        <div ref={heroRef} className={`ab-hero ${heroVisible ? "ab-hero--visible" : ""}`}>
          <div className="ab-hero__badge">
            <span className="ab-hero__badge-dot" />
            Distribuidora em Sorocaba
          </div>

          <h2 className="ab-hero__title">
            <span className="ab-hero__title-line ab-hero__title-line--1">Sobre a</span>
            <span className="ab-hero__title-line ab-hero__title-line--2">
              <span className="ab-grad">Bierz</span>
            </span>
          </h2>

          <p className="ab-hero__sub">
            Chopp e cervejas especiais para <span className="ab-typing">{typedText}</span>!
          </p>
        </div>

        <div ref={statsRef} className={`ab-stats ${statsVisible ? "ab-stats--visible" : ""}`}>
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} active={statsVisible} />
          ))}
        </div>

        <Marquee speed={28}>
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={i} className="ab-marquee__item">
              {item} <span className="ab-marquee__sep">·</span>
            </span>
          ))}
        </Marquee>

        <div ref={storyRef} className={`ab-story ${storyVisible ? "ab-story--visible" : ""}`}>
          <div className="ab-story__left">
            <div className="ab-story__tag">Nossa história</div>
            <h3 className="ab-story__title">Nascemos para elevar a experiência do chopp em Sorocaba.</h3>
            <p className="ab-story__text">
              A Bierz surgiu da vontade de transformar eventos comuns em momentos memoráveis. Combinamos tecnologia, qualidade e agilidade para entregar o melhor chopp gelado da região — do barril ao seu copo.
            </p>
            <p className="ab-story__text">
              Com a <strong>HomeBar</strong>, mantemos o barril sempre refrigerado e preservado, garantindo espuma cremosa e sabor original do primeiro ao último copo. Simples assim.
            </p>
            <div className="ab-story__cta-row">
              <a href="#services" className="ab-story__cta ab-story__cta--primary">Ver equipamentos</a>
              <a href="#products" className="ab-story__cta ab-story__cta--ghost">Ver produtos</a>
            </div>
          </div>

          <div className="ab-story__right">
            <div className="ab-carousel">
              <div className="ab-carousel__hero-wrap">
                <Link to={`/blog/${activePost.slug}`} className="ab-carousel__hero">
                  <div className="ab-carousel__media">
                    <img src={activePost.image} alt={activePost.title} className="ab-carousel__image" />
                  </div>

                  <div className="ab-carousel__panel">
                    <span className="ab-carousel__badge">Destaque do blog</span>
                    <h3 className="ab-carousel__title">{activePost.title}</h3>
                    <p className="ab-carousel__excerpt">{activePost.excerpt}</p>

                    <div className="ab-carousel__meta">
                      <span><Calendar size={14} /> {activePost.date}</span>
                      <span><Clock size={14} /> {activePost.readTime}</span>
                    </div>

                    <span className="ab-carousel__button">
                      Ler artigo <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              </div>

              <div className="ab-carousel__thumbs" role="tablist" aria-label="Artigos do blog em destaque">
                {posts.map((post, index) => (
                  <button
                    key={post.slug}
                    type="button"
                    role="tab"
                    aria-selected={index === activeIndex}
                    className={`ab-carousel__thumb ${index === activeIndex ? "is-active" : ""}`}
                    onClick={() => setActiveIndex(index)}
                  >
                    <span className="ab-carousel__thumb-title">{post.title}</span>
                    <span className="ab-carousel__thumb-text">{post.excerpt}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
