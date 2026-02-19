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
    <section id="hero" className="relative min-h-[92svh] sm:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image (mobile + desktop) */}
      <div className="absolute inset-0 bg-black">
        <picture>
          <source srcSet="/banner.webp" type="image/webp" />
          <img
            src="/banner.jpg"
            alt="Bierz Background"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-[center_35%] sm:object-center"
          />
        </picture>
        {/* Overlay: mais forte no mobile (texto em cima da imagem) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black sm:from-black/60 sm:via-black/40 sm:to-black/40" />
        {/* Glow sutil (premium) */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full bg-[#F59E0B]/10 blur-3xl" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pt-28 pb-20 sm:py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* Mobile Banner Pill */}
          <div className="inline-flex items-center gap-2 rounded-full bg-black/55 backdrop-blur-md border border-white/10 px-3 py-1 text-[11px] sm:text-sm text-gray-100 mb-4 sm:mb-6">
            <span className="text-[#F59E0B] font-bold">Chopp</span>
            <span className="opacity-80">para eventos</span>
            <span className="opacity-40">•</span>
            <span className="opacity-90">Homebar premium</span>
          </div>

          {/* Tagline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6 animate-slide-up drop-shadow-2xl">
            Chopp gelado para seu evento
            <span className="text-[#F59E0B]"> em Sorocaba</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 mb-6 md:mb-8 max-w-2xl mx-auto animate-slide-up drop-shadow-lg px-2" style={{ animationDelay: '0.2s' }}>
            Escolha o chopp por litros (mínimo 20L) e receba tudo pronto para servir.
            Cervejas especiais e extras ficam como complemento.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 md:mb-12 animate-slide-up px-4" style={{ animationDelay: '0.4s' }}>
            <Button
              onClick={() => scrollToSection('products')}
              size="lg"
              className="bg-[#F59E0B] hover:bg-[#F97316] text-black font-bold text-sm sm:text-base md:text-lg px-6 sm:px-8 py-4 sm:py-6 shadow-lg hover:shadow-2xl w-full sm:w-auto
                transition-all duration-200
                hover:brightness-110
                hover:scale-105
                active:scale-[0.98]"
              data-testid="view-products-hero"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Ver Chopp e Litros
            </Button>
            <Button
              onClick={() => window.open('https://wa.me/5515988015195', '_blank')}
              size="lg"
              variant="outline"
              className="border-2 border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B] hover:text-black font-bold text-sm sm:text-base md:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto
                transition-all duration-200
                hover:scale-105
                active:scale-[0.98]"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              WhatsApp
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 max-w-3xl mx-auto animate-slide-up px-2" style={{ animationDelay: '0.6s' }}>
            <div className="bg-black/70 backdrop-blur-md border border-[#F59E0B]/30 rounded-lg p-2 sm:p-4 md:p-6 hover:border-[#F59E0B] hover:bg-black/80 transition-all duration-300">
              <Beer className="w-6 h-6 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#F59E0B] mx-auto mb-1 sm:mb-2 md:mb-3" />
              <h3 className="text-[#F59E0B] font-bold text-xs sm:text-base md:text-lg mb-0.5 sm:mb-1 md:mb-2">Variedade</h3>
              <p className="text-gray-200 text-[10px] sm:text-xs md:text-sm leading-tight">Chopp por litros + extras</p>
            </div>
            <div className="bg-black/70 backdrop-blur-md border border-[#F59E0B]/30 rounded-lg p-2 sm:p-4 md:p-6 hover:border-[#F59E0B] hover:bg-black/80 transition-all duration-300">
              <Zap className="w-6 h-6 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#F59E0B] mx-auto mb-1 sm:mb-2 md:mb-3" />
              <h3 className="text-[#F59E0B] font-bold text-xs sm:text-base md:text-lg mb-0.5 sm:mb-1 md:mb-2">Entrega Rápida</h3>
              <p className="text-gray-200 text-[10px] sm:text-xs md:text-sm leading-tight">Atendimento ágil em Sorocaba e região</p>
            </div>
            <div className="bg-black/70 backdrop-blur-md border border-[#F59E0B]/30 rounded-lg p-2 sm:p-4 md:p-6 hover:border-[#F59E0B] hover:bg-black/80 transition-all duration-300">
              <Star className="w-6 h-6 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#F59E0B] mx-auto mb-1 sm:mb-2 md:mb-3" />
              <h3 className="text-[#F59E0B] font-bold text-xs sm:text-base md:text-lg mb-0.5 sm:mb-1 md:mb-2">Pronto p/ servir</h3>
              <p className="text-gray-200 text-[10px] sm:text-xs md:text-sm leading-tight">Montagem e experiência premium</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => scrollToSection('products')}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[#F59E0B] animate-bounce cursor-pointer hover:text-[#F97316] transition-colors"
      >
        <ArrowDown className="w-8 h-8" />
      </button>
    </section>
  );
};

export default Hero;
