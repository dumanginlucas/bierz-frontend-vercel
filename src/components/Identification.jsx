import React, { useState, useEffect } from 'react';
import { Wine, Sparkles } from 'lucide-react';
import './Identification.css';

const handleSmoothScroll = (e, targetId) => {
  if (e) e.preventDefault();
  const element = document.getElementById(targetId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

export default function Identification() {
  const [showElements, setShowElements] = useState(false);
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [showContent, setShowContent] = useState(false);

  const fullTitleText = 'Bierz Distribuidora';

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

  const parts = displayedTitle.split(' ');
  const bierzPart = parts[0] || '';
  const distribuidoraPart = displayedTitle.slice(bierzPart.length + 1);

  return (
    <section
      id="identification"
      className="relative pt-40 md:pt-32 pb-20 md:pb-28 flex items-center justify-center overflow-hidden min-h-screen bg-transparent"
    >
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4">
        <div className="grid grid-cols-12 gap-0 items-center">
          
          <div className="hidden lg:flex col-span-12 lg:col-span-3 justify-center lg:justify-end overflow-visible">
            <div
              className={`id-element-left ${
                showElements 
                  ? 'opacity-100 lg:translate-x-[80px] translate-x-0' 
                  : 'opacity-0 translate-x-[600px]'
              }`}
            >
              <img
                src="/homebar.png"
                alt="Homebar"
                className="h-auto w-auto max-h-[550px] object-contain"
              />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6 id-content-column flex flex-col justify-center items-center text-center space-y-6">
            <h1 className="font-extrabold leading-[0.95] tracking-tight">
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[5.6rem] bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent drop-shadow-[0_12px_30px_rgba(0,0,0,0.65)] font-black">
                {bierzPart}
              </span>
              <span className="block mt-2 text-4xl sm:text-5xl md:text-6xl lg:text-[4.6rem] text-white drop-shadow-[0_12px_30px_rgba(0,0,0,0.65)]">
                {distribuidoraPart}
              </span>
            </h1>

            <div className={`transition-all duration-1000 mt-6 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <div className="group inline-flex items-center gap-2 rounded-lg border border-orange-500/40 bg-black/30 px-4 py-2 text-sm md:text-base text-white/90 backdrop-blur transition duration-200 hover:bg-black/40 hover:border-orange-500/70">
                  <Wine className="h-4 w-4 text-orange-400" />
                  <span>Chopp <span className="text-orange-400 font-semibold">Premium</span></span>
                </div>
                <div className="group inline-flex items-center gap-2 rounded-lg border border-orange-500/40 bg-black/30 px-4 py-2 text-sm md:text-base text-white/90 backdrop-blur transition duration-200 hover:bg-black/40 hover:border-orange-500/70">
                  <Sparkles className="h-4 w-4 text-orange-400" />
                  <span>Cervejas <span className="text-orange-400 font-semibold">Especiais</span></span>
                </div>
              </div>
            </div>

            <p className={`transition-all duration-1000 text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              As melhores marcas de Chopp e Cervejas Especiais para seu evento. Qualidade, variedade e atendimento diferenciado em Sorocaba e região.
            </p>

            <div className={`transition-all duration-1000 w-full ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="flex flex-wrap items-center justify-center gap-4">
                {/* Solução Definitiva: Mudança de link para botão real com evento de clique puro e z-index forçado */}
                <button 
                  onClick={(e) => handleSmoothScroll(e, 'section-how-it-works')}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-6 sm:px-8 py-3 text-sm sm:text-base md:text-lg font-bold text-black shadow-lg shadow-amber-500/30 transition-all duration-300 hover:brightness-110 active:scale-95 cursor-pointer relative z-[100]"
                >
                  Como funciona
                </button>
                <button 
                  onClick={(e) => handleSmoothScroll(e, 'products')}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-6 sm:px-8 py-3 text-sm sm:text-base md:text-lg font-bold text-black shadow-lg shadow-amber-500/30 transition-all duration-300 hover:brightness-110 active:scale-95 cursor-pointer relative z-[100]"
                >
                  Ver Produtos
                </button>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex col-span-12 lg:col-span-3 justify-center lg:justify-start overflow-visible">
            <div
              className={`id-element-right ${
                showElements 
                  ? 'opacity-100 lg:-translate-x-[80px] translate-x-0' 
                  : 'opacity-0 -translate-x-[600px]'
              }`}
            >
              <img
                src="/barris.png"
                alt="Barris"
                className="h-auto w-auto max-h-[700px] object-contain"
                style={{ transform: 'scale(1.8)', transformOrigin: 'center center' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
