import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Users, Clock, Beer, Phone, Sparkles } from 'lucide-react';

const BeerCalculator = () => {
  const [people, setPeople] = useState(50);
  const [hours, setHours] = useState(4);
  const [consumption, setConsumption] = useState(450); // ml por pessoa/hora
  const [result, setResult] = useState(null);

  // Calcular automaticamente quando valores mudam
  useEffect(() => {
    calculateBeer();
  }, [people, hours, consumption]);

  const calculateBeer = () => {
    const totalMl = people * hours * consumption;
    const totalLiters = totalMl / 1000;
    
    const barrels30L = Math.ceil(totalLiters / 30);
    const barrels50L = Math.ceil(totalLiters / 50);

    setResult({
      totalLiters: totalLiters.toFixed(0),
      barrels30L,
      barrels50L
    });
  };

  const sendToWhatsApp = () => {
    if (!result) return;
    
    const message = `Olá! Calculei que preciso de aproximadamente ${result.totalLiters}L de chopp para ${people} pessoas durante ${hours} horas. Gostaria de solicitar um orçamento!`;
    window.open(`https://wa.me/5515988015195?text=${encodeURIComponent(message)}`, '_blank');
  };

  const consumptionOptions = [
    { value: 300, label: 'Leve', description: '300ml/h', subtitle: 'Confraternizações Empresariais' },
    { value: 450, label: 'Moderado', description: '450ml/h', subtitle: 'Festas e Aniversários' },
    { value: 600, label: 'Intenso', description: '600ml/h', subtitle: 'Grandes Eventos' }
  ];

  return (
    <section id="calculator" className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#F59E0B] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#F59E0B] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-full px-4 py-2 mb-4">
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              <span className="text-[#F59E0B] text-sm font-medium">Ferramenta Interativa</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="text-[#F59E0B]">Calculadora</span> de Chopp
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Descubra a quantidade perfeita de chopp para seu evento
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4">
              {/* People Slider */}
              <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-[#F59E0B]/20">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-[#F59E0B]" />
                      <span className="text-gray-300 font-medium">Pessoas</span>
                    </div>
                    <div className="bg-[#F59E0B] text-black font-bold text-lg px-3 py-0.5 rounded-full">
                      {people}
                    </div>
                  </div>
                  <Slider
                    value={[people]}
                    onValueChange={(value) => setPeople(value[0])}
                    min={10}
                    max={300}
                    step={5}
                    className="cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>10</span>
                    <span>150</span>
                    <span>300</span>
                  </div>
                </CardContent>
              </Card>

              {/* Hours Slider */}
              <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-[#F59E0B]/20">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-[#F59E0B]" />
                      <span className="text-gray-300 font-medium">Duração</span>
                    </div>
                    <div className="bg-[#F59E0B] text-black font-bold text-lg px-3 py-0.5 rounded-full">
                      {hours}h
                    </div>
                  </div>
                  <Slider
                    value={[hours]}
                    onValueChange={(value) => setHours(value[0])}
                    min={1}
                    max={10}
                    step={1}
                    className="cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1h</span>
                    <span>5h</span>
                    <span>10h</span>
                  </div>
                </CardContent>
              </Card>

              {/* Consumption Options - 3 buttons */}
              <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-[#F59E0B]/20">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Beer className="w-5 h-5 text-[#F59E0B]" />
                    <span className="text-gray-300 font-medium">Nível de Consumo</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {consumptionOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setConsumption(option.value)}
                        className={`p-3 rounded-lg border transition-all ${
                          consumption === option.value
                            ? 'bg-[#F59E0B] border-[#F59E0B] text-black'
                            : 'bg-white/5 border-white/10 text-gray-300 hover:border-[#F59E0B]/50'
                        }`}
                      >
                        <div className="font-semibold text-sm">{option.label}</div>
                        <div className={`text-xs ${consumption === option.value ? 'text-black/70' : 'text-gray-500'}`}>
                          {option.description}
                        </div>
                        <div className={`text-[10px] mt-1 ${consumption === option.value ? 'text-black/60' : 'text-gray-600'}`}>
                          {option.subtitle}
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Result */}
            <Card className="bg-gradient-to-br from-[#F59E0B]/10 to-[#F59E0B]/5 border-[#F59E0B]/30">
              <CardContent className="p-5 flex flex-col h-full">
                <div className="flex items-center gap-2 mb-4">
                  <Beer className="w-5 h-5 text-[#F59E0B]" />
                  <span className="text-white font-semibold">Resultado</span>
                </div>

                {result && (
                  <div className="flex-1 flex flex-col">
                    {/* Main Result */}
                    <div className="bg-black/30 rounded-xl p-5 text-center mb-4 border border-[#F59E0B]/20">
                      <p className="text-gray-400 text-sm mb-1">Total Recomendado</p>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-5xl font-bold text-[#F59E0B]">{result.totalLiters}</span>
                        <span className="text-xl text-[#F59E0B]/70">litros</span>
                      </div>
                    </div>

                    {/* Barrel Options */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-black/20 rounded-lg p-3 text-center border border-white/10">
                        <p className="text-gray-400 text-xs mb-1">Barris 30L</p>
                        <p className="text-2xl font-bold text-white">{result.barrels30L}</p>
                      </div>
                      <div className="bg-black/20 rounded-lg p-3 text-center border border-white/10">
                        <p className="text-gray-400 text-xs mb-1">Barris 50L</p>
                        <p className="text-2xl font-bold text-white">{result.barrels50L}</p>
                      </div>
                    </div>

                    {/* Event Summary */}
                    <div className="bg-white/5 rounded-lg p-3 mb-4 text-sm text-gray-300">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-[#F59E0B]" />
                          {people} pessoas
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#F59E0B]" />
                          {hours}h
                        </span>
                        <span className="flex items-center gap-1">
                          <Beer className="w-3 h-3 text-[#F59E0B]" />
                          {consumption}ml/h
                        </span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Button
                      onClick={sendToWhatsApp}
                      className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-5 text-base transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Solicitar Orçamento
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeerCalculator;
