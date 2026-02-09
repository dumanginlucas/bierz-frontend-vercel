// Mock data para a landing page da Bierz
export const products = [
  {
    id: 1,
    name: "Chopp Pilsen",
    category: "chopp",
    description: "Chopp Pilsen tradicional, leve e refrescante",
    sizes: ["30L", "50L"],
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=400&fit=crop"
  },
  {
    id: 2,
    name: "Chopp IPA",
    category: "chopp",
    description: "India Pale Ale com amargor marcante",
    sizes: ["30L", "50L"],
    image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400&h=400&fit=crop"
  },
  {
    id: 3,
    name: "Chopp Weiss",
    category: "chopp",
    description: "Cerveja de trigo alemã tradicional",
    sizes: ["30L", "50L"],
    image: "https://images.unsplash.com/photo-1618183479302-1e0aa382c36b?w=400&h=400&fit=crop"
  },
  {
    id: 4,
    name: "Chopp Stout",
    category: "chopp",
    description: "Cerveja escura com notas de café e chocolate",
    sizes: ["30L", "50L"],
    image: "https://images.unsplash.com/photo-1612528443702-f6741f70a049?w=400&h=400&fit=crop"
  },
  {
    id: 5,
    name: "Cerveja Premium Lager",
    category: "cerveja",
    description: "Caixa com 24 unidades de 350ml",
    sizes: ["Caixa 24un"],
    image: "https://images.unsplash.com/photo-1623480223495-33d3c536fcb4?w=400&h=400&fit=crop"
  },
  {
    id: 6,
    name: "Cerveja Artesanal IPA",
    category: "cerveja-especial",
    description: "Pack com 6 garrafas de 500ml",
    sizes: ["Pack 6un"],
    image: "https://images.unsplash.com/photo-1572297794719-f36ab6498968?w=400&h=400&fit=crop"
  },
  {
    id: 7,
    name: "Cerveja Artesanal APA",
    category: "cerveja-especial",
    description: "American Pale Ale em garrafas de 500ml",
    sizes: ["Pack 6un"],
    image: "https://images.unsplash.com/photo-1566041510632-c8fbca88e0bb?w=400&h=400&fit=crop"
  },
  {
    id: 8,
    name: "Gelo em Saco",
    category: "gelo",
    description: "Gelo de alta qualidade para suas festas",
    sizes: ["5kg", "10kg"],
    image: "https://images.unsplash.com/photo-1564053489984-317bbd824340?w=400&h=400&fit=crop"
  },
  {
    id: 9,
    name: "Energético Premium",
    category: "energetico",
    description: "Pack com 12 latas de 250ml",
    sizes: ["Pack 12un"],
    image: "https://images.unsplash.com/photo-1622543925917-763c34f4972e?w=400&h=400&fit=crop"
  },
  {
    id: 10,
    name: "Copos Descartáveis 300ml",
    category: "copos",
    description: "Pacote com 100 unidades",
    sizes: ["100un", "200un"],
    image: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?w=400&h=400&fit=crop"
  },
  {
    id: 11,
    name: "Copos de Vidro Caldereta",
    category: "copos",
    description: "Ideal para chopp, caixa com 12 unidades",
    sizes: ["Cx 12un"],
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=400&fit=crop"
  }
];

export const categories = [
  { id: "todos", name: "Todos", icon: "beer" },
  { id: "chopp", name: "Chopp", icon: "beer" },
  { id: "cerveja", name: "Cervejas", icon: "wine" },
  { id: "cerveja-especial", name: "Especiais", icon: "star" },
  { id: "gelo", name: "Gelo", icon: "snowflake" },
  { id: "energetico", name: "Energéticos", icon: "zap" },
  { id: "copos", name: "Copos", icon: "cup-soda" }
];

export const companyInfo = {
  name: "Bierz",
  tagline: "Distribuidora de Chopp e Cervejas Especiais",
  description: "A Bierz é uma distribuidora de Chopp e cervejas especiais voltada para a região de Sorocaba. Trabalhamos com as melhores marcas do mercado para garantir a qualidade e satisfação dos nossos clientes.",
  address: "Rua Professor Toledo, 665, Centro - Sorocaba/SP",
  phone: "(15) 98801-5195",
  whatsapp: "5515988015195",
  email: "bierz665@gmail.com",
  hours: "Segunda a Sexta: 8h às 18h | Sábado: 8h às 14h"
};
