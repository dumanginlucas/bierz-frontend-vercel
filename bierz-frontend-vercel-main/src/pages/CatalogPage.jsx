import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, ShieldCheck, MessageCircle, ChevronRight, Download, Settings } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { catalogProducts } from '../data/catalogProducts';
import { companyInfo } from '../mock';
import Header from '../components/Header';
import Footer from '../components/Footer';

const brandImages = {
  Ashby: '/catalogo/Barril Ashby.png',
  Stell: '/catalogo/Barril Stell.png',
  Hockenheim: '/catalogo/Barril Hockenhein.png',
};

const equipmentInfo = {
  homebar: {
    name: 'HomeBar Premium',
    image: '/catalogo/homebar-aberta.png',
    desc: 'Barril refrigerado (0° a 3°C), espuma cremosa e sabor preservado por até 7 dias após a abertura.',
  },
  chopeira: {
    name: 'Chopeira Elétrica',
    image: '/chopeira-eletrica.png',
    desc: 'Ideal para eventos rápidos. Setup prático e extração direta com temperatura ideal.',
  },
};


const formatCurrency = (value) =>
  Number(value).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const scrollPageToTopNow = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
};

const loadImageAsDataUrl = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const CatalogPage = () => {
  const [selectedVariation, setSelectedVariation] = useState('pilsen');
  const [selectedEquipment, setSelectedEquipment] = useState('homebar');

  const whatsappLink = `https://wa.me/${companyInfo.whatsapp}?text=`;

  const orderedProducts = useMemo(() => {
    const priority = ['Ashby', 'Stell', 'Hockenheim'];
    const priorityMap = new Map(priority.map((brand, index) => [brand, index]));

    return [...catalogProducts].sort((a, b) => {
      const aRank = priorityMap.has(a.brand) ? priorityMap.get(a.brand) : 99;
      const bRank = priorityMap.has(b.brand) ? priorityMap.get(b.brand) : 99;
      if (aRank !== bRank) return aRank - bRank;
      return 0;
    });
  }, []);

  const getProductsByVariation = (brand, variation) => {
    const brandData = orderedProducts.find((item) => item.brand === brand);
    if (!brandData) return [];
    return brandData.variations.filter((item) => item.variationKey === variation);
  };

  const activeProducts = useMemo(() => {
    return orderedProducts.flatMap((brandGroup) =>
      getProductsByVariation(brandGroup.brand, selectedVariation).map((product) => ({
        brand: brandGroup.brand,
        ...product,
      }))
    );
  }, [orderedProducts, selectedVariation]);

  const handleDownloadPDF = async () => {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 12;
    const contentWidth = pageWidth - margin * 2;
    const logoData = await loadImageAsDataUrl('/logo.png');

    let pageNumber = 1;

    const drawHeader = () => {
      doc.setFillColor(7, 7, 7);
      doc.rect(0, 0, pageWidth, 34, 'F');

      doc.addImage(logoData, 'PNG', 12, 6, 16, 16);

      doc.setTextColor(245, 158, 11);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.text('CATÁLOGO PREMIUM', 34, 14);

      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text(`TIPO: ${selectedVariation.toUpperCase()}  •  EQUIPAMENTO: ${equipmentInfo[selectedEquipment].name.toUpperCase()}`, 34, 21);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(184, 184, 184);
      doc.text('Entrega, instalação e retirada inclusos em Sorocaba e região.', 34, 27);

      doc.setFillColor(245, 158, 11);
      doc.roundedRect(margin, 39, contentWidth, 8, 2, 2, 'F');
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.text('BIERZ • CHOPP GELADO • ATENDIMENTO PREMIUM', pageWidth / 2, 44.4, { align: 'center' });
    };

    const drawFooter = () => {
      doc.setDrawColor(38, 38, 38);
      doc.line(margin, pageHeight - 16, pageWidth - margin, pageHeight - 16);
      doc.setTextColor(140, 140, 140);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.text('Beba com moderação. Venda proibida para menores de 18 anos.', margin, pageHeight - 10);
      doc.text(`WhatsApp: ${companyInfo.phone} • bierz.com.br`, pageWidth - margin, pageHeight - 10, { align: 'right' });
      doc.text(`${pageNumber}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    };

    drawHeader();
    let y = 56;

    activeProducts.forEach((product, index) => {

      const cardHeight = 34;
      if (y + cardHeight > pageHeight - 24) {
        drawFooter();
        doc.addPage();
        pageNumber += 1;
        drawHeader();
        y = 56;
      }

      doc.setFillColor(13, 13, 13);
      doc.setDrawColor(38, 38, 38);
      doc.roundedRect(margin, y, contentWidth, cardHeight, 3, 3, 'FD');

      doc.setFillColor(245, 158, 11);
      doc.roundedRect(margin + 4, y + 4, 25, 7, 2, 2, 'F');
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.text(`${product.brand.toUpperCase()}`, margin + 16.5, y + 8.8, { align: 'center' });

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.text(product.style, margin + 34, y + 9);

      doc.setTextColor(165, 165, 165);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.2);
      const descriptionLines = doc.splitTextToSize(product.description, 92).slice(0, 3);
      doc.text(descriptionLines, margin + 34, y + 15);

      doc.setFillColor(20, 20, 20);
      doc.setDrawColor(55, 55, 55);
      doc.roundedRect(pageWidth - margin - 46, y + 4, 42, 9, 2, 2, 'FD');
      doc.setTextColor(245, 158, 11);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.text(`R$ ${formatCurrency(product.prices.perLiter)}/L`, pageWidth - margin - 25, y + 10, { align: 'center' });

      const statLabels = [
        { label: 'ABV', value: product.abv ? `${String(product.abv).replace('.', ',')}%` : '—' },
        { label: 'IBU', value: product.ibu ? `${product.ibu}` : '—' },
      ];

      statLabels.forEach((stat, statIndex) => {
        const statX = margin + 34 + statIndex * 24;
        doc.setFillColor(10, 10, 10);
        doc.setDrawColor(55, 55, 55);
        doc.roundedRect(statX, y + 25, 20, 7, 2, 2, 'FD');
        doc.setTextColor(245, 158, 11);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(6.8);
        doc.text(stat.label, statX + 4, y + 29.3);
        doc.setTextColor(255, 255, 255);
        doc.text(stat.value, statX + 16.2, y + 29.3, { align: 'right' });
      });

      const sizes = ['20L', '30L', '50L'];
      sizes.forEach((size, sizeIndex) => {
        const boxX = pageWidth - margin - 46 + sizeIndex * 14.1;
        const boxY = y + 17;
        doc.setFillColor(10, 10, 10);
        doc.setDrawColor(65, 65, 65);
        doc.roundedRect(boxX, boxY, 13, 11, 2, 2, 'FD');
        doc.setTextColor(245, 158, 11);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.text(size, boxX + 6.5, boxY + 4, { align: 'center' });
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(6.9);
        doc.text(`R$ ${formatCurrency(product.prices[size])}`, boxX + 6.5, boxY + 8.4, { align: 'center' });
      });

      y += cardHeight + 4;

      if (index === activeProducts.length - 1) {
        drawFooter();
      }
    });

    doc.save(`catalogo_bierz_${selectedVariation}.pdf`);
  };

  const getWhatsAppMessage = (productName) => {
    const text = `Olá! Gostaria de pedir o ${productName} (${selectedVariation.toUpperCase()}) com a ${equipmentInfo[selectedEquipment].name}.`;
    return whatsappLink + encodeURIComponent(text);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-amber-500/30">
      <Header />

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

      <section className="py-8 bg-zinc-900/10">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-6 bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
            <div className="flex-1 space-y-4 w-full">
              <div>
                <h2 className="text-lg font-bold text-white uppercase tracking-tight mb-1">Escolha seu Equipamento</h2>
                <p className="text-amber-500 text-[10px] font-bold uppercase tracking-widest">Frete, Instalação e Retirada Inclusos</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(equipmentInfo).map(([key, info]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedEquipment(key)}
                    className={`flex items-start gap-3 p-4 rounded-xl border transition-all text-left min-h-[108px] ${
                      selectedEquipment === key
                        ? 'bg-amber-500/10 border-amber-500 shadow-lg shadow-amber-500/5'
                        : 'bg-black/40 border-white/5 hover:border-white/10'
                    }`}
                  >
                    <div className={`mt-1 w-3 h-3 rounded-full border-2 flex items-center justify-center ${selectedEquipment === key ? 'border-amber-500' : 'border-zinc-700'}`}>
                      {selectedEquipment === key && <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />}
                    </div>
                    <div>
                      <h3 className={`font-bold text-lg uppercase leading-none ${selectedEquipment === key ? 'text-amber-500' : 'text-white'}`}>{info.name}</h3>
                      <p className="text-sm text-zinc-300 mt-3 leading-7 max-w-[34ch]">{info.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full md:w-[260px] lg:w-[300px] h-[260px] lg:h-[300px] bg-black/50 rounded-xl border border-white/5 flex items-center justify-center p-3 relative overflow-hidden">
              <div className="absolute inset-0 bg-amber-500/5 blur-2xl rounded-full opacity-40" />
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedEquipment}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.25 }}
                  src={equipmentInfo[selectedEquipment].image}
                  alt={equipmentInfo[selectedEquipment].name}
                  className={`relative z-10 drop-shadow-xl object-contain ${
                    selectedEquipment === 'homebar'
                      ? 'max-h-[95%] max-w-[95%] scale-[1.16]'
                      : 'max-h-[88%] max-w-[88%]'
                  }`}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <section className="py-4 sticky top-[var(--header-h,80px)] z-40 bg-[#0a0a0a]/90 backdrop-blur-lg border-b border-white/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex gap-1.5 p-1 bg-zinc-900 rounded-lg border border-white/5">
              {['pilsen', 'ipa', 'vinho'].map((variation) => (
                <button
                  key={variation}
                  onClick={() => setSelectedVariation(variation)}
                  className={`px-6 py-1.5 rounded-md font-bold text-[10px] uppercase tracking-widest transition-all ${
                    selectedVariation === variation ? 'bg-amber-500 text-black shadow-sm' : 'text-zinc-500 hover:text-zinc-200'
                  }`}
                >
                  {variation}
                </button>
              ))}
            </div>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest bg-white/5 px-4 py-2 rounded-lg border border-white/5"
            >
              <Download size={12} />
              Baixar PDF ({selectedVariation})
            </button>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {activeProducts.map((product, idx) => {
              return (
                <motion.div
                  key={`${product.brand}-${product.name}-${selectedVariation}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.03 }}
                  className="bg-zinc-900/20 border border-white/5 rounded-2xl overflow-hidden hover:border-amber-500/20 transition-all flex flex-col group"
                >
                  <div className="relative h-44 flex items-center justify-center p-6 bg-gradient-to-b from-zinc-900 to-black">
                    <img
                      src={product.image || brandImages[product.brand]}
                      alt={product.name}
                      className="h-full w-auto object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-5 flex-1 flex flex-col space-y-4">
                    <div>
                      <h3 className="text-3xl font-black text-white uppercase tracking-tight leading-none">{product.brand}</h3>
                      <p className="text-[11px] text-amber-500 font-bold uppercase tracking-[0.18em] mt-2">{product.style}</p>
                    </div>

                    <p className="text-[13px] text-zinc-300 leading-7 font-normal">{product.description}</p>

                    <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3">
                      <span className="text-[10px] uppercase tracking-[0.22em] text-amber-500 font-bold">Valor por litro</span>
                      <div className="mt-1 text-2xl font-black text-white">R$ {formatCurrency(product.prices.perLiter)}<span className="text-base text-zinc-400">/L</span></div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: 'ABV', value: product.abv ? `${String(product.abv).replace('.', ',')}%` : '—' },
                        { label: 'IBU', value: product.ibu ? `${product.ibu}` : '—' },
                      ].map((stat) => (
                        <div key={stat.label} className="bg-black/40 border border-white/5 p-3 rounded-xl text-center">
                          <span className="block text-sm font-black text-amber-500 uppercase leading-none">{stat.label}</span>
                          <span className="mt-2 block text-sm font-bold text-white">{stat.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {['20L', '30L', '50L'].map((size) => (
                        <div key={size} className="bg-black/40 border border-white/5 p-3 rounded-xl text-center">
                          <span className="block text-base font-black text-amber-500 uppercase leading-none">{size}</span>
                          <span className="mt-2 block text-sm font-bold text-white">R$ {formatCurrency(product.prices[size])}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 mt-auto">
                      <a
                        href={getWhatsAppMessage(product.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={scrollPageToTopNow}
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

      <section className="py-12 border-t border-white/5 bg-black/20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: <Truck className="mx-auto text-amber-500 w-5 h-5" />, title: 'Entrega e Coleta', desc: 'Logística completa inclusa no seu pedido.' },
              { icon: <Settings className="mx-auto text-amber-500 w-5 h-5" />, title: 'Instalação Técnica', desc: 'Equipe especializada para garantir o chopp perfeito.' },
              { icon: <ShieldCheck className="mx-auto text-amber-500 w-5 h-5" />, title: 'Qualidade Bierz', desc: 'Garantia de frescor e temperatura absoluta.' },
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
