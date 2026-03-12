import React, { useState } from 'react';
import { Beer, Home, Droplet, Calendar, MapPin, Zap } from 'lucide-react';
import './HeroBannerAlternative.css';

const HeroBannerAlternative = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleSmoothScroll = (e, targetId) => {
    if (e) e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const cards = [
    {
      id: 1,
      icon: Beer,
      title: 'Chopp para Eventos',
      subtitle: 'Orçamento rápido',
      cta: 'Solicitar',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      accentColor: 'text-orange-600',
      action: () => handleSmoothScroll(null, 'contact'),
    },
    {
      id: 2,
      icon: Home,
      title: 'Home Bar',
      subtitle: 'Chopeira compacta',
      cta: 'Ver Equipamento',
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      accentColor: 'text-amber-600',
      action: () => handleSmoothScroll(null, 'products'),
    },
    {
      id: 3,
      icon: Droplet,
      title: 'Barril de Chopp',
      subtitle: 'Vários tamanhos',
      cta: 'Ver Opções',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      accentColor: 'text-yellow-600',
      action: () => handleSmoothScroll(null, 'products'),
    },
    {
      id: 4,
      icon: Calendar,
      title: 'Eventos Atendidos',
      subtitle: 'Casamentos • Festas • Churrascos',
      cta: 'Ver Eventos',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      accentColor: 'text-red-600',
      action: () => handleSmoothScroll(null, 'contact'),
    },
    {
      id: 5,
      icon: MapPin,
      title: 'Área de Entrega',
      subtitle: 'Sorocaba e região',
      cta: 'Saiba Mais',
      color: 'from-rose-500 to-rose-600',
      bgColor: 'bg-rose-50',
      accentColor: 'text-rose-600',
      action: () => handleSmoothScroll(null, 'contact'),
    },
    {
      id: 6,
      icon: Zap,
      title: 'Orçamento Rápido',
      subtitle: 'Receba valores em minutos',
      cta: 'Pedir Orçamento',
      color: 'from-orange-600 to-orange-700',
      bgColor: 'bg-orange-100',
      accentColor: 'text-orange-700',
      isPrimary: true,
      action: () => handleSmoothScroll(null, 'contact'),
    },
  ];

  return (
    <section className="hero-banner-alternative relative min-h-screen w-full overflow-hidden">
      {/* Background com gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 z-0" />

      {/* Decorative elements - círculos de fundo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-gray-900 leading-tight">
            <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
              Soluções Completas
            </span>
            <br />
            <span className="text-gray-800">em Chopp e Cerveja</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Encontre exatamente o que você precisa para sua casa, evento ou negócio
          </p>
        </div>

        {/* Cards Grid */}
        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {cards.map((card) => {
              const IconComponent = card.icon;
              const isPrimary = card.isPrimary;

              return (
                <div
                  key={card.id}
                  className={`hero-card group relative ${isPrimary ? 'lg:col-span-1 lg:row-span-2' : ''}`}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Card Container */}
                  <div
                    className={`
                      relative h-full rounded-2xl overflow-hidden
                      transition-all duration-300 ease-out
                      ${isPrimary ? 'bg-gradient-to-br ' + card.color : card.bgColor}
                      ${hoveredCard === card.id ? 'transform -translate-y-2 shadow-2xl' : 'shadow-lg'}
                      border ${isPrimary ? 'border-orange-400/30' : 'border-gray-200/60'}
                      backdrop-blur-sm
                    `}
                  >
                    {/* Texture overlay */}
                    <div className="absolute inset-0 opacity-30 mix-blend-overlay">
                      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id={`pattern-${card.id}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <line x1="0" y1="0" x2="40" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
                            <line x1="40" y1="0" x2="0" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#pattern-${card.id})`} />
                      </svg>
                    </div>

                    {/* Gradient overlay for non-primary cards */}
                    {!isPrimary && (
                      <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-5`} />
                    )}

                    {/* Content */}
                    <div className="relative p-6 md:p-8 h-full flex flex-col justify-between">
                      {/* Icon and Title */}
                      <div className="space-y-4">
                        {/* Icon Container */}
                        <div
                          className={`
                            inline-flex items-center justify-center w-16 h-16 rounded-xl
                            transition-all duration-300
                            ${isPrimary 
                              ? 'bg-white/20 text-white' 
                              : `bg-gradient-to-br ${card.color} text-white`
                            }
                            ${hoveredCard === card.id ? 'scale-110 shadow-lg' : 'scale-100'}
                          `}
                        >
                          <IconComponent className="w-8 h-8" />
                        </div>

                        {/* Title */}
                        <div>
                          <h3 className={`text-xl md:text-2xl font-bold mb-2 ${isPrimary ? 'text-white' : 'text-gray-900'}`}>
                            {card.title}
                          </h3>
                          <p className={`text-sm md:text-base ${isPrimary ? 'text-white/80' : 'text-gray-600'}`}>
                            {card.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <button
                        onClick={card.action}
                        className={`
                          mt-6 w-full py-3 px-4 rounded-lg font-semibold text-sm md:text-base
                          transition-all duration-300 transform
                          ${isPrimary
                            ? 'bg-white text-orange-600 hover:bg-orange-50 hover:shadow-lg'
                            : `bg-gradient-to-r ${card.color} text-white hover:shadow-lg`
                          }
                          ${hoveredCard === card.id ? 'scale-105' : 'scale-100'}
                          active:scale-95
                        `}
                      >
                        {card.cta}
                      </button>
                    </div>

                    {/* Hover glow effect */}
                    {hoveredCard === card.id && (
                      <div className="absolute inset-0 bg-white/10 rounded-2xl animate-pulse" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Secondary CTA */}
        <div className="mt-12 md:mt-16 text-center">
          <p className="text-gray-600 mb-4">Não encontrou o que procura?</p>
          <button
            onClick={(e) => handleSmoothScroll(e, 'contact')}
            className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-full border-2 border-orange-500 text-orange-600 font-semibold hover:bg-orange-50 transition-all duration-300"
          >
            Fale com nosso time
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroBannerAlternative;
