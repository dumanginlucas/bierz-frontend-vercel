import React, { useState, useEffect } from 'react';
import { ArrowDown, Sparkles, Wine } from 'lucide-react';
import './Identification.css';

const Identification = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerEl = document.querySelector('header');
      const headerH = headerEl?.offsetHeight ?? 0;
      const y = element.getBoundingClientRect().top + window.scrollY - headerH - 12;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="identification"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background: blur cover + foreground contain (no crop of taps/barrels) */}
      <div className="absolute inset-0">
        {/* Back layer fills screen */}
        <img
          src="/banner.jpg"
          alt="Bierz Banner Background"
          className="w-full h-full object-cover object-center blur-[2px] scale-105 opacity-60"
        />
        {/* Foreground layer keeps full subject visible */}
        <img
          src="/banner.jpg"
          alt="Bierz Banner"
          className="absolute inset-0 w-full h-full object-contain object-center"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <div className="relative z-10 w-full max-w-6xl px-6 text-center">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {/* Title */}
          <h1 className="font-extrabold leading-tight tracking-tight">
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl bg-gradient-to-r from-yellow-300 via-amber-500 to-orange-600 bg-clip-text text-transparent drop-shadow-[0_6px_24px_rgba(0,0,0,0.55)]">
              Bierz
            </span>
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.55)]">
              Distribuidora
            </span>
          </h1>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-lg border border-amber-500/35 bg-black/35 px-4 py-2 text-sm md:text-base text-white/90 backdrop-blur">
              <Wine className="h-4 w-4 text-amber-400" />
              <span>
                Chopp <span className="text-amber-400 font-semibold">Premium</span>
              </span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-lg border border-amber-500/35 bg-black/35 px-4 py-2 text-sm md:text-base text-white/90 backdrop-blur">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span>
                Cervejas <span className="text-amber-400 font-semibold">Especiais</span>
              </span>
            </div>
          </div>

          {/* Subtitle */}
          <p className="mt-6 text-white/85 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            As melhores marcas de chopp e cerveja para seu evento. Qualidade, variedade e atendimento diferenciado em Sorocaba e região.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="min-w-[180px] rounded-lg bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-600 px-7 py-3 font-semibold text-black shadow-lg shadow-black/25 hover:opacity-95 transition"
            >
              Como funciona
            </button>
            <button
              onClick={() => scrollToSection('products')}
              className="min-w-[180px] rounded-lg bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-600 px-7 py-3 font-semibold text-black shadow-lg shadow-black/25 hover:opacity-95 transition"
            >
              Ver Produtos
            </button>
          </div>

          {/* Scroll hint */}
          <div className="mt-14 flex items-center justify-center">
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-black/35 px-4 py-2 text-xs tracking-widest text-amber-300/90 backdrop-blur hover:bg-black/45 transition"
              aria-label="Ir para Como funciona"
            >
              <ArrowDown className="h-4 w-4" />
              COMO FUNCIONA
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Identification;
