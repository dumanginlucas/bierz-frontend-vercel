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
      label: 'CHOPP PARA EVENTOS',
      cta: 'EVENTOS',
      theme: 'hero-card-theme-gold',
      accent: 'hero-card-accent-gold'
    },
    {
      id: 2,
      label: 'HOME BAR',
      cta: 'HOME BAR',
      theme: 'hero-card-theme-sand',
      accent: 'hero-card-accent-brown'
    },
    {
      id: 3,
      label: 'BARRIL DE CHOPP',
      cta: 'BARRIS',
      theme: 'hero-card-theme-orange',
      accent: 'hero-card-accent-orange'
    },
    {
      id: 4,
      label: 'TIPOS DE EVENTO',
      cta: 'VER TIPOS',
      theme: 'hero-card-theme-noir',
      accent: 'hero-card-accent-brown'
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
                  <div className="hero-card-v8-inner">
                    <div className={`hero-card-v8-image ${card.theme}`}>
                      <span className="hero-card-v8-art hero-card-v8-art-circle" />
                      <span className="hero-card-v8-art hero-card-v8-art-wave" />
                      <span className="hero-card-v8-art hero-card-v8-art-splash" />
                    </div>

                    <div className="hero-card-v8-content">
                      <span className="hero-card-v8-title">{card.label}</span>
                      <span className={`hero-card-v8-cta ${card.accent}`}>{card.cta}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="nav-arrow left"
        aria-label="Previous slide"
      >
        <ChevronLeft size={48} strokeWidth={1} />
      </button>
      <button
        onClick={nextSlide}
        className="nav-arrow right"
        aria-label="Next slide"
      >
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
