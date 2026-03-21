import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, ShieldCheck, MessageCircle, ChevronRight, Download, Settings } from 'lucide-react';
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
      image: '/catalogo/homebar-aberta.png',
      imageClassName: 'max-h-[220px] md:max-h-[260px] scale-110 md:scale-[1.22]',
      desc: 'Barril refrigerado (0° a 3°C), espuma cremosa e sabor preservado por até 7 dias após a abertura.'
    },
    chopeira: {
      name: 'Chopeira Elétrica',
      image: '/chopeira-eletrica.png',
      imageClassName: 'max-h-[160px] md:max-h-[190px]',
      desc: 'Ideal para eventos rápidos. Setup prático e extração direta com temperatura ideal.'
    }
  };

  const orderedProducts = useMemo(() => {
    const priorityOrder = ['Ashby', 'Stell'];
    return [...catalogProducts].sort((a, b) => {
      const aIndex = priorityOrder.indexOf(a.brand);
      const bIndex = priorityOrder.indexOf(b.brand);

      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return 0;
    });
  }, []);

  const getProductByVariation = (brand, variation) => {
    const brandData = orderedProducts.find((item) => item.brand === brand);
    if (!brandData) return null;
    const variationMap = { pilsen: 0, ipa: 1, vinho: 2 };
    return brandData.variations[variationMap[variation]] || null;
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, 210, 40, 'F');

    doc.setTextColor(245, 158, 11);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('BIERZ - CATALOGO PREMIUM', 105, 20, { align: 'center' });

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`TIPO: ${selectedVariation.toUpperCase()} | EQUIPAMENTO: ${equipmentInfo[selectedEquipment].name.toUpperCase()}`, 105, 30, { align: 'center' });

    doc.setFillColor(245, 158, 11);
    doc.rect(10, 45, 190, 10, 'F');
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.text('INCLUSO: ENTREGA, INSTALACAO E RETIRADA DOS EQUIPAMENTOS EM SOROCABA E REGIAO', 105, 51.5, { align: 'center' });

    let y = 68;
    doc.setTextColor(0, 0, 0);

    orderedProducts.forEach((brandGroup) => {
      const product = getProductByVariation(brandGroup.brand, selectedVariation);
      if (!product) return;

      if (y > 245) {
        doc.addPage();
        y = 20;
      }

      doc.setDrawColor(225, 225, 225);
      doc.roundedRect(10, y - 5, 190, 38, 3, 3);

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(brandGroup.brand.toUpperCase(), 15, y + 5);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(120, 120, 120);
      doc.text(product.style.toUpperCase(), 15, y + 12);

      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');
      const splitDesc = doc.splitTextToSize(product.description, 125);
      doc.text(splitDesc.slice(0, 2), 15, y + 19);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text(`20L: R$ ${product.prices['20L']}`, 152, y + 7);
      doc.text(`30L: R$ ${product.prices['30L']}`, 152, y + 17);
      doc.text(`50L: R$ ${product.prices['50L']}`, 152, y + 27);

      y += 45;
    });

    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text('Beba com moderacao. Venda proibida para menores de 18 anos.', 105, 285, { align: 'center' });
    doc.text(`WhatsApp: ${companyInfo.phone} | bierz.com.br`, 105, 290, { align: 'center' });

    doc.save(`catalogo_bierz_${selectedVariation}.pdf`);
  };

  const getWhatsAppMessage = (productName) => {
    const text = `Olá! Gostaria de pedir o ${productName} (${selectedVariation.toUpperCase()}) com a ${equipmentInfo[selectedEquipment].name}.`;
    return whatsappLink + encodeURIComponent(text);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-amber-500/30">
      <Header />

      <section className="border-b border-white/5 bg-gradient-to-b from-black to-[#0a0a0a] pb-8 pt-28 text-center">
        <div className="container mx-auto max-w-5xl px-6">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 text-3xl font-bold uppercase tracking-tight text-white md:text-4xl"
          >
            Catálogo <span className="text-amber-500">Premium</span>
          </motion.h1>
          <p className="mx-auto max-w-2xl text-xs font-semibold uppercase tracking-wide text-zinc-400 md:text-sm">
            Entrega, instalação e retirada dos equipamentos! <br className="hidden md:block" />
            Escolha entre as melhores marcas de Chopp em Sorocaba e região!
          </p>
        </div>
      </section>

      <section className="bg-zinc-900/10 py-8">
        <div className="container mx-auto max-w-5xl px-6">
          <div className="flex flex-col items-center gap-6 rounded-2xl border border-white/5 bg-zinc-900/40 p-6 md:flex-row md:items-stretch">
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="mb-1 text-lg font-bold uppercase tracking-tight text-white">Escolha seu Equipamento</h2>
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500">Frete, Instalação e Retirada Inclusos</p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {Object.entries(equipmentInfo).map(([key, info]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedEquipment(key)}
                    className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                      selectedEquipment === key
                        ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/5'
                        : 'border-white/5 bg-black/40 hover:border-white/10'
                    }`}
                  >
                    <div className={`mt-1 flex h-4 w-4 items-center justify-center rounded-full border-2 ${selectedEquipment === key ? 'border-amber-500' : 'border-zinc-700'}`}>
                      {selectedEquipment === key && <div className="h-2 w-2 rounded-full bg-amber-500" />}
                    </div>
                    <div>
                      <h3 className={`text-sm font-bold uppercase ${selectedEquipment === key ? 'text-amber-500' : 'text-white'}`}>{info.name}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-zinc-400 md:text-[13px]">{info.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="relative flex h-[230px] w-full items-center justify-center rounded-xl border border-white/5 bg-black/40 p-4 md:h-auto md:w-56 lg:w-64">
              <div className="absolute inset-0 rounded-full bg-amber-500/5 blur-2xl opacity-40" />
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedEquipment}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  src={equipmentInfo[selectedEquipment].image}
                  alt={equipmentInfo[selectedEquipment].name}
                  className={`relative z-10 max-w-full object-contain drop-shadow-xl ${equipmentInfo[selectedEquipment].imageClassName}`}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <section className="sticky top-[var(--header-h,80px)] z-40 border-b border-white/5 bg-[#0a0a0a]/90 py-4 backdrop-blur-lg">
        <div className="container mx-auto max-w-5xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex gap-1.5 rounded-lg border border-white/5 bg-zinc-900 p-1">
              {['pilsen', 'ipa', 'vinho'].map((variation) => (
                <button
                  key={variation}
                  onClick={() => setSelectedVariation(variation)}
                  className={`rounded-md px-6 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-all ${
                    selectedVariation === variation
                      ? 'bg-amber-500 text-black shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-200'
                  }`}
                >
                  {variation}
                </button>
              ))}
            </div>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-300 transition-colors hover:text-white"
            >
              <Download size={12} />
              Baixar PDF ({selectedVariation})
            </button>
          </div>
        </div>
      </section>

      <main className="container mx-auto max-w-5xl px-6 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="wait">
            {orderedProducts.map((brandGroup, idx) => {
              const product = getProductByVariation(brandGroup.brand, selectedVariation);
              if (!product) return null;

              return (
                <motion.div
                  key={`${brandGroup.brand}-${selectedVariation}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.03 }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/20 transition-all hover:border-amber-500/20"
                >
                  <div className="relative flex h-44 items-center justify-center bg-gradient-to-b from-zinc-900 to-black p-6">
                    <img
                      src={brandImages[brandGroup.brand]}
                      alt={brandGroup.brand}
                      className="h-full w-auto object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col space-y-4 p-5">
                    <div>
                      <h3 className="text-lg font-black uppercase tracking-tight text-white">{brandGroup.brand}</h3>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-500">{product.style}</p>
                    </div>

                    <p className="text-[13px] leading-6 text-zinc-400">{product.description}</p>

                    <div className="grid grid-cols-3 gap-2">
                      {Object.entries(product.prices).map(([size, price]) => (
                        <div key={size} className="rounded-lg border border-white/5 bg-black/30 p-2 text-center">
                          <span className="block text-[13px] font-black uppercase tracking-wide text-zinc-200">{size}</span>
                          <span className="mt-1 block text-[14px] font-bold text-white">R$ {price}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto pt-2">
                      <a
                        href={getWhatsAppMessage(product.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-[10px] font-black uppercase tracking-widest text-black transition-all hover:bg-amber-500"
                      >
                        <MessageCircle size={14} />
                        Pedir no WhatsApp
                        <ChevronRight size={12} className="transition-transform group-hover/btn:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </main>

      <section className="border-t border-white/5 bg-black/20 py-12">
        <div className="container mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
            {[
              { icon: <Truck className="mx-auto h-5 w-5 text-amber-500" />, title: 'Entrega e Coleta', desc: 'Logística completa inclusa no seu pedido.' },
              { icon: <Settings className="mx-auto h-5 w-5 text-amber-500" />, title: 'Instalação Técnica', desc: 'Equipe especializada para garantir o chopp perfeito.' },
              { icon: <ShieldCheck className="mx-auto h-5 w-5 text-amber-500" />, title: 'Qualidade Bierz', desc: 'Garantia de frescor e temperatura absoluta.' }
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                {item.icon}
                <h4 className="text-xs font-bold uppercase tracking-widest text-white">{item.title}</h4>
                <p className="px-4 text-[10px] leading-relaxed text-zinc-500">{item.desc}</p>
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
