import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Identification from './Identification';
import './HeroCarousel.css';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
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
      label: 'Chopp para Eventos',
      description: 'Para churrascos, aniversários e encontros com chopp gelado.',
      theme: 'hero-card-theme-gold'
    },
    {
      id: 2,
      label: 'Home Bar',
      description: 'Chopeira premium para elevar seu evento em casa.',
      theme: 'hero-card-theme-beige'
    },
    {
      id: 3,
      label: 'Barril de Chopp',
      description: 'Escolha o tamanho ideal para servir sem erro.',
      theme: 'hero-card-theme-orange'
    },
    {
      id: 4,
      label: 'Tipos de Evento',
      description: 'Soluções para eventos sociais e corporativos.',
      theme: 'hero-card-theme-dark'
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

        <div className="hero-slide hero-slide-bierz w-full h-full flex-shrink-0 relative flex flex-col items-center">
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
                <div key={card.id} className={`hero-card-v8 ${card.theme}`}>
                  <div className="hero-card-v8-inner">
                    <div className="hero-card-v8-art" aria-hidden="true">
                      <span className="hero-card-v8-splash hero-card-v8-splash-a" />
                      <span className="hero-card-v8-splash hero-card-v8-splash-b" />
                      <span className="hero-card-v8-fruit hero-card-v8-fruit-a" />
                      <span className="hero-card-v8-fruit hero-card-v8-fruit-b" />
                    </div>

                    <div className="hero-card-v8-content">
                      <span className="hero-card-v8-title">{card.label}</span>
                      <p className="hero-card-v8-description">{card.description}</p>
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
