import React from 'react';
import { Card, CardContent } from './ui/card';
import { Award, Truck, ThumbsUp, MapPin } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Award,
      title: 'Qualidade Garantida',
      description: 'Trabalhamos apenas com as melhores marcas do mercado'
    },
    {
      icon: Truck,
      title: 'Entrega Rápida',
      description: 'Atendimento ágil em toda região de Sorocaba'
    },
    {
      icon: ThumbsUp,
      title: 'Atendimento Personalizado',
      description: 'Equipe dedicada para atender suas necessidades'
    },
    {
      icon: MapPin,
      title: 'Localização Estratégica',
      description: 'Centro de Sorocaba, fácil acesso para todos'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Sobre a <span className="text-[#FDB913]">Bierz</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Sua distribuidora de confiança em Sorocaba
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#FDB913]">Quem Somos</h3>
              <p className="text-gray-300 leading-relaxed">
                A <span className="text-[#FDB913] font-semibold">Bierz</span> é uma distribuidora de Chopp e cervejas especiais voltada para a região de Sorocaba. 
                Trabalhamos com as melhores marcas do mercado para garantir a qualidade e satisfação dos nossos clientes.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Oferecemos uma ampla variedade de produtos, incluindo chopps artesanais, cervejas especiais, 
                gelo ensacado, energéticos e copos, tudo para tornar seu evento inesquecível.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#FDB913]">Nossa Missão</h3>
              <p className="text-gray-300 leading-relaxed">
                Proporcionar experiências únicas através de produtos de alta qualidade, 
                atendimento diferenciado e comprometimento com a satisfação dos nossos clientes.
              </p>
            </div>

            {/* Location Badge */}
            <Card className="bg-[#FDB913]/10 border-[#FDB913]/30">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-[#FDB913] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold mb-2">Localização</h4>
                    <p className="text-gray-300">Rua Professor Toledo, 665, Centro - Sorocaba/SP</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border-[#FDB913]/20 hover:border-[#FDB913] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FDB913]/20"
                >
                  <CardContent className="p-6 text-center">
                    <div className="bg-[#FDB913]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-[#FDB913]" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
