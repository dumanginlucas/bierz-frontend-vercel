import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, ShieldCheck, MessageCircle, ChevronRight, Download, Settings } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { catalogProducts } from '../data/catalogProducts';
import { companyInfo } from '../mock';
import Header from '../components/Header';
import Footer from '../components/Footer';

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

const variationLabels = {
  pilsen: 'Pilsen',
  ipa: 'IPA',
  vinho: 'Vinho',
};

const orderByVariation = {
  pilsen: ['hockenheim-pilsen-puro-malte', 'stell-pilsen', 'hockenheim-pilsen', 'ashby-pilsen'],
  ipa: ['hockenheim-rota-77-american-ipa', 'ashby-nirvana-ipa', 'stell-ipa'],
  vinho: ['ashby-vinho', 'stell-vinho', 'hockenheim-vinho'],
};

const featuredByVariation = {
  pilsen: 'hockenheim-pilsen-puro-malte',
  ipa: 'hockenheim-rota-77-american-ipa',
  vinho: null,
};

const formatCurrency = (value) =>
  Number(value).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const formatAbv = (value) => (typeof value === 'number' ? `${value.toFixed(1).replace('.', ',')}% ABV` : 'ABV —');
const formatIbu = (value) => (typeof value === 'number' ? `${value} IBU` : 'IBU —');

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

  const filteredProducts = useMemo(() => {
    const featuredId = featuredByVariation[selectedVariation];

    const variationOrder = orderByVariation[selectedVariation] ?? [];

    return catalogProducts
      .filter((product) => product.category === selectedVariation)
      .sort((a, b) => {
        const aFeatured = a.id === featuredId ? 0 : 1;
        const bFeatured = b.id === featuredId ? 0 : 1;
        if (aFeatured !== bFeatured) return aFeatured - bFeatured;

        const aOrder = variationOrder.indexOf(a.id);
        const bOrder = variationOrder.indexOf(b.id);
        const aRank = aOrder === -1 ? 999 : aOrder;
        const bRank = bOrder === -1 ? 999 : bOrder;

        if (aRank !== bRank) return aRank - bRank;

        return a.name.localeCompare(b.name, 'pt-BR');
      });
  }, [selectedVariation]);

  const handleDownloadPDF = async () => {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 14;
    const contentWidth = pageWidth - margin * 2;
    const topLimit = 48;
    const bottomLimit = pageHeight - 18;

    const [logoData, ...productImages] = await Promise.all([
      loadImageAsDataUrl('/logo.png'),
      ...catalogProducts.map((product) =>
        loadImageAsDataUrl(product.image).catch(() => null)
      ),
    ]);

    const imageMap = new Map(catalogProducts.map((product, index) => [product.id, productImages[index]]));

    let pageNumber = 1;
    let y = topLimit;

    const sections = ['pilsen', 'ipa', 'vinho'].map((variation) => {
      const variationOrder = orderByVariation[variation] ?? [];
      return {
        key: variation,
        label: variationLabels[variation],
        products: catalogProducts
          .filter((product) => product.category === variation)
          .sort((a, b) => {
            const aOrder = variationOrder.indexOf(a.id);
            const bOrder = variationOrder.indexOf(b.id);
            const aRank = aOrder === -1 ? 999 : aOrder;
            const bRank = bOrder === -1 ? 999 : bOrder;
            if (aRank !== bRank) return aRank - bRank;
            return a.name.localeCompare(b.name, 'pt-BR');
          }),
      };
    });

    const drawHeader = () => {
      doc.setFillColor(255, 255, 255);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');

      doc.addImage(logoData, 'PNG', margin, 10, 14, 14);

      doc.setTextColor(22, 22, 22);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.text('CATÁLOGO DE CHOPP', margin + 19, 15);

      doc.setTextColor(196, 132, 18);
      doc.setFontSize(8.8);
      doc.text('PILSEN • IPA • VINHO', margin + 19, 20.2);

      doc.setTextColor(95, 95, 95);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.text(`Equipamento sugerido: ${equipmentInfo[selectedEquipment].name}`, margin + 19, 25.2);
      doc.text('Entrega, instalação e retirada inclusos em Sorocaba e região.', pageWidth - margin, 15.2, {
        align: 'right',
      });
      doc.text('Seleção premium com apresentação limpa e profissional.', pageWidth - margin, 20.2, {
        align: 'right',
      });

      doc.setDrawColor(222, 222, 222);
      doc.line(margin, 30, pageWidth - margin, 30);
    };

    const drawFooter = () => {
      doc.setDrawColor(228, 228, 228);
      doc.line(margin, pageHeight - 14, pageWidth - margin, pageHeight - 14);

      doc.setTextColor(110, 110, 110);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.4);
      doc.text('BIERZ DISTRIBUIDORA • Entrega • Instalação • Suporte', margin, pageHeight - 8.2);
      doc.text(`WhatsApp ${companyInfo.phone} • www.bierz.com.br`, pageWidth - margin, pageHeight - 8.2, {
        align: 'right',
      });
      doc.text(String(pageNumber), pageWidth / 2, pageHeight - 8.2, { align: 'center' });
    };

    const addNewPage = () => {
      drawFooter();
      doc.addPage();
      pageNumber += 1;
      drawHeader();
      y = topLimit;
    };

    const ensureSpace = (neededHeight) => {
      if (y + neededHeight > bottomLimit) {
        addNewPage();
      }
    };

    const drawSectionHeader = (title) => {
      ensureSpace(14);
      doc.setFillColor(250, 250, 250);
      doc.roundedRect(margin, y, contentWidth, 10, 2, 2, 'F');
      doc.setDrawColor(212, 162, 76);
      doc.setLineWidth(0.6);
      doc.line(margin, y + 10, pageWidth - margin, y + 10);
      doc.setTextColor(18, 18, 18);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.8);
      doc.text(title.toUpperCase(), margin + 3, y + 6.6);
      y += 14;
    };

    const drawProductRow = (product) => {
      const rowHeight = 34;
      ensureSpace(rowHeight + 4);

      const imageX = margin;
      const imageY = y + 1;
      const imageW = 22;
      const imageH = 28;
      const textX = imageX + imageW + 6;
      const priceBoxW = 33;
      const specsX = pageWidth - margin - priceBoxW;
      const contentRight = specsX - 5;
      const bodyWidth = contentRight - textX;

      doc.setDrawColor(232, 232, 232);
      doc.setLineWidth(0.4);
      doc.line(margin, y + rowHeight, pageWidth - margin, y + rowHeight);

      const imageData = imageMap.get(product.id);
      if (imageData) {
        doc.addImage(imageData, 'PNG', imageX, imageY, imageW, imageH, undefined, 'FAST');
      }

      doc.setTextColor(28, 28, 28);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11.5);
      doc.text(product.brand.toUpperCase(), textX, y + 7);

      doc.setTextColor(196, 132, 18);
      doc.setFontSize(8.8);
      doc.text(product.style.toUpperCase(), textX, y + 12.2);

      doc.setTextColor(78, 78, 78);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.6);
      doc.text(`${formatAbv(product.abv)} • ${formatIbu(product.ibu)}`, textX, y + 17.2);

      doc.setTextColor(92, 92, 92);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.7);
      const descriptionLines = doc.splitTextToSize(product.description, bodyWidth).slice(0, 3);
      doc.text(descriptionLines, textX, y + 22.2);

      doc.setFillColor(251, 248, 242);
      doc.roundedRect(specsX, y + 1.8, priceBoxW, 12, 2, 2, 'F');
      doc.setTextColor(196, 132, 18);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.9);
      doc.text('VALOR / LITRO', specsX + priceBoxW / 2, y + 6.1, { align: 'center' });
      doc.setTextColor(22, 22, 22);
      doc.setFontSize(10.5);
      doc.text(`R$ ${formatCurrency(product.prices.perLiter)}`, specsX + priceBoxW / 2, y + 10.6, { align: 'center' });

      const sizes = ['20L', '30L', '50L'];
      sizes.forEach((size, index) => {
        const x = specsX + index * 11.2;
        const boxW = 10.2;
        doc.setFillColor(255, 255, 255);
        doc.setDrawColor(224, 224, 224);
        doc.roundedRect(x, y + 18.2, boxW, 9.6, 1.6, 1.6, 'FD');
        doc.setTextColor(196, 132, 18);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(6.5);
        doc.text(size, x + boxW / 2, y + 21.7, { align: 'center' });
        doc.setTextColor(35, 35, 35);
        doc.setFontSize(5.9);
        doc.text(`R$ ${formatCurrency(product.prices[size])}`, x + boxW / 2, y + 25.6, { align: 'center' });
      });

      y += rowHeight + 3;
    };

    drawHeader();

    sections.forEach((section, sectionIndex) => {
      drawSectionHeader(section.label);
      section.products.forEach(drawProductRow);
      if (sectionIndex !== sections.length - 1) {
        y += 2;
      }
    });

    drawFooter();
    doc.save('catalogo_bierz_completo.pdf');
  };

  const getWhatsAppMessage = (productName) => {
    const text = `Olá! Gostaria de pedir o ${productName} (${variationLabels[selectedVariation].toUpperCase()}) com a ${equipmentInfo[selectedEquipment].name}.`;
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
                  {variationLabels[variation]}
                </button>
              ))}
            </div>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest bg-white/5 px-4 py-2 rounded-lg border border-white/5"
            >
              <Download size={12} />
              Baixar Catálogo
            </button>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {filteredProducts.map((product, idx) => {
              const isFeatured = featuredByVariation[selectedVariation] === product.id;

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.03 }}
                  className={`bg-zinc-900/20 border rounded-2xl overflow-hidden transition-all flex flex-col group ${
                    isFeatured ? 'border-amber-500/30 shadow-lg shadow-amber-500/5' : 'border-white/5 hover:border-amber-500/20'
                  }`}
                >
                  <div className="relative h-44 flex items-center justify-center p-6 bg-gradient-to-b from-zinc-900 to-black">
                    {isFeatured && (
                      <div className="absolute top-3 left-3 z-10 rounded-full bg-amber-500 text-black text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1">
                        Destaque
                      </div>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-auto object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-5 flex-1 flex flex-col space-y-4">
                    <div>
                      <h3 className="text-3xl font-black text-white uppercase tracking-tight leading-none">{product.brand}</h3>
                      <p className="text-[11px] text-amber-500 font-bold uppercase tracking-[0.18em] mt-2">{product.style}</p>
                      <p className="text-[11px] text-zinc-400 font-semibold uppercase tracking-[0.12em] mt-2">{formatAbv(product.abv)} • {formatIbu(product.ibu)}</p>
                    </div>

                    <p className="text-[13px] text-zinc-300 leading-7 font-normal">{product.description}</p>

                    <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3">
                      <span className="text-[10px] uppercase tracking-[0.22em] text-amber-500 font-bold">Valor por litro</span>
                      <div className="mt-1 text-2xl font-black text-white">R$ {formatCurrency(product.prices.perLiter)}<span className="text-base text-zinc-400">/L</span></div>
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
