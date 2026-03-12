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
      image: '/card-placeholders/delivery.png',
      surfaceClass: 'surface-delivery'
    },
    {
      id: 2,
      label: 'HOME BAR',
      image: '/card-placeholders/homebar.png',
      surfaceClass: 'surface-homebar'
    },
    {
      id: 3,
      label: 'BARRIL DE CHOPP',
      image: '/card-placeholders/barrel.png',
      surfaceClass: 'surface-barrel'
    },
    {
      id: 4,
      label: 'CALCULADORA',
      image: '/card-placeholders/calc.png',
      surfaceClass: 'surface-calc'
    },
    {
      id: 5,
      label: 'TIPOS DE EVENTO',
      image: '/card-placeholders/events.png',
      surfaceClass: 'surface-events'
    },
    {
      id: 6,
      label: 'REGIÃO ATENDIDA',
      image: '/card-placeholders/region.png',
      surfaceClass: 'surface-region'
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

        <div className="hero-slide hero-slide--cards w-full h-full flex-shrink-0 relative flex flex-col items-center">
          <div className="hero-banner-v8-container relative w-full h-full overflow-hidden">
            <div className="hero-banner-v8-inner relative w-full h-full overflow-hidden">
              <img
                src="/Bierzbannerhomebarchurrasco.png"
                alt="Bierz Experience"
                className="w-full h-full object-cover object-center"
              />
              <div className="hero-banner-v8-overlay" />
            </div>
          </div>

          <div className="hero-cards-v8-wrapper">
            <div className="hero-cards-v8-grid">
              {cards.map((card) => (
                <button key={card.id} className="hero-card-v8" type="button" aria-label={card.label}>
                  <div className="hero-card-v8-inner">
                    <div className={`hero-card-v8-image ${card.surfaceClass}`}>
                      <div
                        className="hero-card-v8-art"
                        style={{
                          backgroundImage: `url(${card.image})`
                        }}
                      />
                    </div>

                    <div className="hero-card-v8-content">
                      <span>{card.label}</span>
                    </div>
                  </div>
                </button>
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
