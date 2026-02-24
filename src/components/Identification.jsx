import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowDown, Sparkles, Wine } from 'lucide-react';
import './Identification.css';
import { scrollToSection } from '../lib/scrollToSection';

const Identification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const go = (id) => scrollToSection(id, { navigate, location });

  return (
    <section id="identification" className="relative pt-32 pb-20 md:pt-40 md:pb-28 flex items-center justify-center overflow-hidden">
      {/* Background Image com overlay */}
      <div className="absolute inset-0 bg-black">
        <img
          src="/banner.jpg"
          alt="Bierz Banner"
          className="hidden sm:block w-full h-full object-cover object-top"
        />
        {/* Gradient overlay para melhor legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 sm:bg-black/50"></div>

        {/* Animated background orbs */}
        <div className="absolute top-0 left-1/4 w-48 h-48 bg-[#F59E0B]/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-[#F59E0B]/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Logo/Branding */}
          <div className={`text-center mb-6 md:mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <img
              src="/logo.png"
              alt="Bierz Logo"
              className="h-12 md:h-20 w-auto mx-auto mb-4 drop-shadow-2xl"
            />
          </div>

          {/* Main Title */}
          <div className={`text-center mb-4 md:mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-2xl leading-tight">
              Bierz
              <br />
              <span className="text-[#F59E0B]">Distribuidora</span>
            </h1>
          </div>

          {/* Highlights */}
          <div className={`flex flex-col sm:flex-row gap-3 md:gap-6 justify-center items-center mb-6 md:mb-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {/* Chopp Highlight */}
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md border border-[#F59E0B]/40 rounded-lg px-3 md:px-5 py-2 md:py-3 hover:border-[#F59E0B] hover:bg-black/70 transition-all duration-300 group">
              <Wine className="w-5 h-5 md:w-6 md:h-6 text-[#F59E0B]" />
              <span className="text-sm md:text-lg font-bold text-white">
                Chopp <span className="text-[#F59E0B]">Premium</span>
              </span>
            </div>

            {/* Cervejas Especiais Highlight */}
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md border border-[#F59E0B]/40 rounded-lg px-3 md:px-5 py-2 md:py-3 hover:border-[#F59E0B] hover:bg-black/70 transition-all duration-300 group">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-[#F59E0B]" />
              <span className="text-sm md:text-lg font-bold text-white">
                Cervejas <span className="text-[#F59E0B]">Especiais</span>
              </span>
            </div>
          </div>

          {/* Description */}
          <p className={`text-center text-sm md:text-lg text-gray-100 mb-10 md:mb-12 max-w-2xl mx-auto drop-shadow-lg transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            As melhores marcas de chopp e cerveja para seu evento. Qualidade, variedade e atendimento diferenciado em Sorocaba e região.
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <button
              onClick={() => go('how-it-works')}
              className="w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-black font-semibold text-sm md:text-base rounded-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-[#F59E0B]/50"
              style={{
                transform: 'translateY(0)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(245, 158, 11, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Como funciona
              </span>
            </button>

            <button
              onClick={() => go('products')}
              className="w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-black font-semibold text-sm md:text-base rounded-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-[#F59E0B]/50"
              style={{
                transform: 'translateY(0)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(245, 158, 11, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Ver Produtos
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => go('how-it-works')}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-[#F59E0B] animate-bounce cursor-pointer hover:text-[#F97316] transition-colors z-20"
      >
        <ArrowDown className="w-6 h-6 md:w-8 md:h-8" />
      </button>
    </section>
  );
};

export default Identification;
