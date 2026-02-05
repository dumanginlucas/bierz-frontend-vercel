import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Phone, ArrowDown, Beer, Zap, Star, ShoppingCart } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - Hidden on mobile */}
      <div className="absolute inset-0 bg-black">
        <img
          src="/banner.jpg"
          alt="Bierz Background"
          className="hidden sm:block w-full h-full object-cover object-center"
        />
        {/* Dark overlay para melhor legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black sm:bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* Tagline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6 animate-slide-up drop-shadow-2xl">
            Distribuidora de Chopp e
            <span className="text-[#FDB913]"> Cervejas Especiais</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 mb-6 md:mb-8 max-w-2xl mx-auto animate-slide-up drop-shadow-lg px-2" style={{ animationDelay: '0.2s' }}>
            As melhores marcas de chopp e cerveja para seu evento em Sorocaba e região.
            Qualidade, variedade e atendimento diferenciado.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 md:mb-12 animate-slide-up px-4" style={{ animationDelay: '0.4s' }}>
            <Button
              onClick={() => scrollToSection('products')}
              size="lg"
              className="bg-[#FDB913] hover:bg-[#F5A623] text-black font-bold text-sm sm:text-base md:text-lg px-6 sm:px-8 py-4 sm:py-6 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 w-full sm:w-auto"
              data-testid="view-products-hero"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Ver Produtos e Preços
            </Button>
            <Button
              onClick={() => window.open('https://wa.me/5515988015195', '_blank')}
              size="lg"
              variant="outline"
              className="border-2 border-[#FDB913] text-[#FDB913] hover:bg-[#FDB913] hover:text-black font-bold text-sm sm:text-base md:text-lg px-6 sm:px-8 py-4 sm:py-6 transition-all duration-300 w-full sm:w-auto"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              WhatsApp
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 max-w-3xl mx-auto animate-slide-up px-2" style={{ animationDelay: '0.6s' }}>
            <div className="bg-black/70 backdrop-blur-md border border-[#FDB913]/30 rounded-lg p-2 sm:p-4 md:p-6 hover:border-[#FDB913] hover:bg-black/80 transition-all duration-300">
              <Beer className="w-6 h-6 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#FDB913] mx-auto mb-1 sm:mb-2 md:mb-3" />
              <h3 className="text-[#FDB913] font-bold text-xs sm:text-base md:text-lg mb-0.5 sm:mb-1 md:mb-2">Variedade</h3>
              <p className="text-gray-200 text-[10px] sm:text-xs md:text-sm leading-tight">Chopp, cervejas especiais, gelo e mais</p>
            </div>
            <div className="bg-black/70 backdrop-blur-md border border-[#FDB913]/30 rounded-lg p-2 sm:p-4 md:p-6 hover:border-[#FDB913] hover:bg-black/80 transition-all duration-300">
              <Zap className="w-6 h-6 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#FDB913] mx-auto mb-1 sm:mb-2 md:mb-3" />
              <h3 className="text-[#FDB913] font-bold text-xs sm:text-base md:text-lg mb-0.5 sm:mb-1 md:mb-2">Entrega Rápida</h3>
              <p className="text-gray-200 text-[10px] sm:text-xs md:text-sm leading-tight">Atendimento ágil em Sorocaba e região</p>
            </div>
            <div className="bg-black/70 backdrop-blur-md border border-[#FDB913]/30 rounded-lg p-2 sm:p-4 md:p-6 hover:border-[#FDB913] hover:bg-black/80 transition-all duration-300">
              <Star className="w-6 h-6 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#FDB913] mx-auto mb-1 sm:mb-2 md:mb-3" />
              <h3 className="text-[#FDB913] font-bold text-xs sm:text-base md:text-lg mb-0.5 sm:mb-1 md:mb-2">Tudo Gelado</h3>
              <p className="text-gray-200 text-[10px] sm:text-xs md:text-sm leading-tight">Bebidas na temperatura ideal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => scrollToSection('products')}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[#FDB913] animate-bounce cursor-pointer hover:text-[#F5A623] transition-colors"
      >
        <ArrowDown className="w-8 h-8" />
      </button>
    </section>
  );
};

export default Hero;
