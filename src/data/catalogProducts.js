const basePricesPerLiter = {
  Ashby: 12.9,
  Stell: 12.9,
  Itaipava: 15.9,
  Brahma: 17.9,
  Heineken: 19.9,
  Amstel: 16.9,
};

const variationAdditions = {
  pilsen: 0,
  ipa: 5,
  vinho: 4,
};

const calculatePrices = (brand, variation) => {
  const perLiter = basePricesPerLiter[brand] + variationAdditions[variation];
  return {
    '20L': Number((perLiter * 20).toFixed(2)),
    '30L': Number((perLiter * 30).toFixed(2)),
    '50L': Number((perLiter * 50).toFixed(2)),
    perLiter: Number(perLiter.toFixed(2)),
  };
};

export const catalogProducts = [
  {
    brand: 'Ashby',
    variations: [
      {
        name: 'Chopp Ashby Pilsen',
        style: 'Pilsen Premium',
        description:
          'Referência em qualidade artesanal, o Chopp Ashby Pilsen é puro malte e apresenta uma coloração dourada profunda. Seu aroma remete a cereais e pão fresco, com um equilíbrio magistral entre o doce do malte e o amargor do lúpulo.',
        prices: calculatePrices('Ashby', 'pilsen'),
        image: '/catalogo/barril-ashby.png',
      },
      {
        name: 'Chopp Ashby IPA',
        style: 'English IPA',
        description:
          'Inspirada na tradição britânica, esta IPA apresenta notas terrosas e herbais. O uso de maltes especiais confere uma cor acobreada e um corpo robusto que sustenta o amargor assertivo.',
        prices: calculatePrices('Ashby', 'ipa'),
        image: '/catalogo/barril-ashby.png',
      },
      {
        name: 'Chopp Ashby de Vinho',
        style: 'Draft Wine',
        description:
          'Uma experiência sensorial diferenciada que une a tradição da cervejaria com a vivacidade do vinho. Aromas de frutas vermelhas e uma doçura equilibrada definem esta variação premium.',
        prices: calculatePrices('Ashby', 'vinho'),
        image: '/catalogo/barril-ashby.png',
      },
    ],
  },
  {
    brand: 'Stell',
    variations: [
      {
        name: 'Chopp Stell Pilsen',
        style: 'Premium Lager',
        description:
          'Pureza e sofisticação definem o Chopp Stell. Elaborado com maltes selecionados e água de extrema pureza, resulta em uma bebida cristalina, com aroma floral sutil e uma elegância ímpar no paladar.',
        prices: calculatePrices('Stell', 'pilsen'),
        image: '/catalogo/barril-stell.png',
      },
      {
        name: 'Chopp Stell IPA',
        style: 'New England IPA',
        description:
          'Uma explosão tropical e turva. Esta NEIPA foca no aroma e sabor dos lúpulos, com amargor baixo e uma textura sedosa, remetendo a suco de frutas amarelas.',
        prices: calculatePrices('Stell', 'ipa'),
        image: '/catalogo/barril-stell.png',
      },
      {
        name: 'Chopp Stell de Vinho',
        style: 'Gourmet Wine Beer',
        description:
          'A máxima expressão da união entre malte e uva. Com um processo de maturação diferenciado, este chopp apresenta notas complexas de frutas escuras e uma acidez refrescante.',
        prices: calculatePrices('Stell', 'vinho'),
        image: '/catalogo/barril-stell.png',
      },
    ],
  },
  {
    brand: 'Itaipava',
    variations: [
      {
        name: 'Chopp Itaipava Pilsen',
        style: 'American Standard Lager',
        description:
          'Clássico e equilibrado, o Chopp Itaipava Pilsen destaca-se pela sua leveza e refrescância incomparável. De coloração dourada brilhante e espuma persistente, apresenta notas suaves de malte e um amargor finíssimo, ideal para momentos de celebração.',
        prices: calculatePrices('Itaipava', 'pilsen'),
        image: '/catalogo/barril-itaipava.png',
      },
      {
        name: 'Chopp Itaipava IPA',
        style: 'Session IPA',
        description:
          'Uma reinterpretação moderna com foco na refrescância. Esta Session IPA traz um bouquet aromático de lúpulos cítricos, remetendo a frutas tropicais, com um amargor presente porém limpo e equilibrado.',
        prices: calculatePrices('Itaipava', 'ipa'),
        image: '/catalogo/barril-itaipava.png',
      },
      {
        name: 'Chopp Itaipava de Vinho',
        style: 'Grape Lager',
        description:
          'A união perfeita entre o frescor do chopp e a elegância das uvas selecionadas. De cor rubi vibrante e aroma frutado intenso, oferece um paladar adocicado e refrescante, com final levemente frisante.',
        prices: calculatePrices('Itaipava', 'vinho'),
        image: '/catalogo/barril-itaipava.png',
      },
    ],
  },
  {
    brand: 'Brahma',
    variations: [
      {
        name: 'Chopp Brahma Pilsen',
        style: 'Standard American Lager',
        description:
          'O chopp número 1 dos brasileiros. Reconhecido pela sua cremosidade e frescor absoluto, o Chopp Brahma é não pasteurizado, mantendo as características sensoriais de uma bebida recém-servida.',
        prices: calculatePrices('Brahma', 'pilsen'),
        image: '/catalogo/barril-brahma.png',
      },
      {
        name: 'Chopp Brahma IPA',
        style: 'Session IPA',
        description:
          'Leveza e aroma em perfeita harmonia. Esta variação traz o DNA da Brahma com um toque extra de lúpulos aromáticos, proporcionando notas cítricas e um final limpo.',
        prices: calculatePrices('Brahma', 'ipa'),
        image: '/catalogo/barril-brahma.png',
      },
      {
        name: 'Chopp Brahma de Vinho',
        style: 'Grape Lager',
        description:
          'A clássica qualidade Brahma com o sabor envolvente do vinho. Uma bebida equilibrada, de cor intensa e paladar aveludado, feita para agradar aos paladares mais exigentes.',
        prices: calculatePrices('Brahma', 'vinho'),
        image: '/catalogo/barril-brahma.png',
      },
    ],
  },
  {
    brand: 'Heineken',
    variations: [
      {
        name: 'Chopp Heineken Pilsen',
        style: 'International Premium Lager',
        description:
          'Mundialmente famosa pela sua consistência e sabor único. O Chopp Heineken é produzido com a exclusiva Levedura A, garantindo notas frutadas sutis e o amargor característico que conquistou o mundo.',
        prices: calculatePrices('Heineken', 'pilsen'),
        image: '/catalogo/barril-heineken.png',
      },
      {
        name: 'Chopp Heineken IPA',
        style: 'American IPA',
        description:
          'A interpretação da Heineken para o estilo IPA. Mantendo o rigor de qualidade, apresenta um perfil lupulado intenso, com notas de pinho e grapefruit, e um amargor limpo e persistente.',
        prices: calculatePrices('Heineken', 'ipa'),
        image: '/catalogo/barril-heineken.png',
      },
      {
        name: 'Chopp Heineken de Vinho',
        style: 'Premium Grape Beer',
        description:
          'Inovação e tradição se encontram. Uma bebida de cor rubi profunda, que combina a base equilibrada da Heineken com a complexidade aromática de uvas nobres selecionadas.',
        prices: calculatePrices('Heineken', 'vinho'),
        image: '/catalogo/barril-heineken.png',
      },
    ],
  },
  {
    brand: 'Amstel',
    variations: [
      {
        name: 'Chopp Amstel Pilsen',
        style: 'European Lager',
        description:
          'Nascido em Amsterdam, o Chopp Amstel Pilsen carrega a tradição europeia em cada gole. Produzido com ingredientes 100% naturais, entrega um sabor maltado rico e um acabamento seco e refrescante.',
        prices: calculatePrices('Amstel', 'pilsen'),
        image: '/catalogo/barril-amstel.png',
      },
      {
        name: 'Chopp Amstel IPA',
        style: 'American IPA',
        description:
          'Uma explosão de lúpulos americanos que conferem aromas resinosos e de maracujá. Possui corpo médio e um amargor característico que persiste agradavelmente no paladar.',
        prices: calculatePrices('Amstel', 'ipa'),
        image: '/catalogo/barril-amstel.png',
      },
      {
        name: 'Chopp Amstel de Vinho',
        style: 'Grape Beer',
        description:
          'Sofisticação e frescor em uma combinação única. O Chopp Amstel de Vinho equilibra a base maltada com a acidez equilibrada das uvas, resultando em uma bebida extremamente fácil de beber.',
        prices: calculatePrices('Amstel', 'vinho'),
        image: '/catalogo/barril-amstel.png',
      },
    ],
  },
];
