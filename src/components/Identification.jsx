import React, { useState, useEffect } from 'react';
import { Sparkles, Wine } from 'lucide-react';
import './Identification.css';

const Identification = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="identification"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Banner (does not block clicks) */}
      <div className="pointer-events-none absolute inset-0 bg-black">
        <img
          src="/banner.jpg"
          alt="Bierz Banner"
          className="w-full h-full object-cover object-center"
        />
        {/* Lighter overlay (banner was too dark) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/10 to-black/25" />
      </div>

      <div className="relative z-10 w-full max-w-6xl px-6 text-center">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {/* Bierz: premium gold (pre-orange), Distribuidora: white */}
          <h1 className="font-extrabold leading-[0.95] tracking-tight">
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[5.6rem]
              bg-gradient-to-r from-amber-500 to-orange-600
              bg-clip-text text-transparent
              drop-shadow-[0_12px_30px_rgba(0,0,0,0.65)]">
              BIERZ
            </span>
            <span className="block mt-2 text-4xl sm:text-5xl md:text-6xl lg:text-[4.6rem]
              text-white
              drop-shadow-[0_12px_30px_rgba(0,0,0,0.65)]">
              Distribuidora
            </span>
          </h1>

          {/* Tags (keep as you liked) */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <div className="group inline-flex items-center gap-2 rounded-lg border border-orange-500/40 bg-black/30 px-4 py-2 text-sm md:text-base text-white/90 backdrop-blur transition duration-200 hover:bg-black/40 hover:border-orange-500/70 hover:shadow-[0_12px_30px_rgba(255,120,0,0.25)]">
              <Wine className="h-4 w-4 text-orange-400 transition duration-200 group-hover:scale-110" />
              <span>
                Chopp <span className="text-orange-400 font-semibold">Premium</span>
              </span>
            </div>
            <div className="group inline-flex items-center gap-2 rounded-lg border border-orange-500/40 bg-black/30 px-4 py-2 text-sm md:text-base text-white/90 backdrop-blur transition duration-200 hover:bg-black/40 hover:border-orange-500/70 hover:shadow-[0_12px_30px_rgba(255,120,0,0.25)]">
              <Sparkles className="h-4 w-4 text-orange-400 transition duration-200 group-hover:scale-110" />
              <span>
                Cervejas <span className="text-orange-400 font-semibold">Especiais</span>
              </span>
            </div>
          </div>

          <p className="mt-6 text-white/85 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            As melhores marcas de chopp e cerveja para seu evento. Qualidade, variedade e atendimento diferenciado em Sorocaba e região.
          </p>

          {/* CTAs: use anchors so they ALWAYS work (no JS dependency) */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#how-it-works"
              className="min-w-[200px] inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-600 px-7 py-3 font-semibold text-black shadow-md shadow-black/20 transition duration-200 hover:brightness-105 hover:shadow-lg hover:shadow-black/25"
            >
              Como funciona
            </a>
            <a
              href="#products"
              className="min-w-[200px] inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-600 px-7 py-3 font-semibold text-black shadow-md shadow-black/20 transition duration-200 hover:brightness-105 hover:shadow-lg hover:shadow-black/25"
            >
              Ver Produtos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Identification;
