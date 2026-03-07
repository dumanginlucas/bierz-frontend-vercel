import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Wine, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import './Identification.css';

const FADE_DURATION = 650;

const handleSmoothScroll = (e, targetId) => {
  if (e) e.preventDefault();
  const element = document.getElementById(targetId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const heroSlides = [
  {
    id: 1,
    desktop: '/hero-videos/hero-1.mp4',
    mobile: '/hero-videos/hero-1-mobile.mp4',
  },
  {
    id: 2,
    desktop: '/hero-videos/hero-2.mp4',
    mobile: '/hero-videos/hero-2-mobile.mp4',
  },
  {
    id: 3,
    desktop: '/hero-videos/hero-3.mp4',
    mobile: '/hero-videos/hero-3-mobile.mp4',
  },
  {
    id: 4,
    desktop: '/hero-videos/hero-4.mp4',
    mobile: '/hero-videos/hero-4-mobile.mp4',
  },
];

export default function Identification() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activePlayer, setActivePlayer] = useState(0);
  const [showElements, setShowElements] = useState(false);
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [showContent, setShowContent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const videoRefs = useRef([null, null]);
  const activePlayerRef = useRef(0);
  const currentSlideRef = useRef(0);
  const transitionLockRef = useRef(false);
  const transitionTimeoutRef = useRef(null);

  const fullTitleText = 'Bierz Distribuidora';

  const getVideoSrc = (slideIndex) => {
    const slide = heroSlides[slideIndex];
    return isMobile ? slide.mobile : slide.desktop;
  };

  const safelyPlayVideo = (video) => {
    if (!video) return;

    const playAttempt = () => {
      const playPromise = video.play();
      if (playPromise?.catch) {
        playPromise.catch(() => {});
      }
    };

    if (video.readyState >= 2) {
      playAttempt();
      return;
    }

    const handleCanPlay = () => {
      video.removeEventListener('canplay', handleCanPlay);
      playAttempt();
    };

    video.addEventListener('canplay', handleCanPlay);
  };

  const preloadFollowingVideo = (playerIndex, slideIndex) => {
    const video = videoRefs.current[playerIndex];
    if (!video) return;

    const nextSrc = getVideoSrc(slideIndex);
    if (video.getAttribute('src') !== nextSrc) {
      video.setAttribute('src', nextSrc);
      video.load();
    }

    video.pause();
    video.currentTime = 0;
  };

  const transitionToSlide = (targetIndex) => {
    if (transitionLockRef.current) return;
    if (targetIndex === currentSlideRef.current) return;

    transitionLockRef.current = true;

    const currentPlayerIndex = activePlayerRef.current;
    const nextPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    const currentVideo = videoRefs.current[currentPlayerIndex];
    const nextVideo = videoRefs.current[nextPlayerIndex];

    if (!nextVideo) {
      transitionLockRef.current = false;
      setCurrentSlide(targetIndex);
      return;
    }

    const nextSrc = getVideoSrc(targetIndex);
    if (nextVideo.getAttribute('src') !== nextSrc) {
      nextVideo.setAttribute('src', nextSrc);
      nextVideo.load();
    }

    nextVideo.currentTime = 0;
    nextVideo.muted = true;
    nextVideo.playsInline = true;

    const startTransition = () => {
      safelyPlayVideo(nextVideo);

      setCurrentSlide(targetIndex);
      currentSlideRef.current = targetIndex;
      setActivePlayer(nextPlayerIndex);
      activePlayerRef.current = nextPlayerIndex;

      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }

      transitionTimeoutRef.current = setTimeout(() => {
        if (currentVideo) {
          currentVideo.pause();
          currentVideo.currentTime = 0;
        }

        const followingIndex = (targetIndex + 1) % heroSlides.length;
        preloadFollowingVideo(currentPlayerIndex, followingIndex);
        transitionLockRef.current = false;
      }, FADE_DURATION);
    };

    if (nextVideo.readyState >= 2) {
      startTransition();
      return;
    }

    const handleCanPlay = () => {
      nextVideo.removeEventListener('canplay', handleCanPlay);
      startTransition();
    };

    nextVideo.addEventListener('canplay', handleCanPlay);
  };

  const nextSlide = () => {
    const target = (currentSlideRef.current + 1) % heroSlides.length;
    transitionToSlide(target);
  };

  const prevSlide = () => {
    const target = (currentSlideRef.current - 1 + heroSlides.length) % heroSlides.length;
    transitionToSlide(target);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const updateMediaState = (event) => {
      setIsMobile(event.matches);
    };

    setIsMobile(mediaQuery.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateMediaState);
    } else {
      mediaQuery.addListener(updateMediaState);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', updateMediaState);
      } else {
        mediaQuery.removeListener(updateMediaState);
      }
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowElements(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showElements) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullTitleText.length) {
        setDisplayedTitle(fullTitleText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setShowContent(true);
        }, 500);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [showElements]);

  useEffect(() => {
    const activeVideo = videoRefs.current[activePlayerRef.current];
    const standbyVideo = videoRefs.current[activePlayerRef.current === 0 ? 1 : 0];

    const currentSrc = getVideoSrc(currentSlideRef.current);
    const nextIndex = (currentSlideRef.current + 1) % heroSlides.length;
    const nextSrc = getVideoSrc(nextIndex);

    if (activeVideo) {
      activeVideo.setAttribute('src', currentSrc);
      activeVideo.load();
      activeVideo.currentTime = 0;
      activeVideo.muted = true;
      activeVideo.playsInline = true;
      safelyPlayVideo(activeVideo);
    }

    if (standbyVideo) {
      standbyVideo.setAttribute('src', nextSrc);
      standbyVideo.load();
      standbyVideo.pause();
      standbyVideo.currentTime = 0;
      standbyVideo.muted = true;
      standbyVideo.playsInline = true;
    }
  }, [isMobile]);

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  const parts = useMemo(() => displayedTitle.split(' '), [displayedTitle]);
  const bierzPart = parts[0] || '';
  const distribuidoraPart = displayedTitle.slice(bierzPart.length + 1);

  return (
    <section id="identification" className="relative min-h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        {[0, 1].map((playerIndex) => (
          <div
            key={playerIndex}
            className={`absolute inset-0 transition-opacity ease-linear ${
              activePlayer === playerIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDuration: `${FADE_DURATION}ms` }}
          >
            <video
              ref={(element) => {
                videoRefs.current[playerIndex] = element;
              }}
              className="absolute inset-0 h-full w-full object-cover"
              muted
              playsInline
              preload="auto"
              onEnded={() => {
                if (activePlayerRef.current === playerIndex) {
                  nextSlide();
                }
              }}
            />
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/70" />
          </div>
        ))}
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 pt-16 md:pt-20 pb-24 md:pb-32">
        <div className="w-full max-w-4xl text-center space-y-6 md:space-y-8">
          <h1 className="font-extrabold leading-[0.95] tracking-tight">
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.6rem] bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent drop-shadow-[0_12px_30px_rgba(0,0,0,0.65)] font-black">
              {bierzPart}
            </span>
            <span className="block mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.6rem] text-white drop-shadow-[0_12px_30px_rgba(0,0,0,0.65)]">
              {distribuidoraPart}
            </span>
          </h1>

          <div className={`transition-all duration-1000 mt-4 md:mt-6 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
              <div className="group inline-flex items-center gap-2 rounded-lg border border-orange-500/40 bg-black/30 px-3 md:px-4 py-2 text-xs md:text-base text-white/90 backdrop-blur transition duration-200 hover:bg-black/40 hover:border-orange-500/70">
                <Wine className="h-3 w-3 md:h-4 md:w-4 text-orange-400 flex-shrink-0" />
                <span>Chopp <span className="text-orange-400 font-semibold">Premium</span></span>
              </div>
              <div className="group inline-flex items-center gap-2 rounded-lg border border-orange-500/40 bg-black/30 px-3 md:px-4 py-2 text-xs md:text-base text-white/90 backdrop-blur transition duration-200 hover:bg-black/40 hover:border-orange-500/70">
                <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-orange-400 flex-shrink-0" />
                <span>Cervejas <span className="text-orange-400 font-semibold">Especiais</span></span>
              </div>
            </div>
          </div>

          <p className={`transition-all duration-1000 text-sm md:text-base lg:text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto px-2 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            As melhores marcas de Chopp e Cervejas Especiais para seu evento. Qualidade, variedade e atendimento diferenciado em Sorocaba e região.
          </p>

          <div className={`transition-all duration-1000 w-full ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 px-2">
              <button
                onClick={(e) => handleSmoothScroll(e, 'section-how-it-works')}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-4 md:px-8 py-2 md:py-3 text-xs md:text-base md:text-lg font-bold text-black shadow-lg shadow-amber-500/30 transition-all duration-300 hover:brightness-110 active:scale-95 cursor-pointer relative z-[100]"
              >
                Como funciona
              </button>
              <button
                onClick={(e) => handleSmoothScroll(e, 'products')}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-4 md:px-8 py-2 md:py-3 text-xs md:text-base md:text-lg font-bold text-black shadow-lg shadow-amber-500/30 transition-all duration-300 hover:brightness-110 active:scale-95 cursor-pointer relative z-[100]"
              >
                Ver Produtos
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 lg:left-8 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/15 hover:bg-white/25 p-1.5 md:p-2 text-white backdrop-blur-sm transition-all active:scale-95"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 lg:right-8 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/15 hover:bg-white/25 p-1.5 md:p-2 text-white backdrop-blur-sm transition-all active:scale-95"
        aria-label="Próximo slide"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8" />
      </button>

      <div className="absolute bottom-20 md:bottom-24 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => transitionToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'bg-orange-500 w-6 md:w-8 h-2.5 md:h-3'
                : 'bg-white/40 hover:bg-white/60 w-2.5 md:h-3 h-2.5 md:w-3'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="identification-shape-divider absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20">
        <svg
          className="relative block w-full h-[40px] md:h-[60px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,105.1,121.7,105.9,180.33,93.54,243.37,80.19,282.29,63.7,321.39,56.44Z"
            className="fill-black"
          ></path>
        </svg>
      </div>
    </section>
  );
}
