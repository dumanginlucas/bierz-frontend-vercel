import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Identification from './Identification';
import './HeroCarousel.css';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const totalSlides = 2;

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const cards = [
    {
      id: 1,
      title: 'Chopp para Eventos',
      text: 'Ideal para churrascos, aniversários e encontros com chope gelado.',
      theme: 'hero-card-theme-gold',
      accent: 'hero-card-accent-gold',
      art: 'hero-card-art-events'
    },
    {
      id: 2,
      title: 'Home Bar',
      text: 'Uma solução premium para servir em casa com presença e praticidade.',
      theme: 'hero-card-theme-sand',
      accent: 'hero-card-accent-brown',
      art: 'hero-card-art-homebar'
    },
    {
      id: 3,
      title: 'Barril de Chopp',
      text: 'Escolha o tamanho ideal e receba o barril certo para o seu evento.',
      theme: 'hero-card-theme-orange',
      accent: 'hero-card-accent-orange',
      art: 'hero-card-art-keg'
    },
    {
      id: 4,
      title: 'Tipos de Evento',
      text: 'Opções pensadas para eventos sociais, corporativos e comemorações.',
      theme: 'hero-card-theme-night',
      accent: 'hero-card-accent-bronze',
      art: 'hero-card-art-types'
    }
  ];

  return (
    <section className="hero-carousel-v8 relative w-full overflow-hidden bg-black">
      <div
        className="hero-slides-wrapper flex h-full transition-transform duration-1000 cubic-bezier(0.65, 0, 0.35, 1)"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        <div className="hero-slide w-full h-full flex-shrink-0">
          <Identification />
        </div>

        <div className="hero-slide w-full h-full flex-shrink-0 relative flex flex-col items-center">
          <div className="hero-banner-v8-container relative w-full h-full overflow-hidden">
            <div className="hero-banner-v8-inner relative w-full h-full overflow-hidden">
              <img
                src="/Bierzbannerhomebarchurrasco.png"
                alt="Bierz Experience"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-transparent pointer-events-none h-48" />
            </div>
          </div>

          <div className="hero-cards-v8-wrapper">
            <div className="hero-cards-v8-grid">
              {cards.map((card) => (
                <div key={card.id} className="hero-card-v8">
                  <div className={`hero-card-v8-inner ${card.theme}`}>
                    <div className={`hero-card-v8-art ${card.art}`} aria-hidden="true" />

                    <div className="hero-card-v8-content">
                      <span className={`hero-card-v8-pill ${card.accent}`}>{card.title}</span>
                      <p className="hero-card-v8-text">{card.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button onClick={prevSlide} className="nav-arrow left" aria-label="Previous slide">
        <ChevronLeft size={48} strokeWidth={1} />
      </button>
      <button onClick={nextSlide} className="nav-arrow right" aria-label="Next slide">
        <ChevronRight size={48} strokeWidth={1} />
      </button>

      <div className="indicators-container">
        {[...Array(totalSlides)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`indicator-dot ${currentSlide === i ? 'active' : ''}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
