import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Phone, Instagram, MapPin, Clock } from 'lucide-react';
import { companyInfo } from '../mock';

const Contact = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`py-20 bg-gradient-to-b from-gray-900 to-black transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Entre em <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">Contato</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Estamos prontos para atender você
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className={`space-y-6 transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <Card className="bg-white/5 backdrop-blur-sm border-[#F59E0B]/20">
              <CardHeader>
                <CardTitle className="text-white">Informações de Contato</CardTitle>
                <CardDescription className="text-gray-400">
                  Entre em contato através de qualquer um dos canais abaixo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="bg-[#F59E0B]/10 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-[#F59E0B]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Telefone / WhatsApp</h3>
                    <a
                      href={`https://wa.me/${companyInfo.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#F59E0B] hover:text-[#F97316] transition-colors"
                    >
                      {companyInfo.phone}
                    </a>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-start gap-4">
                  <div className="bg-[#F59E0B]/10 p-3 rounded-lg">
                    <Instagram className="w-6 h-6 text-[#F59E0B]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Instagram</h3>
                    <a
                      href={companyInfo.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#F59E0B] hover:text-[#F97316] transition-colors"
                    >
                      {companyInfo.instagram}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="bg-[#F59E0B]/10 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-[#F59E0B]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Endereço</h3>
                    <p className="text-gray-300">{companyInfo.address}</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="bg-[#F59E0B]/10 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-[#F59E0B]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Horário de Atendimento</h3>
                    <p className="text-gray-300">{companyInfo.hours}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* WhatsApp CTA */}
            <Card className="bg-gradient-to-br from-green-600/20 to-green-700/20 border-green-500/30">
              <CardContent className="p-6 text-center">
                <Phone className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-white font-bold text-xl mb-2">Atendimento via WhatsApp</h3>
                <p className="text-gray-300 mb-4">Resposta rápida e atendimento personalizado</p>
                <Button
                  onClick={() => window.open(`https://wa.me/${companyInfo.whatsapp}`, '_blank')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Abrir WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Location Map */}
          <Card className={`bg-white/5 backdrop-blur-sm border-[#F59E0B]/20 transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <CardHeader>
              <CardTitle className="text-white">Nossa Localização</CardTitle>
              <CardDescription className="text-gray-400">
                Visite-nos em Sorocaba ou entre em contato para entrega
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden border border-[#F59E0B]/20 h-[400px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3717.1234567890!2d-47.4567!3d-23.5505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf5c5c5c5c5c5d%3A0x5c5c5c5c5c5c5c5c!2sRua%20Professor%20Toledo%2C%20665%20-%20Centro%2C%20Sorocaba%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1234567890123"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Endereço</h4>
                  <p className="text-gray-300 mb-3">{companyInfo.address}</p>
                  <Button
                    onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(companyInfo.address)}`, '_blank')}
                    className="w-full bg-[#F59E0B] hover:bg-[#F97316] text-black font-semibold transition-all duration-200"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Abrir no Google Maps
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
