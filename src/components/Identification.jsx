import React, { useState, useEffect } from 'react';
import { Wine, Sparkles } from 'lucide-react';
import './Identification.css';

export default function Identification() {
  const [showElements, setShowElements] = useState(false);
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [showContent, setShowContent] = useState(false);

  const fullTitleText = 'Bierz Distribuidora';

  // Efeito de entrada dos elementos (Homebar e Barris) - ULTRA LENTO
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowElements(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Typing effect para o título completo "Bierz Distribuidora" - MUITO LENTO
  useEffect(() => {
    if (!showElements) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullTitleText.length) {
        setDisplayedTitle(fullTitleText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        // Mostra badges, botões e texto após o typing
        setTimeout(() => {
          setShowContent(true);
        }, 500);
      }
    }, 200); // Typing muito lento e elegante

    return () => clearInterval(interval);
  }, [showElements]);

  // Separar o texto digitado em "Bierz" e "Distribuidora"
  const parts = displayedTitle.split(' ');
  const bierzPart = parts[0] || '';
  const distribuidoraPart = displayedTitle.slice(bierzPart.length + 1);

  return (
    <section
      id="identification"
      className="relative pt-20 pb-20 md:pt-32 md:pb-28 flex items-center justify-center overflow-hidden min-h-screen bg-black"
    >
      {/* Layout de 3 colunas: Homebar | Conteúdo | Barris */}
      <div className="relative z-10 w-full px-6 md:px-8">
        <div className="grid grid-cols-12 gap-0 lg:gap-0 items-center justify-items-center">
          
          {/* COLUNA 1: Homebar (Esquerda) - VEM DE MUITO LONGE DA DIREITA */}
          <div className="col-span-12 lg:col-span-3 flex justify-center lg:justify-end pr-2 overflow-visible">
            <div
              className={`id-element-left transition-transform transition-opacity duration-[5000ms] ease-out ${
                showElements ? 'opacity-100 lg:translate-x-[60px] translate-x-0' : 'opacity-0 translate-x-[800px]'
              }`}
            >
              <img
                src="/homebar.png"
                alt="Homebar"
                className="h-auto drop-shadow-2xl"
                style={{ width: 'auto', maxHeight: '500px' }}
              />
            </div>
          </div>

          {/* COLUNA 2: Conteúdo Centralizado (Centro) */}
          <div className="col-span-12 lg:col-span-6 flex flex-col justify-center items-center text-center space-y-6">
            
            {/* Título com Typing Effect - Bierz e Distribuidora separados */}
            <h1 className="font-extrabold leading-[0.95] tracking-tight">
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[5.6rem]
                bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600
                bg-clip-text text-transparent
                drop-shadow-[0_12px_30px_rgba(0,0,0,0.65)]
                font-black">
                {bierzPart}
              </span>
              <span className="block mt-2 text-4xl sm:text-5xl md:text-6xl lg:text-[4.6rem]
                text-white
                drop-shadow-[0_12px_30px_rgba(0,0,0,0.65)]">
                {distribuidoraPart}
              </span>
            </h1>

            {/* Badges - Design Original do v7 */}
            <div
              className={`transition-all duration-700 mt-6 ${
                showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="flex flex-wrap items-center justify-center gap-3">
                <div className="group inline-flex items-center gap-2 rounded-lg border border-orange-500/40 bg-black/30 px-4 py-2 text-sm md:text-base text-white/90 backdrop-blur transition duration-200 hover:bg-black/40 hover:border-orange-500/70 hover:shadow-[0_12px_30px_rgba(255,120,0,0.25)]">
                  <Wine className="h-4 w-4 text-orange-400 transition duration-200 group-hover:scale-110" />
                  <span>Chopp <span className="text-orange-400 font-semibold">Premium</span></span>
                </div>
                <div className="group inline-flex items-center gap-2 rounded-lg border border-orange-500/40 bg-black/30 px-4 py-2 text-sm md:text-base text-white/90 backdrop-blur transition duration-200 hover:bg-black/40 hover:border-orange-500/70 hover:shadow-[0_12px_30px_rgba(255,120,0,0.25)]">
                  <Sparkles className="h-4 w-4 text-orange-400 transition duration-200 group-hover:scale-110" />
                  <span>Cervejas <span className="text-orange-400 font-semibold">Especiais</span></span>
                </div>
              </div>
            </div>

            {/* Subtitle - Aparece junto com badges e botões */}
            <p
              className={`transition-all duration-700 text-base sm:text-lg md:text-lg text-gray-300 leading-relaxed max-w-2xl ${
                showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              As melhores marcas de Chopp e Cervejas Especiais para seu evento. Qualidade, variedade e atendimento diferenciado em Sorocaba e região.
            </p>

            {/* Botões - Aparece junto com badges e texto */}
            <div
              className={`transition-all duration-700 ${
                showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-3 text-base md:text-lg font-bold text-black shadow-lg shadow-amber-500/30 transition-all duration-300 hover:brightness-110 hover:shadow-lg hover:shadow-amber-500/50 active:scale-95"
                >
                  Como funciona
                </a>
                <a
                  href="#products"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-3 text-base md:text-lg font-bold text-black shadow-lg shadow-amber-500/30 transition-all duration-300 hover:brightness-110 hover:shadow-lg hover:shadow-amber-500/50 active:scale-95"
                >
                  Ver Produtos
                </a>
              </div>
            </div>
          </div>

          {/* COLUNA 3: Barris e Chopeira (Direita) - VEM DE MUITO LONGE DA ESQUERDA - DOBRADO */}
          <div className="col-span-12 lg:col-span-3 flex justify-center lg:justify-start pl-2 overflow-visible">
            <div
              className={`id-element-right transition-transform transition-opacity duration-[5000ms] ease-out ${
                showElements ? 'opacity-100 lg:-translate-x-[30px] translate-x-0' : 'opacity-0 -translate-x-[800px]'
              }`}
            >
              <img
                src="/barris.png"
                alt="Barris e Chopeira"
                className="h-auto drop-shadow-2xl"
                style={{ width: 'auto', maxHeight: '800px', transform: 'scale(2)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
