import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './HeroCarousel.css';

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;
const AUTO_PLAY_MS = 12000;
const DRAG_THRESHOLD_RATIO = 0.15;

const HeroCarousel = () => {
  const [windowWidth, setWindowWidth] = useState(() => {
    if (typeof window === 'undefined') return 1200;
    return window.innerWidth;
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobileView = windowWidth <= MOBILE_BREAKPOINT;
  const isTabletView = windowWidth > MOBILE_BREAKPOINT && windowWidth <= TABLET_BREAKPOINT;
  const isDesktopView = windowWidth > TABLET_BREAKPOINT;

  const banners = useMemo(
    () => [
      {
        id: 1,
        image: isMobileView ? '/bannermobile1.png' : '/bannerhero1.png',
        alt: 'Banner Hero 1'
      },
      {
        id: 2,
        image: isMobileView ? '/bannermobile2.png' : '/bannerhero2.png',
        alt: 'Banner Hero 2'
      }
    ],
    [isMobileView]
  );

  const cards = [
    {
      id: 1,
      label: 'Catálogo de Chopps',
      description: 'Escolha aqui o chopp do seu evento.',
      theme: 'hero-card-theme-events',
      image: '/card-placeholders/catalogo-chopps.jpg',
      imageClass: 'hero-card-v8-image-catalogo',
      hasSplash: false
    },
    {
      id: 2,
      label: 'Home Bar',
      description: 'Receba essa Home Bar em casa para agradar os amigos.',
      theme: 'hero-card-theme-homebar',
      image: '/card-placeholders/homebar-piscina.jpg',
      imageClass: 'hero-card-v8-image-homebar',
      hasSplash: false
    },
    {
      id: 3,
      label: 'Nossas Redes',
      description: 'Siga a Bierz no Instagram para acompanhar as promoções.',
      theme: 'hero-card-theme-barril',
      image: '/card-placeholders/redes-social-card.png',
      imageClass: 'hero-card-v8-image-redes',
      hasSplash: false
    },
    {
      id: 4,
      label: 'Entrega Free',
      description: 'Com a Bierz você fica livre da taxa de entrega e do equipamento!',
      theme: 'hero-card-theme-tipos',
      image: '/card-placeholders/entrega-montana.png',
      imageClass: 'hero-card-v8-image-entrega',
      hasSplash: false
    }
  ];

  const totalSlides = banners.length;
  const loopedBanners = useMemo(() => {
    if (!banners.length) return [];
    return [banners[banners.length - 1], ...banners, banners[0]];
  }, [banners]);

  const [currentSlide, setCurrentSlide] = useState(1);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const [isHeroReady, setIsHeroReady] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const heroRef = useRef(null);
  const autoplayRef = useRef(null);
  const dragStartXRef = useRef(0);
  const dragDeltaRef = useRef(0);
  const isDraggingRef = useRef(false);
  const heroWidthRef = useRef(1);
  const isResettingRef = useRef(false);

  const updateHeroWidth = useCallback(() => {
    const width = heroRef.current?.offsetWidth || window.innerWidth || 1;
    heroWidthRef.current = Math.max(width, 1);
  }, []);

  useEffect(() => {
    updateHeroWidth();
    window.addEventListener('resize', updateHeroWidth);
    return () => window.removeEventListener('resize', updateHeroWidth);
  }, [updateHeroWidth]);

  useEffect(() => {
    setIsTransitionEnabled(false);
    setCurrentSlide(1);
    setDragOffset(0);
    isResettingRef.current = false;
  }, [banners.length, isMobileView]);

  const logicalIndex = totalSlides
    ? ((currentSlide - 1 + totalSlides) % totalSlides)
    : 0;

  const currentBanner = banners[logicalIndex] || banners[0];

  const clearAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const nextSlide = useCallback(() => {
    if (isResettingRef.current) return;
    setIsTransitionEnabled(true);
    setCurrentSlide((prev) => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    if (isResettingRef.current) return;
    setIsTransitionEnabled(true);
    setCurrentSlide((prev) => prev - 1);
  }, []);

  const startAutoplay = useCallback(() => {
    clearAutoplay();
    if (!isHeroReady || isDraggingRef.current || isResettingRef.current) return;

    autoplayRef.current = window.setInterval(() => {
      setCurrentSlide((prev) => prev + 1);
    }, AUTO_PLAY_MS);
  }, [clearAutoplay, isHeroReady]);

  useEffect(() => {
    let isMounted = true;
    setIsHeroReady(false);
    const preload = banners.map((banner) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = banner.image;
        img.onload = resolve;
        img.onerror = resolve;
      });
    });
    Promise.all(preload).then(() => {
      if (isMounted) setIsHeroReady(true);
    });
    return () => { isMounted = false; };
  }, [banners]);

  useEffect(() => {
    if (isHeroReady && !isDraggingRef.current && !isResettingRef.current) {
      startAutoplay();
    }
    return clearAutoplay;
  }, [isHeroReady, startAutoplay, clearAutoplay]);

  const getClientX = (event) => {
    if ('touches' in event && event.touches.length) return event.touches[0].clientX;
    if ('changedTouches' in event && event.changedTouches.length) return event.changedTouches[0].clientX;
    return event.clientX;
  };

  const endDrag = useCallback(() => {
    if (!isDraggingRef.current) return;

    const delta = dragDeltaRef.current;
    const threshold = heroWidthRef.current * DRAG_THRESHOLD_RATIO;

    isDraggingRef.current = false;
    setIsDragging(false);
    setIsTransitionEnabled(true);
    setDragOffset(0);

    if (delta <= -threshold) {
      nextSlide();
    } else if (delta >= threshold) {
      prevSlide();
    }
    
    dragDeltaRef.current = 0;
    setTimeout(() => {
      if (isHeroReady && !isDraggingRef.current && !isResettingRef.current) {
        startAutoplay();
      }
    }, 100);
  }, [nextSlide, prevSlide, isHeroReady, startAutoplay]);

  const moveDrag = useCallback((event) => {
    if (!isDraggingRef.current) return;

    const clientX = getClientX(event);
    const delta = clientX - dragStartXRef.current;

    dragDeltaRef.current = delta;
    setDragOffset(delta);

    if ('touches' in event && Math.abs(delta) > 5) {
      if (event.cancelable) event.preventDefault();
    }
  }, []);

  const startDrag = useCallback((clientX) => {
    if (isResettingRef.current) return;
    updateHeroWidth();
    isDraggingRef.current = true;
    setIsDragging(true);
    setIsTransitionEnabled(false);
    dragStartXRef.current = clientX;
    dragDeltaRef.current = 0;
    setDragOffset(0);
    clearAutoplay();
  }, [clearAutoplay, updateHeroWidth]);

  useEffect(() => {
    if (!isDragging) return undefined;

    const handleMouseMove = (event) => moveDrag(event);
    const handleMouseUp = () => endDrag();
    const handleTouchMove = (event) => moveDrag(event);
    const handleTouchEnd = () => endDrag();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [isDragging, moveDrag, endDrag]);

  const handleTransitionEnd = () => {
    if (currentSlide >= totalSlides + 1) {
      setIsTransitionEnabled(false);
      isResettingRef.current = true;
      setCurrentSlide(1);
      setTimeout(() => {
        isResettingRef.current = false;
        if (isHeroReady && !isDraggingRef.current) {
          startAutoplay();
        }
      }, 50);
    } else if (currentSlide <= 0) {
      setIsTransitionEnabled(false);
      isResettingRef.current = true;
      setCurrentSlide(totalSlides);
      setTimeout(() => {
        isResettingRef.current = false;
        if (isHeroReady && !isDraggingRef.current) {
          startAutoplay();
        }
      }, 50);
    }
  };

  return (
    <section
      ref={heroRef}
      id="identification"
      className={`hero-carousel-v8 relative w-full overflow-visible${isHeroReady ? ' hero-carousel-v8-ready' : ' hero-carousel-v8-loading'}${isDragging ? ' is-dragging' : ''}`}
      style={{ backgroundImage: `url(${currentBanner?.image || ''})` }}
    >
      <div
        className="hero-drag-surface"
        onMouseDown={(event) => startDrag(event.clientX)}
        onTouchStart={(event) => startDrag(event.touches[0].clientX)}
        aria-hidden="true"
      />

      <div
        className="hero-slides-wrapper flex h-full"
        style={{
          width: `${loopedBanners.length * 100}%`,
          transform: `translate3d(calc(-${(100 / loopedBanners.length) * currentSlide}% + ${dragOffset}px), 0, 0)`,
          transition: isTransitionEnabled ? 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {loopedBanners.map((banner, index) => (
          <div
            key={`${banner.id}-${index}`}
            className="hero-slide hero-slide-bierz relative flex h-full w-full flex-shrink-0 flex-col items-center"
            style={{ width: `${100 / loopedBanners.length}%` }}
          >
            <div className="hero-banner-v8-container relative h-full w-full overflow-hidden">
              <div className="hero-banner-v8-inner relative h-full w-full overflow-hidden">
                <img
                  src={banner.image}
                  alt={banner.alt}
                  className="h-full w-full object-cover object-center"
                  loading={index <= 1 ? 'eager' : 'lazy'}
                  decoding="async"
                  draggable="false"
                />
                <div className="pointer-events-none absolute inset-0 h-48 bg-gradient-to-b from-black/55 via-black/12 to-transparent" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="hero-cards-v8-wrapper">
        <div className="hero-cards-v8-grid">
          {cards.map((card) => (
            <div key={card.id} className={`hero-card-v8 ${card.theme} ${card.hasSplash ? 'with-splash' : 'no-splash'}`}>
              <div className="hero-card-v8-inner">
                <div className="hero-card-v8-art" aria-hidden="true">
                  <div className={`hero-card-v8-image ${card.imageClass}`} style={{ backgroundImage: `url(${card.image})` }} />
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

      {isDesktopView && (
        <>
          <button onClick={prevSlide} className="nav-arrow left" aria-label="Previous slide">
            <ChevronLeft size={48} strokeWidth={1} />
          </button>
          <button onClick={nextSlide} className="nav-arrow right" aria-label="Next slide">
            <ChevronRight size={48} strokeWidth={1} />
          </button>
        </>
      )}

      {isDesktopView && (
        <div className="indicators-container">
          {[...Array(totalSlides)].map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (isResettingRef.current) return;
                setIsTransitionEnabled(true);
                setCurrentSlide(i + 1);
              }}
              className={`indicator-dot ${logicalIndex === i ? 'active' : ''}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroCarousel;
