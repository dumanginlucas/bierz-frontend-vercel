import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { companyInfo } from '../mock';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      alert('Por favor, preencha pelo menos seu nome e telefone');
      return;
    }

    const message = `Olá! Meu nome é ${formData.name}.\n\nTelefone: ${formData.phone}${formData.email ? `\nEmail: ${formData.email}` : ''}\n\nMensagem: ${formData.message || 'Gostaria de mais informações sobre os produtos.'}`;
    
    window.open(`https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
    
    // Reset form
    setFormData({
      name: '',
      phone: '',
      email: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Entre em <span className="text-[#FDB913]">Contato</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Estamos prontos para atender você
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-[#FDB913]/20">
              <CardHeader>
                <CardTitle className="text-white">Informações de Contato</CardTitle>
                <CardDescription className="text-gray-400">
                  Entre em contato através de qualquer um dos canais abaixo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="bg-[#FDB913]/10 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-[#FDB913]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Telefone / WhatsApp</h3>
                    <a
                      href={`https://wa.me/${companyInfo.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FDB913] hover:text-[#F5A623] transition-colors"
                    >
                      {companyInfo.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="bg-[#FDB913]/10 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-[#FDB913]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">E-mail</h3>
                    <a
                      href={`mailto:${companyInfo.email}`}
                      className="text-[#FDB913] hover:text-[#F5A623] transition-colors"
                    >
                      {companyInfo.email}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="bg-[#FDB913]/10 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-[#FDB913]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Endereço</h3>
                    <p className="text-gray-300">{companyInfo.address}</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="bg-[#FDB913]/10 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-[#FDB913]" />
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

          {/* Contact Form */}
          <Card className="bg-white/5 backdrop-blur-sm border-[#FDB913]/20">
            <CardHeader>
              <CardTitle className="text-white">Solicite um Orçamento</CardTitle>
              <CardDescription className="text-gray-400">
                Preencha o formulário e entraremos em contato via WhatsApp
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">
                    Nome *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-white/10 border-[#FDB913]/30 text-white placeholder:text-gray-500 focus:border-[#FDB913]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-300">
                    Telefone *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="bg-white/10 border-[#FDB913]/30 text-white placeholder:text-gray-500 focus:border-[#FDB913]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">
                    E-mail (opcional)
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-white/10 border-[#FDB913]/30 text-white placeholder:text-gray-500 focus:border-[#FDB913]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-300">
                    Mensagem (opcional)
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Conte-nos sobre seu evento ou necessidades..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="bg-white/10 border-[#FDB913]/30 text-white placeholder:text-gray-500 focus:border-[#FDB913] resize-none"
                  />
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <p className="text-blue-300 text-sm flex items-start gap-2">
                    <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    Ao enviar, você será redirecionado para o WhatsApp com sua mensagem pré-preenchida.
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#FDB913] hover:bg-[#F5A623] text-black font-semibold text-lg py-6 transition-all duration-200"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Enviar via WhatsApp
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;