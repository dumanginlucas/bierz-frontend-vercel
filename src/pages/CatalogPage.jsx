import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, ShieldCheck, MessageCircle, ChevronRight, Download, Settings } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { catalogProducts } from '../data/catalogProducts';
import { companyInfo } from '../mock';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LITER_PRICES = {
  Ashby: 12.9,
  Stell: 12.9,
  Itaipava: 15.9,
  Brahma: 17.9,
  Heineken: 19.9,
  Amstel: 16.9,
};

const VARIATION_LABELS = {
  pilsen: 'Pilsen',
  ipa: 'IPA',
  vinho: 'Chopp de Vinho',
};

const BRAND_PRIORITY = ['Ashby', 'Stell'];
const KEG_SIZES = [20, 30, 50];

const CatalogPage = () => {
  const [selectedVariation, setSelectedVariation] = useState('pilsen');
  const [selectedEquipment, setSelectedEquipment] = useState('homebar');

  const whatsappLink = `https://wa.me/${companyInfo.whatsapp}?text=`;

  const brandImages = {
    Itaipava: '/catalogo/Barril Itaipava.png',
    Amstel: '/catalogo/Barril Amstel.png',
    Ashby: '/catalogo/Barril Ashby.png',
    Brahma: '/catalogo/Barril Brahma.png',
    Stell: '/catalogo/Barril Stell.png',
    Heineken: '/catalogo/Barril Heineken.png',
  };

  const equipmentInfo = {
    homebar: {
      name: 'HomeBar Premium',
      image: '/catalogo/HomeBar.png',
      desc: 'Barril refrigerado (0° a 3°C), espuma cremosa e sabor preservado por até 7 dias após a abertura.'
    },
    chopeira: {
      name: 'Chopeira Elétrica',
      image: '/chopeira-eletrica.png',
      desc: 'Ideal para eventos rápidos. Setup prático e extração direta com temperatura ideal.'
    }
  };

  const getVariationIndex = (variation) => ({ pilsen: 0, ipa: 1, vinho: 2 }[variation] ?? 0);

  const getPricePerLiter = (brand, variation) => {
    const basePrice = LITER_PRICES[brand] ?? 0;
    if (variation === 'ipa') return basePrice + 5;
    if (variation === 'vinho') return basePrice + 4;
    return basePrice;
  };

  const formatBRL = (value) => value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const getPricesBySize = (brand, variation) => {
    const pricePerLiter = getPricePerLiter(brand, variation);
    return KEG_SIZES.reduce((acc, liters) => {
      acc[`${liters}L`] = formatBRL(pricePerLiter * liters);
      return acc;
    }, {});
  };

  const sortedCatalogProducts = useMemo(() => {
    return [...catalogProducts].sort((a, b) => {
      const aIndex = BRAND_PRIORITY.indexOf(a.brand);
      const bIndex = BRAND_PRIORITY.indexOf(b.brand);
      const aPriority = aIndex === -1 ? 999 : aIndex;
      const bPriority = bIndex === -1 ? 999 : bIndex;
      if (aPriority !== bPriority) return aPriority - bPriority;
      return a.brand.localeCompare(b.brand, 'pt-BR');
    });
  }, []);

  const getProductByVariation = (brand, variation) => {
    const brandData = sortedCatalogProducts.find((b) => b.brand === brand);
    if (!brandData) return null;

    const baseProduct = brandData.variations[getVariationIndex(variation)];
    if (!baseProduct) return null;

    return {
      ...baseProduct,
      prices: getPricesBySize(brand, variation),
      pricePerLiter: getPricePerLiter(brand, variation),
      variationLabel: VARIATION_LABELS[variation],
    };
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, 210, 38, 'F');

    doc.setTextColor(245, 158, 11);
    doc.setFontSize(21);
    doc.setFont('helvetica', 'bold');
    doc.text('BIERZ - CATÁLOGO PREMIUM', 105, 17, { align: 'center' });

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`TIPO: ${VARIATION_LABELS[selectedVariation].toUpperCase()} | EQUIPAMENTO: ${equipmentInfo[selectedEquipment].name.toUpperCase()}`, 105, 27, { align: 'center' });
    doc.text('ENTREGA, INSTALAÇÃO E RETIRADA INCLUSAS', 105, 33, { align: 'center' });

    doc.setFillColor(245, 158, 11);
    doc.rect(10, 44, 190, 10, 'F');
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('SOROCABA E REGIÃO | ATENDIMENTO PREMIUM BIERZ', 105, 50.5, { align: 'center' });

    let y = 66;

    sortedCatalogProducts.forEach((brandGroup) => {
      const product = getProductByVariation(brandGroup.brand, selectedVariation);
      if (!product) return;

      if (y > 240) {
        doc.addPage();
        y = 20;
      }

      doc.setDrawColor(228, 228, 228);
      doc.roundedRect(10, y - 4, 190, 38, 3, 3);

      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(15);
      doc.text(brandGroup.brand.toUpperCase(), 15, y + 4);

      doc.setTextColor(120, 120, 120);
      doc.setFontSize(10);
      doc.text(product.style, 15, y + 11);

      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      const splitDesc = doc.splitTextToSize(product.description, 120);
      doc.text(splitDesc.slice(0, 2), 15, y + 18);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text(`R$ ${formatBRL(product.pricePerLiter)}/L`, 148, y + 5);

      doc.setFontSize(13);
      doc.text('20L', 145, y + 15);
      doc.text(`R$ ${product.prices['20L']}`, 160, y + 15);
      doc.text('30L', 145, y + 23);
      doc.text(`R$ ${product.prices['30L']}`, 160, y + 23);
      doc.text('50L', 145, y + 31);
      doc.text(`R$ ${product.prices['50L']}`, 160, y + 31);

      y += 45;
    });

    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text('Beba com moderação. Venda proibida para menores de 18 anos.', 105, 285, { align: 'center' });
    doc.text(`WhatsApp: ${companyInfo.phone} | bierz.com.br`, 105, 290, { align: 'center' });

    doc.save(`catalogo_bierz_${selectedVariation}.pdf`);
  };

  const getWhatsAppMessage = (productName) => {
    const text = `Olá! Gostaria de pedir o ${productName} (${VARIATION_LABELS[selectedVariation]}) com a ${equipmentInfo[selectedEquipment].name}.`;
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
          <p className="text-zinc-400 text-sm md:text-base max-w-2xl mx-auto font-semibold uppercase tracking-wide leading-relaxed">
            Entrega, instalação e retirada dos equipamentos! <br className="hidden md:block" />
            Escolha entre as melhores marcas de chopp em Sorocaba e região.
          </p>
        </div>
      </section>

      <section className="py-8 bg-zinc-900/10">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-6 bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-lg font-bold text-white uppercase tracking-tight mb-1">Escolha seu Equipamento</h2>
                <p className="text-amber-500 text-xs font-bold uppercase tracking-widest">Frete, Instalação e Retirada Inclusos</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(equipmentInfo).map(([key, info]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedEquipment(key)}
                    className={`flex items-start gap-3 p-4 rounded-xl border transition-all text-left ${
                      selectedEquipment === key
                        ? 'bg-amber-500/10 border-amber-500 shadow-lg shadow-amber-500/5'
                        : 'bg-black/40 border-white/5 hover:border-white/10'
                    }`}
                  >
                    <div className={`mt-1 w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${selectedEquipment === key ? 'border-amber-500' : 'border-zinc-700'}`}>
                      {selectedEquipment === key && <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />}
                    </div>
                    <div>
                      <h3 className={`font-bold text-sm uppercase ${selectedEquipment === key ? 'text-amber-500' : 'text-white'}`}>{info.name}</h3>
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{info.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full md:w-52 h-52 bg-black/40 rounded-xl border border-white/5 flex items-center justify-center p-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-amber-500/5 blur-2xl rounded-full opacity-40" />
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedEquipment}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  src={equipmentInfo[selectedEquipment].image}
                  alt={selectedEquipment}
                  className={`relative z-10 drop-shadow-xl object-contain ${selectedEquipment === 'chopeira' ? 'h-full w-full scale-[1.06]' : 'max-h-full max-w-full'}`}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <section className="py-4 sticky top-[var(--header-h,80px)] z-40 bg-[#0a0a0a]/90 backdrop-blur-lg border-b border-white/5">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex gap-1.5 p-1 bg-zinc-900 rounded-lg border border-white/5">
              {['pilsen', 'ipa', 'vinho'].map((v) => (
                <button
                  key={v}
                  onClick={() => setSelectedVariation(v)}
                  className={`px-6 py-2 rounded-md font-bold text-xs uppercase tracking-widest transition-all ${
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
              className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest bg-white/5 px-4 py-2 rounded-lg border border-white/5"
            >
              <Download size={13} />
              Baixar PDF ({VARIATION_LABELS[selectedVariation]})
            </button>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-6 py-8 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {sortedCatalogProducts.map((brandGroup, idx) => {
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
                  <div className="relative h-44 flex items-center justify-center p-6 bg-gradient-to-b from-zinc-900 to-black overflow-hidden">
                    <img
                      src={brandImages[brandGroup.brand]}
                      alt={brandGroup.brand}
                      className="h-full w-auto object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-5 flex-1 flex flex-col space-y-4">
                    <div>
                      <h3 className="text-xl font-black text-white uppercase tracking-tight">{brandGroup.brand}</h3>
                      <div className="mt-1 flex items-center justify-between gap-3 flex-wrap">
                        <p className="text-xs text-amber-500 font-bold uppercase tracking-[0.15em]">{product.style}</p>
                        <span className="text-sm font-black text-white">R$ {formatBRL(product.pricePerLiter)}/L</span>
                      </div>
                    </div>

                    <p className="text-sm text-zinc-400 leading-relaxed font-normal min-h-[84px]">
                      {product.description}
                    </p>

                    <div className="grid grid-cols-3 gap-2">
                      {Object.entries(product.prices).map(([size, price]) => (
                        <div key={size} className="bg-black/30 border border-white/5 p-2.5 rounded-xl text-center">
                          <span className="block text-[1.05rem] leading-none text-amber-400 font-black uppercase">{size}</span>
                          <span className="mt-1 block text-xs font-semibold text-zinc-400">Barril</span>
                          <span className="mt-2 block text-sm font-bold text-white">R$ {price}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 mt-auto">
                      <a
                        href={getWhatsAppMessage(product.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 bg-white text-black font-black py-3 rounded-xl hover:bg-amber-500 transition-all text-xs uppercase tracking-widest group/btn"
                      >
                        <MessageCircle size={15} />
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
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: <Truck className="mx-auto text-amber-500 w-5 h-5" />, title: 'Entrega e Coleta', desc: 'Logística completa inclusa no seu pedido.' },
              { icon: <Settings className="mx-auto text-amber-500 w-5 h-5" />, title: 'Instalação Técnica', desc: 'Equipe especializada para garantir o chopp perfeito.' },
              { icon: <ShieldCheck className="mx-auto text-amber-500 w-5 h-5" />, title: 'Qualidade Bierz', desc: 'Garantia de frescor e temperatura absoluta.' }
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
