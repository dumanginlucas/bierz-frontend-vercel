import React, { useState, useEffect } from 'react';
import Identification from './Identification';
import HeroBannerAlternative from './HeroBannerAlternative';
import './HeroToggle.css';

const HeroToggle = () => {
  const [activeHero, setActiveHero] = useState('video');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggleHero = (heroType) => {
    if (heroType === activeHero || isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Fade out current hero
    setTimeout(() => {
      setActiveHero(heroType);
      // Fade in new hero
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300);
  };

  // Persist user preference
  useEffect(() => {
    const savedHero = localStorage.getItem('preferredHero');
    if (savedHero && (savedHero === 'video' || savedHero === 'banner')) {
      setActiveHero(savedHero);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('preferredHero', activeHero);
  }, [activeHero]);

  return (
    <div className="hero-toggle-wrapper">
      {/* Toggle Controls */}
      <div className="hero-toggle-controls">
        <div className="hero-toggle-buttons">
          <button
            onClick={() => toggleHero('video')}
            className={`hero-toggle-btn ${activeHero === 'video' ? 'active' : ''}`}
            aria-label="Mostrar hero com vídeo"
            title="Hero com Vídeo"
          >
            <span className="toggle-icon">▶</span>
            <span className="toggle-label">Vídeo</span>
          </button>
          <button
            onClick={() => toggleHero('banner')}
            className={`hero-toggle-btn ${activeHero === 'banner' ? 'active' : ''}`}
            aria-label="Mostrar hero com cards"
            title="Hero com Cards"
          >
            <span className="toggle-icon">◆</span>
            <span className="toggle-label">Cards</span>
          </button>
        </div>
      </div>

      {/* Hero Content */}
      <div className={`hero-toggle-content ${isTransitioning ? 'transitioning' : ''}`}>
        {activeHero === 'video' && (
          <div className="hero-content-wrapper fade-in">
            <Identification />
          </div>
        )}
        
        {activeHero === 'banner' && (
          <div className="hero-content-wrapper fade-in">
            <HeroBannerAlternative />
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroToggle;
