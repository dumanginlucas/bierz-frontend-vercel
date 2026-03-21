import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Beer, Truck, Clock, ShieldCheck, MessageCircle, ChevronRight, Download, Settings } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { catalogProducts } from '../data/catalogProducts';
import { companyInfo } from '../mock';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CatalogPage = () => {
  const [selectedVariation, setSelectedVariation] = useState('pilsen');
  const [selectedEquipment, setSelectedEquipment] = useState('homebar');
  
  const whatsappLink = `https://wa.me/${companyInfo.whatsapp}?text=`;

  const brandImages = {
    'Itaipava': '/catalogo/Barril Itaipava.png',
    'Amstel': '/catalogo/Barril Amstel.png',
    'Ashby': '/catalogo/Barril Ashby.png',
    'Brahma': '/catalogo/Barril Brahma.png',
    'Stell': '/catalogo/Barril Stell.png',
    'Heineken': '/catalogo/Barril Heineken.png',
  };

  const equipmentInfo = {
    homebar: {
      name: 'HomeBar Premium',
      image: '/catalogo/HomeBar.png',
      desc: 'Barril refrigerado (0° a 3°C), espuma cremosa e sabor preservado por até 30 dias.'
    },
    chopeira: {
      name: 'Chopeira Elétrica',
      image: '/catalogo/Chopeira Elétrica.png',
      desc: 'Ideal para eventos rápidos. Setup prático e extração direta com temperatura ideal.'
    }
  };

  const getProductByVariation = (brand, variation) => {
    const brandData = catalogProducts.find(b => b.brand === brand);
    if (!brandData) return null;
    const variationMap = { 'pilsen': 0, 'ipa': 1, 'vinho': 2 };
    return brandData.variations[variationMap[variation]] || null;
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Header do PDF - Estilo Bierz
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(245, 158, 11); // Amber-500
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("BIERZ - CATALOGO PREMIUM", 105, 20, { align: "center" });
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`TIPO: ${selectedVariation.toUpperCase()} | EQUIPAMENTO: ${equipmentInfo[selectedEquipment].name.toUpperCase()}`, 105, 30, { align: "center" });

    // Informação de Entrega em destaque
    doc.setFillColor(245, 158, 11);
    doc.rect(10, 45, 190, 10, 'F');
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text("INCLUSO: ENTREGA, INSTALACAO E RETIRADA DOS EQUIPAMENTOS EM SOROCABA E REGIAO", 105, 51.5, { align: "center" });

    let y = 70;
    doc.setTextColor(0, 0, 0);
    
    catalogProducts.forEach((brandGroup, index) => {
      const product = getProductByVariation(brandGroup.brand, selectedVariation);
      if (product) {
        if (y > 250) { doc.addPage(); y = 20; }
        
        // Card Background sutil
        doc.setDrawColor(230, 230, 230);
        doc.rect(10, y - 5, 190, 35);
        
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text(`${brandGroup.brand.toUpperCase()}`, 15, y + 5);
        
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(100, 100, 100);
        doc.text(`${product.style}`, 15, y + 12);
        
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "normal");
        const splitDesc = doc.splitTextToSize(product.description, 130);
        doc.text(splitDesc.slice(0, 2), 15, y + 20); // Máximo 2 linhas
        
        // Preços no lado direito do card
        doc.setFont("helvetica", "bold");
        doc.text(`20L: R$ ${product.prices['20L']}`, 155, y + 5);
        doc.text(`30L: R$ ${product.prices['30L']}`, 155, y + 15);
        doc.text(`50L: R$ ${product.prices['50L']}`, 155, y + 25);
        
        y += 45;
      }
    });

    // Footer do PDF
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text("Beba com moderacao. Venda proibida para menores de 18 anos.", 105, 285, { align: "center" });
    doc.text(`WhatsApp: ${companyInfo.phone} | bierz.com.br`, 105, 290, { align: "center" });
    
    doc.save(`catalogo_bierz_${selectedVariation}.pdf`);
  };

  const getWhatsAppMessage = (productName) => {
    const text = `Olá! Gostaria de pedir o ${productName} (${selectedVariation.toUpperCase()}) com a ${equipmentInfo[selectedEquipment].name}.`;
    return whatsappLink + encodeURIComponent(text);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-amber-500/30">
      <Header />
      
      {/* Hero Section Minimalista - Espaço Reduzido */}
      <section className="pt-28 pb-8 text-center border-b border-white/5 bg-gradient-to-b from-black to-[#0a0a0a]">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-white uppercase mb-3"
          >
            Catálogo <span className="text-amber-500">Premium</span>
          </motion.h1>
          <p className="text-zinc-400 text-xs md:text-sm max-w-2xl mx-auto font-semibold uppercase tracking-wide">
            Entrega, instalação e retirada dos equipamentos! <br className="hidden md:block" />
            Escolha entre as melhores marcas de Chopp em Sorocaba e região!
          </p>
        </div>
      </section>

      {/* Seção de Escolha de Equipamento - Espaço Reduzido */}
      <section className="py-8 bg-zinc-900/10">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-6 bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-lg font-bold text-white uppercase tracking-tight mb-1">Escolha seu Equipamento</h2>
                <p className="text-amber-500 text-[10px] font-bold uppercase tracking-widest">Frete, Instalação e Retirada Inclusos</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(equipmentInfo).map(([key, info]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedEquipment(key)}
                    className={`flex items-start gap-3 p-3 rounded-xl border transition-all text-left ${
                      selectedEquipment === key 
                        ? 'bg-amber-500/10 border-amber-500 shadow-lg shadow-amber-500/5' 
                        : 'bg-black/40 border-white/5 hover:border-white/10'
                    }`}
                  >
                    <div className={`mt-1 w-3 h-3 rounded-full border-2 flex items-center justify-center ${selectedEquipment === key ? 'border-amber-500' : 'border-zinc-700'}`}>
                      {selectedEquipment === key && <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />}
                    </div>
                    <div>
                      <h3 className={`font-bold text-[11px] uppercase ${selectedEquipment === key ? 'text-amber-500' : 'text-white'}`}>{info.name}</h3>
                      <p className="text-[9px] text-zinc-500 mt-0.5 leading-relaxed line-clamp-2">{info.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="w-full md:w-48 h-48 bg-black/40 rounded-xl border border-white/5 flex items-center justify-center p-4 relative">
              <div className="absolute inset-0 bg-amber-500/5 blur-2xl rounded-full opacity-40" />
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedEquipment}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  src={equipmentInfo[selectedEquipment].image}
                  alt={selectedEquipment}
                  className="max-h-full max-w-full object-contain relative z-10 drop-shadow-xl"
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Seletor de Variação - Espaço Reduzido */}
      <section className="py-4 sticky top-[var(--header-h,80px)] z-40 bg-[#0a0a0a]/90 backdrop-blur-lg border-b border-white/5">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex gap-1.5 p-1 bg-zinc-900 rounded-lg border border-white/5">
              {['pilsen', 'ipa', 'vinho'].map(v => (
                <button
                  key={v}
                  onClick={() => setSelectedVariation(v)}
                  className={`px-6 py-1.5 rounded-md font-bold text-[10px] uppercase tracking-widest transition-all ${
                    selectedVariation === v 
                      ? 'bg-amber-500 text-black shadow-sm' 
                      : 'text-zinc-500 hover:text-zinc-200'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest bg-white/5 px-4 py-2 rounded-lg border border-white/5"
            >
              <Download size={12} />
              Baixar PDF ({selectedVariation})
            </button>
          </div>
        </div>
      </section>

      {/* Grid de Produtos - Espaço Reduzido */}
      <main className="container mx-auto px-6 py-8 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {catalogProducts.map((brandGroup, idx) => {
              const product = getProductByVariation(brandGroup.brand, selectedVariation);
              if (!product) return null;

              return (
                <motion.div
                  key={`${brandGroup.brand}-${selectedVariation}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.03 }}
                  className="bg-zinc-900/20 border border-white/5 rounded-2xl overflow-hidden hover:border-amber-500/20 transition-all flex flex-col group"
                >
                  <div className="relative h-40 flex items-center justify-center p-6 bg-gradient-to-b from-zinc-900 to-black">
                    <img 
                      src={brandImages[brandGroup.brand]} 
                      alt={brandGroup.brand}
                      className="h-full w-auto object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-5 flex-1 flex flex-col space-y-4">
                    <div>
                      <h3 className="text-lg font-black text-white uppercase tracking-tight">{brandGroup.brand}</h3>
                      <p className="text-[9px] text-amber-500 font-bold uppercase tracking-[0.15em] mt-0.5">{product.style}</p>
                    </div>

                    <p className="text-[11px] text-zinc-500 leading-relaxed font-normal">
                      {product.description}
                    </p>

                    <div className="grid grid-cols-3 gap-1.5">
                      {Object.entries(product.prices).map(([size, price]) => (
                        <div key={size} className="bg-black/30 border border-white/5 p-1.5 rounded-lg text-center">
                          <span className="block text-[7px] text-zinc-600 font-bold uppercase">{size}</span>
                          <span className="text-[10px] font-bold text-white">R$ {price}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 mt-auto">
                      <a 
                        href={getWhatsAppMessage(product.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 bg-white text-black font-black py-3 rounded-xl hover:bg-amber-500 transition-all text-[10px] uppercase tracking-widest group/btn"
                      >
                        <MessageCircle size={14} />
                        Pedir no WhatsApp
                        <ChevronRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </main>

      {/* Banner de Confiança - Espaço Reduzido */}
      <section className="py-12 border-t border-white/5 bg-black/20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: <Truck className="mx-auto text-amber-500 w-5 h-5" />, title: "Entrega e Coleta", desc: "Logística completa inclusa no seu pedido." },
              { icon: <Settings className="mx-auto text-amber-500 w-5 h-5" />, title: "Instalação Técnica", desc: "Equipe especializada para garantir o chopp perfeito." },
              { icon: <ShieldCheck className="mx-auto text-amber-500 w-5 h-5" />, title: "Qualidade Bierz", desc: "Garantia de frescor e temperatura absoluta." }
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                {item.icon}
                <h4 className="text-xs font-bold text-white uppercase tracking-widest">{item.title}</h4>
                <p className="text-[10px] text-zinc-500 leading-relaxed px-4">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CatalogPage;
