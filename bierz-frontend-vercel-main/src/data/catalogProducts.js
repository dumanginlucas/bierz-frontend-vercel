const calculatePricesFromPerLiter = (perLiter) => ({
  '20L': Number((perLiter * 20).toFixed(2)),
  '30L': Number((perLiter * 30).toFixed(2)),
  '50L': Number((perLiter * 50).toFixed(2)),
  perLiter: Number(perLiter.toFixed(2)),
});

export const catalogProducts = [
  {
    brand: 'Ashby',
    variations: [
      {
        variationKey: 'pilsen',
        name: 'Chopp Ashby Pilsen',
        style: 'Pilsen Premium',
        description:
          'Referência em qualidade artesanal, o Chopp Ashby Pilsen é puro malte e apresenta uma coloração dourada profunda. Seu aroma remete a cereais e pão fresco, com um equilíbrio magistral entre o doce do malte e o amargor do lúpulo.',
        prices: calculatePricesFromPerLiter(12.9),
        image: '/catalogo/barril-ashby.png',
        abv: null,
        ibu: null,
      },
      {
        variationKey: 'ipa',
        name: 'Chopp Ashby IPA',
        style: 'English IPA',
        description:
          'Inspirada na tradição britânica, esta IPA apresenta notas terrosas e herbais. O uso de maltes especiais confere uma cor acobreada e um corpo robusto que sustenta o amargor assertivo.',
        prices: calculatePricesFromPerLiter(17.9),
        image: '/catalogo/barril-ashby.png',
        abv: null,
        ibu: null,
      },
      {
        variationKey: 'vinho',
        name: 'Chopp Ashby de Vinho',
        style: 'Draft Wine',
        description:
          'Uma experiência sensorial diferenciada que une a tradição da cervejaria com a vivacidade do vinho. Aromas de frutas vermelhas e uma doçura equilibrada definem esta variação premium.',
        prices: calculatePricesFromPerLiter(16.9),
        image: '/catalogo/barril-ashby.png',
        abv: null,
        ibu: null,
      },
    ],
  },
  {
    brand: 'Stell',
    variations: [
      {
        variationKey: 'pilsen',
        name: 'Chopp Stell Pilsen',
        style: 'Premium Lager',
        description:
          'Pureza e sofisticação definem o Chopp Stell. Elaborado com maltes selecionados e água de extrema pureza, resulta em uma bebida cristalina, com aroma floral sutil e uma elegância ímpar no paladar.',
        prices: calculatePricesFromPerLiter(12.9),
        image: '/catalogo/barril-stell.png',
        abv: null,
        ibu: null,
      },
      {
        variationKey: 'ipa',
        name: 'Chopp Stell IPA',
        style: 'New England IPA',
        description:
          'Uma explosão tropical e turva. Esta NEIPA foca no aroma e sabor dos lúpulos, com amargor baixo e uma textura sedosa, remetendo a suco de frutas amarelas.',
        prices: calculatePricesFromPerLiter(17.9),
        image: '/catalogo/barril-stell.png',
        abv: null,
        ibu: null,
      },
      {
        variationKey: 'vinho',
        name: 'Chopp Stell de Vinho',
        style: 'Gourmet Wine Beer',
        description:
          'A máxima expressão da união entre malte e uva. Com um processo de maturação diferenciado, este chopp apresenta notas complexas de frutas escuras e uma acidez refrescante.',
        prices: calculatePricesFromPerLiter(16.9),
        image: '/catalogo/barril-stell.png',
        abv: null,
        ibu: null,
      },
    ],
  },
  {
    brand: 'Hockenheim',
    variations: [
      {
        variationKey: 'pilsen',
        name: 'Chopp Hockenheim Pilsen',
        style: 'Pilsen',
        description:
          'Leve, refrescante e equilibrado, o Chopp Hockenheim Pilsen entrega excelente drinkability com perfil maltado limpo e final suave, ideal para churrascos, confraternizações e eventos.',
        prices: calculatePricesFromPerLiter(12.9),
        image: '/catalogo/Barril Hockenhein.png',
        abv: null,
        ibu: null,
      },
      {
        variationKey: 'pilsen',
        name: 'Chopp Hockenheim Pilsen Puro Malte',
        style: 'Pilsen Puro Malte',
        description:
          'Versão puro malte da Hockenheim, com corpo mais presente, espuma cremosa e perfil mais marcante, mantendo alta refrescância para servir extremamente gelado no evento.',
        prices: calculatePricesFromPerLiter(14.9),
        image: '/catalogo/Pilsen Puro Malte Hockenhein.png',
        abv: null,
        ibu: null,
      },
      {
        variationKey: 'ipa',
        name: 'Chopp Hockenheim Session IPA',
        style: 'Session IPA',
        description:
          'A Hockenheim Session IPA combina alta refrescância com notas cítricas e lupuladas em equilíbrio, trazendo amargor presente na medida certa e excelente facilidade de beber.',
        prices: calculatePricesFromPerLiter(17.9),
        image: '/catalogo/Barril Hockenhein.png',
        abv: 4.7,
        ibu: 35,
      },
      {
        variationKey: 'vinho',
        name: 'Chopp Hockenheim de Vinho',
        style: 'Chopp de Vinho',
        description:
          'Uma opção diferenciada para quem busca sabor mais frutado e marcante. O Chopp de Vinho Hockenheim oferece perfil adocicado equilibrado e ótima presença em eventos.',
        prices: calculatePricesFromPerLiter(17.9),
        image: '/catalogo/Barril Hockenhein.png',
        abv: null,
        ibu: null,
      },
    ],
  },
];
