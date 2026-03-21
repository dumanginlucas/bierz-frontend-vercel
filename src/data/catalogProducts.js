const KEG_SIZES = [20, 30, 50];

const BASE_PRICE_PER_LITER = {
  Ashby: 12.9,
  Stell: 12.9,
  Itaipava: 15.9,
  Brahma: 17.9,
  Heineken: 19.9,
  Amstel: 16.9,
};

const TYPE_EXTRA_PER_LITER = {
  pilsen: 0,
  ipa: 5,
  vinho: 4,
};

const buildPrices = (brand, variation) => {
  const perLiter = BASE_PRICE_PER_LITER[brand] + TYPE_EXTRA_PER_LITER[variation];
  return KEG_SIZES.reduce((acc, liters) => {
    acc[`${liters}L`] = (perLiter * liters).toFixed(2).replace('.', ',');
    return acc;
  }, {});
};

export const catalogProducts = [
  {
    brand: "Ashby",
    variations: [
      {
        name: "Chopp Ashby Pilsen",
        style: "Pilsen Premium",
        description: "Referência em qualidade artesanal, o Chopp Ashby Pilsen é puro malte e apresenta uma coloração dourada profunda. Seu aroma remete a cereais e pão fresco, com equilíbrio entre o doce do malte e o amargor do lúpulo.",
        consumption: "Ideal para quem busca uma experiência premium em eventos corporativos e sociais.",
        abv: "4.8%",
        ibu: "14",
        prices: buildPrices("Ashby", "pilsen"),
        image: "/catalogo/barril-ashby.png"
      },
      {
        name: "Chopp Ashby IPA",
        style: "English IPA",
        description: "Inspirada na tradição britânica, esta IPA apresenta notas terrosas e herbais. O uso de maltes especiais confere cor acobreada e corpo robusto, sustentando um amargor mais marcante.",
        consumption: "Combina com queijos fortes e carnes intensas.",
        abv: "5.8%",
        ibu: "45",
        prices: buildPrices("Ashby", "ipa"),
        image: "/catalogo/barril-ashby.png"
      },
      {
        name: "Chopp Ashby de Vinho",
        style: "Draft Wine",
        description: "Uma experiência sensorial diferenciada, com notas de frutas vermelhas, doçura equilibrada e final refrescante, ideal para eventos com proposta mais sofisticada.",
        consumption: "Perfeito para casamentos e festas especiais.",
        abv: "6.0%",
        ibu: "7",
        prices: buildPrices("Ashby", "vinho"),
        image: "/catalogo/barril-ashby.png"
      }
    ]
  },
  {
    brand: "Stell",
    variations: [
      {
        name: "Chopp Stell Pilsen",
        style: "Premium Lager",
        description: "Pureza e sofisticação definem o Chopp Stell. Elaborado com maltes selecionados, resulta em uma bebida cristalina, com aroma floral sutil e excelente refrescância.",
        consumption: "Ideal para eventos de luxo e jantares harmonizados.",
        abv: "5.0%",
        ibu: "18",
        prices: buildPrices("Stell", "pilsen"),
        image: "/catalogo/barril-stell.png"
      },
      {
        name: "Chopp Stell IPA",
        style: "New England IPA",
        description: "Uma IPA com perfil tropical e textura sedosa, destacando aroma e sabor dos lúpulos com amargor equilibrado e final prolongado.",
        consumption: "Perfeito para apreciadores de cervejas artesanais complexas.",
        abv: "6.5%",
        ibu: "40",
        prices: buildPrices("Stell", "ipa"),
        image: "/catalogo/barril-stell.png"
      },
      {
        name: "Chopp Stell de Vinho",
        style: "Gourmet Wine Beer",
        description: "A união entre malte e uva em uma versão mais refinada, com notas de frutas escuras, acidez refrescante e ótimo equilíbrio no paladar.",
        consumption: "Ideal para momentos gastronômicos refinados.",
        abv: "6.2%",
        ibu: "12",
        prices: buildPrices("Stell", "vinho"),
        image: "/catalogo/barril-stell.png"
      }
    ]
  },
  {
    brand: "Itaipava",
    variations: [
      {
        name: "Chopp Itaipava Pilsen",
        style: "American Standard Lager",
        description: "Clássico e equilibrado, o Chopp Itaipava Pilsen destaca-se pela leveza, refrescância e coloração dourada brilhante, com espuma persistente e amargor suave.",
        consumption: "Ideal para churrascos, grandes eventos e dias ensolarados.",
        abv: "4.5%",
        ibu: "12",
        prices: buildPrices("Itaipava", "pilsen"),
        image: "/catalogo/barril-itaipava.png"
      },
      {
        name: "Chopp Itaipava IPA",
        style: "Session IPA",
        description: "Uma releitura mais aromática, com notas cítricas e tropicais, amargor limpo e ótima refrescância para quem busca algo mais intenso sem perder leveza.",
        consumption: "Perfeito para hambúrgueres artesanais e petiscos condimentados.",
        abv: "4.8%",
        ibu: "35",
        prices: buildPrices("Itaipava", "ipa"),
        image: "/catalogo/barril-itaipava.png"
      },
      {
        name: "Chopp Itaipava de Vinho",
        style: "Grape Lager",
        description: "A união do frescor do chopp com a elegância das uvas selecionadas, com cor rubi vibrante, aroma frutado e paladar levemente adocicado.",
        consumption: "Ideal para recepções, festas e momentos de descontração.",
        abv: "5.2%",
        ibu: "8",
        prices: buildPrices("Itaipava", "vinho"),
        image: "/catalogo/barril-itaipava.png"
      }
    ]
  },
  {
    brand: "Brahma",
    variations: [
      {
        name: "Chopp Brahma Pilsen",
        style: "Standard American Lager",
        description: "O clássico brasileiro reconhecido pela cremosidade e frescor absoluto. Um chope leve, fácil de beber e muito versátil para eventos de todos os tamanhos.",
        consumption: "Indispensável em churrascos e confraternizações.",
        abv: "4.8%",
        ibu: "10",
        prices: buildPrices("Brahma", "pilsen"),
        image: "/catalogo/barril-brahma.png"
      },
      {
        name: "Chopp Brahma IPA",
        style: "Session IPA",
        description: "Leveza e aroma em perfeita harmonia, trazendo o DNA da Brahma com um toque extra de lúpulos aromáticos, notas cítricas e final limpo.",
        consumption: "Ideal para quem quer iniciar no mundo das IPAs.",
        abv: "4.6%",
        ibu: "30",
        prices: buildPrices("Brahma", "ipa"),
        image: "/catalogo/barril-brahma.png"
      },
      {
        name: "Chopp Brahma de Vinho",
        style: "Grape Lager",
        description: "A clássica qualidade Brahma combinada com o sabor envolvente do vinho, em uma bebida equilibrada, de cor intensa e paladar aveludado.",
        consumption: "Excelente para festas temáticas e eventos de final de ano.",
        abv: "5.0%",
        ibu: "9",
        prices: buildPrices("Brahma", "vinho"),
        image: "/catalogo/barril-brahma.png"
      }
    ]
  },
  {
    brand: "Heineken",
    variations: [
      {
        name: "Chopp Heineken Pilsen",
        style: "International Premium Lager",
        description: "Mundialmente famosa pela consistência e sabor único, a Heineken entrega notas frutadas sutis, amargor característico e acabamento refinado.",
        consumption: "A escolha premium para eventos de alto padrão e fãs da marca.",
        abv: "5.0%",
        ibu: "19",
        prices: buildPrices("Heineken", "pilsen"),
        image: "/catalogo/barril-heineken.png"
      },
      {
        name: "Chopp Heineken IPA",
        style: "American IPA",
        description: "A interpretação da Heineken para o estilo IPA, com perfil lupulado intenso, notas de pinho e grapefruit e amargor limpo e persistente.",
        consumption: "Ideal para quem busca intensidade e qualidade global.",
        abv: "6.2%",
        ibu: "55",
        prices: buildPrices("Heineken", "ipa"),
        image: "/catalogo/barril-heineken.png"
      },
      {
        name: "Chopp Heineken de Vinho",
        style: "Premium Grape Beer",
        description: "Uma bebida de cor rubi profunda, que combina a base equilibrada da Heineken com a complexidade aromática de uvas nobres selecionadas.",
        consumption: "Perfeito para celebrações exclusivas e momentos memoráveis.",
        abv: "5.8%",
        ibu: "11",
        prices: buildPrices("Heineken", "vinho"),
        image: "/catalogo/barril-heineken.png"
      }
    ]
  },
  {
    brand: "Amstel",
    variations: [
      {
        name: "Chopp Amstel Pilsen",
        style: "European Lager",
        description: "Nascido em Amsterdam, o Chopp Amstel Pilsen carrega tradição europeia, sabor maltado rico e acabamento seco e refrescante.",
        consumption: "Harmoniza perfeitamente com reuniões de amigos e petiscos de boteco.",
        abv: "4.7%",
        ibu: "15",
        prices: buildPrices("Amstel", "pilsen"),
        image: "/catalogo/barril-amstel.png"
      },
      {
        name: "Chopp Amstel IPA",
        style: "American IPA",
        description: "Uma explosão de lúpulos americanos com aromas resinosos e tropicais, corpo médio e amargor característico que permanece agradavelmente no paladar.",
        consumption: "Ideal para pratos picantes e carnes grelhadas.",
        abv: "6.0%",
        ibu: "50",
        prices: buildPrices("Amstel", "ipa"),
        image: "/catalogo/barril-amstel.png"
      },
      {
        name: "Chopp Amstel de Vinho",
        style: "Grape Beer",
        description: "Sofisticação e frescor em uma combinação única, equilibrando base maltada com a acidez das uvas em uma bebida fácil de beber.",
        consumption: "Excelente escolha para eventos noturnos e celebrações especiais.",
        abv: "5.5%",
        ibu: "10",
        prices: buildPrices("Amstel", "vinho"),
        image: "/catalogo/barril-amstel.png"
      }
    ]
  }
];
