import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  CheckCircle2, 
  Truck, 
  PartyPopper, 
  Clock, 
  Snowflake, 
  Thermometer,
  Sparkles,
  Calendar,
  ArrowRight,
  Info,
  GitCompare,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Services = () => {
  const [selectedView, setSelectedView] = useState('homebar'); // 'conventional', 'homebar', 'comparison'
  const [currentSlide, setCurrentSlide] = useState(0);

  // Imagens do HomeBar para o carrossel (apenas HomeBar)
  const homebarImages = [
    {
      url: 'https://customer-assets.emergentagent.com/job_full-stack-deploy-38/artifacts/65568f34_D_NQ_NP_2X_993698-MLB100581419246_122025-F.webp',
      alt: 'HomeBar moderno com torneira',
      title: 'HomeBar em Evento'
    },
    {
      url: 'https://customer-assets.emergentagent.com/job_full-stack-deploy-38/artifacts/wlovzyvh_SaveClip.App_588356761_18015442988800944_3145914457951544553_n.png',
      alt: 'Chopeira dupla HomeBar',
      title: 'HomeBar Duplo'
    }
  ];

  // Imagens da Chopeira Convencional para o carrossel
  const conventionalImages = [
    {
      url: 'https://customer-assets.emergentagent.com/job_808be6ee-315b-4ff7-9d87-e7df67a25bf9/artifacts/zocyhgq6_ChatGPT%20Image%2017%20de%20fev.%20de%202026%2C%2021_20_24.png',
      alt: 'Chopeira Convencional com barril',
      title: 'Chopeira com Barril'
    },
    {
      url: 'https://customer-assets.emergentagent.com/job_full-stack-deploy-38/artifacts/ox30kitc_imagem_2026-02-17_202943222.png',
      alt: 'Chopeira Convencional dupla',
      title: 'Modelo Duplo'
    }
  ];

  // Obter as imagens corretas baseado na view selecionada
  const getCurrentImages = () => {
    return selectedView === 'homebar' ? homebarImages : conventionalImages;
  };

  // Reset do slide ao mudar de aba
  useEffect(() => {
    setCurrentSlide(0);
  }, [selectedView]);

  // Auto-play do carrossel para HomeBar e Convencional
  useEffect(() => {
    if (selectedView === 'comparison') return;
    
    const images = getCurrentImages();
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [selectedView]);

  const nextSlide = useCallback(() => {
    const images = getCurrentImages();
    setCurrentSlide((prev) => (prev + 1) % images.length);
  }, [selectedView]);

  const prevSlide = useCallback(() => {
    const images = getCurrentImages();
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  }, [selectedView]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const services = {
    conventional: {
      name: 'Chopeira Convencional',
      subtitle: 'Barril no Chão',
      image: 'https://customer-assets.emergentagent.com/job_full-stack-deploy-38/artifacts/ox30kitc_imagem_2026-02-17_202943222.png',
      description: 'Sistema elétrico tradicional, ideal para eventos outdoor e consumo rápido.',
      features: [
        'Barril em temperatura ambiente',
        'Refrigeração elétrica',
        'Ideal para eventos outdoor',
        'Setup rápido e simples'
      ]
    },
    homebar: {
      name: 'HomeBar',
      subtitle: 'Barril Gelado',
      image: 'https://customer-assets.emergentagent.com/job_full-stack-deploy-38/artifacts/wlovzyvh_SaveClip.App_588356761_18015442988800944_3145914457951544553_n.png',
      description: 'Sistema premium com refrigeração elétrica, mantém o chopp na temperatura ideal do início ao fim.',
      features: [
        'Barril refrigerado (0° a 3°C)',
        'Temperatura controlada',
        'Premium e elegante',
        'Máxima qualidade do chopp'
      ]
    }
  };

  const howItWorks = [
    {
      number: 1,
      title: 'Faça sua Reserva',
      description: 'Entre em contato e informe a data, horário e quantidade de chopp desejada. Cuidamos de todos os detalhes para você.',
      icon: Calendar,
      color: 'from-blue-500 to-blue-600'
    },
    {
      number: 2,
      title: 'Entrega e Instalação',
      description: 'Levamos a chopeira até sua casa ou evento, já instalada e pronta para uso. Praticidade e zero complicação.',
      icon: Truck,
      color: 'from-green-500 to-green-600'
    },
    {
      number: 3,
      title: 'Aproveite seu Evento',
      description: 'Chopp na temperatura ideal, com qualidade e experiência premium do primeiro ao último copo.',
      icon: PartyPopper,
      color: 'from-amber-500 to-orange-600'
    },
    {
      number: 4,
      title: 'Retirada Programada',
      description: 'No horário combinado, realizamos a retirada do equipamento. Você aproveita — nós cuidamos do restante.',
      icon: Clock,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const comparisonData = [
    {
      criteria: 'Apresentação no ambiente',
      conventional: 'Estrutura tradicional de chopeira',
      homebar: 'Visual mais elegante, integra melhor à decoração'
    },
    {
      criteria: 'Organização do espaço',
      conventional: 'Setup mais aparente (estrutura/barril conforme o evento)',
      homebar: 'Mais compacto, sem barris no chão à vista'
    },
    {
      criteria: 'Controle de temperatura',
      conventional: 'Varia conforme o setup e o ambiente',
      homebar: 'Refrigeração ativa com temperatura estável'
    },
    {
      criteria: 'Estilo de evento',
      conventional: 'Ótima opção para áreas externas e alto fluxo',
      homebar: 'Ideal para eventos indoor, áreas gourmet e ocasiões mais requintadas'
    },
    {
      criteria: 'Experiência de serviço',
      conventional: 'Clássica e eficiente',
      homebar: 'Experiência “bar” com presença premium'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-amber-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-orange-600 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold mb-4">
            Nossos Serviços
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Como Funciona Nosso <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">Serviço</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Oferecemos dois tipos de chopeira para garantir a melhor experiência no seu evento
          </p>
        </div>

        {/* How It Works - 4 Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {howItWorks.map((step) => (
            <Card key={step.number} className="bg-gradient-to-br from-white/5 to-white/[0.02] border-amber-500/20 hover:border-amber-500/50 transition-all group">
              <CardContent className="p-6">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold">
                    {step.number}
                  </Badge>
                  <h3 className="text-white font-bold text-lg">{step.title}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Service Selection Menu - Responsive with scroll */}
        <div className="w-full mb-8 overflow-x-auto scrollbar-hide">
          <div className="flex justify-center min-w-full px-4">
            <div className="inline-flex items-center bg-gray-900/90 backdrop-blur-sm rounded-lg p-1 gap-1">
              <button
                onClick={() => setSelectedView('conventional')}
                className={`
                  flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-md font-semibold text-xs sm:text-sm transition-all duration-300 whitespace-nowrap flex-shrink-0
                  ${selectedView === 'conventional' 
                    ? 'bg-[#F59E0B] text-black shadow-md' 
                    : 'text-gray-300 hover:text-gray-100'
                  }
                `}
              >
                <Thermometer className="w-4 h-4" />
                <span className="hidden sm:inline">Chopeira Convencional</span>
                <span className="sm:hidden">Elétrica</span>
              </button>
              
              <button
                onClick={() => setSelectedView('homebar')}
                className={`
                  flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-md font-semibold text-xs sm:text-sm transition-all duration-300 whitespace-nowrap flex-shrink-0
                  ${selectedView === 'homebar' 
                    ? 'bg-[#F59E0B] text-black shadow-md' 
                    : 'text-gray-300 hover:text-gray-100'
                  }
                `}
              >
                <Snowflake className="w-4 h-4" />
                <span className="hidden sm:inline">HomeBar (Premium)</span>
                <span className="sm:hidden">HomeBar</span>
              </button>

              <button
                onClick={() => setSelectedView('comparison')}
                className={`
                  flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-md font-semibold text-xs sm:text-sm transition-all duration-300 whitespace-nowrap flex-shrink-0
                  ${selectedView === 'comparison' 
                    ? 'bg-[#F59E0B] text-black shadow-md' 
                    : 'text-gray-300 hover:text-gray-100'
                  }
                `}
              >
                <GitCompare className="w-4 h-4" />
                Comparativo
              </button>
            </div>
          </div>
        </div>

        {/* Conditional Content Based on Selected View */}
        {selectedView !== 'comparison' ? (
          /* Service Display Card */
          <div className="max-w-6xl mx-auto">
            <Card className="bg-gradient-to-br from-white/10 to-white/[0.02] border-amber-500/30 overflow-hidden">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-0">
                {/* Image Side - Carrossel para ambos HomeBar e Convencional */}
                <div className="relative h-[400px] md:h-auto bg-gradient-to-br from-black to-gray-900 flex items-center justify-center p-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-600/10"></div>
                  
                  {/* Carrossel de Imagens */}
                  <div className="relative w-full h-full" data-testid={`${selectedView}-carousel`}>
                    {/* Imagens do carrossel */}
                    {getCurrentImages().map((image, index) => (
                      <img
                        key={index}
                        src={image.url}
                        alt={image.alt}
                        className={`absolute inset-0 w-full h-full object-contain drop-shadow-2xl transition-all duration-500 ${
                          index === currentSlide 
                            ? 'opacity-100 scale-100 z-10' 
                            : 'opacity-0 scale-105 z-0'
                        }`}
                      />
                    ))}
                    
                    {/* Botões de navegação */}
                    <button
                      onClick={prevSlide}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-amber-500 text-white hover:text-black p-2 rounded-full transition-all z-20"
                      data-testid="carousel-prev"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-amber-500 text-white hover:text-black p-2 rounded-full transition-all z-20"
                      data-testid="carousel-next"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Indicadores de pontos */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20" data-testid="carousel-dots">
                      {getCurrentImages().map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`h-2.5 rounded-full transition-all duration-300 ${
                            index === currentSlide 
                              ? 'bg-amber-500 w-8' 
                              : 'bg-gray-500 hover:bg-gray-400 w-2.5'
                          }`}
                          data-testid={`carousel-dot-${index}`}
                        />
                      ))}
                    </div>

                    {/* Badge do título da imagem atual */}
                    <Badge className="absolute top-4 left-4 bg-black/70 text-white font-medium z-20">
                      {getCurrentImages()[currentSlide]?.title}
                    </Badge>
                  </div>
                  
                  {selectedView === 'homebar' && (
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold z-20">
                      <Sparkles className="w-4 h-4 mr-1" />
                      Premium
                    </Badge>
                  )}
                </div>

                {/* Info Side */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <Badge className="w-fit bg-amber-500/20 text-amber-500 border border-amber-500/30 mb-3">
                    {services[selectedView].subtitle}
                  </Badge>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {services[selectedView].name}
                  </h3>
                  <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                    {services[selectedView].description}
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    {services[selectedView].features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className="w-full md:w-auto bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-bold text-lg shadow-lg shadow-orange-500/30"
                    size="lg"
                  >
                    Solicitar Orçamento
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          </div>
        ) : (
          /* Comparison View - Inline */
          <div className="max-w-7xl mx-auto">
            <Card className="bg-gradient-to-br from-white/10 to-white/[0.02] border-amber-500/30 overflow-hidden">
            <CardContent className="p-6 md:p-8">
              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent flex items-center gap-2">
                  <GitCompare className="w-8 h-8 text-amber-500" />
                  Comparativo de Chopeiras
                </h3>
              </div>
              {/* ✅ FIX: Scroll horizontal para tabela em mobile */}
              <div className="w-full overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                <table className="w-full border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b border-amber-500/30">
                      <th className="p-4 text-left text-amber-500 font-bold">Critério</th>
                      <th className="p-4 text-center bg-gradient-to-br from-gray-800/50 to-gray-900/50">
                        <div className="flex flex-col items-center gap-2">
                          <Thermometer className="w-6 h-6 text-gray-400" />
                          <span className="text-white font-bold">Chopeira Convencional</span>
                          <span className="text-xs text-gray-400">(Barril no Chão)</span>
                        </div>
                      </th>
                      <th className="p-4 text-center bg-gradient-to-br from-amber-500/10 to-orange-600/10">
                        <div className="flex flex-col items-center gap-2">
                          <Snowflake className="w-6 h-6 text-amber-500" />
                          <span className="text-white font-bold">HomeBar</span>
                          <span className="text-xs text-amber-500">(Barril Gelado)</span>
                          <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-black text-xs">
                            <Sparkles className="w-3 h-3 mr-1" />
                            Premium
                          </Badge>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, index) => (
                      <tr key={index} className="border-b border-gray-800 hover:bg-white/5 transition-colors">
                        <td className="p-4 font-semibold text-amber-500">{row.criteria}</td>
                        <td className="p-4 text-center text-gray-300 bg-gradient-to-br from-gray-800/30 to-gray-900/30">
                          {row.conventional}
                        </td>
                        <td className="p-4 text-center text-gray-300 bg-gradient-to-br from-amber-500/5 to-orange-600/5">
                          <div className="flex items-center justify-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span>{row.homebar}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-amber-500/10 to-orange-600/10 border border-amber-500/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-300">
                    <strong className="text-amber-500">Recomendação:</strong> A HomeBar é ideal para quem busca máxima qualidade e aproveitamento do chopp, perfeita para eventos que duram vários dias ou para quem quer garantir a melhor experiência do início ao fim.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
