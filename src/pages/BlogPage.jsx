import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [visible, setVisible] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    setVisible(true);
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "Guia Completo: Chopp Sorocaba - Tudo que Você Precisa Saber",
      excerpt: "Descubra os melhores tipos de chopp disponíveis em Sorocaba e como escolher o ideal para seu evento. Saiba mais sobre delivery de chopp em Sorocaba e chope para eventos.",
      category: "guias",
      author: "Bierz",
      date: "15 de Março, 2026",
      image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&h=400&fit=crop",
      slug: "guia-chopp-sorocaba",
      content: `
        <h2>Chopp Sorocaba: O Guia Definitivo</h2>
        <p>Se você está procurando chopp em Sorocaba, você veio ao lugar certo! A Bierz é a distribuidora especializada em chopp sorocaba, oferecendo as melhores variedades de chope para eventos, churrascos e festas.</p>
        
        <h3>Tipos de Chopp Disponíveis</h3>
        <p>Na nossa loja, você encontra:</p>
        <ul>
          <li><strong>Chopp Pilsen</strong> - A opção clássica e refrescante</li>
          <li><strong>Chopp IPA</strong> - Para quem gosta de sabor mais intenso</li>
          <li><strong>Chopp Weiss</strong> - A cerveja de trigo alemã tradicional</li>
          <li><strong>Chopp Stout</strong> - Escura e sofisticada</li>
        </ul>

        <h3>Delivery de Chopp em Sorocaba</h3>
        <p>Oferecemos serviço de entrega de chopp para toda a região de Sorocaba. Nosso delivery é rápido, seguro e com preços competitivos. Você também pode chamar nosso disk chopp para fazer seu pedido com facilidade.</p>

        <h3>Chope para Eventos e Churrascos</h3>
        <p>Planejando um evento? O chope para eventos é a escolha perfeita! Oferecemos pacotes especiais de chope para churrasco, festas e confraternizações. Temos também equipamentos para servir chopp com qualidade.</p>

        <h3>Disk Chopp Sorocaba</h3>
        <p>Não quer sair de casa? Ligue para nosso disk chopp sorocaba e faça seu pedido! Atendimento rápido e entrega garantida.</p>

        <h3>Por que Escolher a Bierz?</h3>
        <p>Somos a distribuidora de chopp em Sorocaba com maior variedade e qualidade. Nossos produtos são sempre frescos e nossas entregas são pontuais. Confie na Bierz para seu chopp sorocaba!</p>
      `,
      keywords: "chopp sorocaba, chope sorocaba, delivery de chopp, chope para eventos, chope para churrasco, disk chopp, disk chope sorocaba"
    },
    {
      id: 2,
      title: "Chope para Eventos: Como Escolher e Servir Perfeitamente",
      excerpt: "Aprenda como escolher o melhor chope para seus eventos, festas e churrascos. Dicas práticas sobre servir chope para churrasco e manter a qualidade do chope.",
      category: "dicas",
      author: "Bierz",
      date: "12 de Março, 2026",
      image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=600&h=400&fit=crop",
      slug: "chope-para-eventos",
      content: `
        <h2>Chope para Eventos: Guia Prático</h2>
        <p>Servir chope para eventos é uma forma garantida de agradar seus convidados. Neste guia, você aprenderá tudo sobre chope para churrasco, delivery de chopp e como manter a qualidade do seu chope.</p>

        <h3>Escolhendo o Chope Certo</h3>
        <p>Para eventos em Sorocaba, recomendamos:</p>
        <ul>
          <li>Chopp Pilsen para eventos gerais</li>
          <li>Chopp IPA para um público mais exigente</li>
          <li>Variedades mistas para maior satisfação</li>
        </ul>

        <h3>Chope para Churrasco</h3>
        <p>O chope para churrasco é essencial! A Bierz oferece delivery de chopp especialmente preparado para churrascos. Nosso disk chopp sorocaba pode ajudar você a escolher a quantidade certa.</p>

        <h3>Dicas de Servimento</h3>
        <p>Mantenha o chopp entre 2-4°C. Use copos limpos e secos. Sirva com a espuma perfeita - aproximadamente 2cm de espuma.</p>

        <h3>Delivery de Chopp em Sorocaba</h3>
        <p>Não se preocupe com transporte! Nosso serviço de delivery de chopp garante que seu chope chegue em perfeitas condições. Ligue para nosso disk chope sorocaba!</p>
      `,
      keywords: "chope para eventos, chope para churrasco, delivery de chopp, disk chopp, chopp sorocaba, chope sorocaba, disk chope sorocaba"
    },
    {
      id: 3,
      title: "Disk Chopp Sorocaba: Seu Chopp Entregue em Casa",
      excerpt: "Conheça o serviço de disk chopp sorocaba da Bierz. Entrega rápida de chopp, chope para eventos e churrascos. Ligue agora!",
      category: "servicos",
      author: "Bierz",
      date: "10 de Março, 2026",
      image: "https://images.unsplash.com/photo-1618183479302-1e0aa382c36b?w=600&h=400&fit=crop",
      slug: "disk-chopp-sorocaba",
      content: `
        <h2>Disk Chopp Sorocaba - Entrega Rápida</h2>
        <p>O disk chopp sorocaba da Bierz oferece o melhor serviço de entrega de chopp em Sorocaba. Escolha entre chopp, chope para eventos, chope para churrasco e muito mais!</p>

        <h3>Como Funciona o Disk Chopp</h3>
        <p>Ligar é fácil! Nosso disk chope sorocaba atende:</p>
        <ul>
          <li>Pedidos de chopp em qualquer quantidade</li>
          <li>Delivery de chopp para eventos</li>
          <li>Chope para churrasco com entrega rápida</li>
          <li>Equipamentos para servir chopp</li>
        </ul>

        <h3>Vantagens do Nosso Disk Chopp</h3>
        <p>Com nosso disk chopp sorocaba você tem:</p>
        <ul>
          <li>Entrega rápida em toda Sorocaba</li>
          <li>Chopp sempre fresco</li>
          <li>Preços competitivos</li>
          <li>Atendimento personalizado</li>
        </ul>

        <h3>Chope para Eventos e Churrascos</h3>
        <p>Planejando um evento? Nosso disk chope sorocaba oferece pacotes especiais de chope para churrasco e eventos. Delivery de chopp garantido!</p>

        <h3>Contato</h3>
        <p>Ligue para nosso disk chopp sorocaba agora mesmo! Estamos prontos para servir você com o melhor chopp de Sorocaba.</p>
      `,
      keywords: "disk chopp, disk chope sorocaba, delivery de chopp, chopp sorocaba, chope sorocaba, chope para eventos, chope para churrasco"
    },
    {
      id: 4,
      title: "Tipos de Chopp: Pilsen, IPA, Weiss e Stout - Qual Escolher?",
      excerpt: "Conheça os diferentes tipos de chopp disponíveis em Sorocaba. De Pilsen até Stout, descubra qual é o ideal para você.",
      category: "educacao",
      author: "Bierz",
      date: "08 de Março, 2026",
      image: "https://images.unsplash.com/photo-1612528443702-f6741f70a049?w=600&h=400&fit=crop",
      slug: "tipos-de-chopp",
      content: `
        <h2>Tipos de Chopp: Guia Completo</h2>
        <p>Existem muitos tipos de chopp disponíveis em Sorocaba. Neste guia, você aprenderá sobre cada variedade e como escolher o melhor para seus eventos.</p>

        <h3>Chopp Pilsen</h3>
        <p>O chopp Pilsen é o mais popular. Leve, refrescante e perfeito para qualquer ocasião. Ideal para chope para churrasco e eventos em Sorocaba.</p>

        <h3>Chopp IPA</h3>
        <p>Para quem gosta de sabor mais intenso e amargor marcante. Perfeito para acompanhar churrasco. Disponível em nosso delivery de chopp.</p>

        <h3>Chopp Weiss</h3>
        <p>A cerveja de trigo alemã tradicional. Suave e com notas frutadas. Ótimo para eventos especiais. Ligue para nosso disk chopp sorocaba!</p>

        <h3>Chopp Stout</h3>
        <p>Escura, sofisticada e com notas de café e chocolate. Para paladares mais refinados. Disponível no disk chope sorocaba da Bierz.</p>

        <h3>Escolhendo o Melhor Chopp</h3>
        <p>Para eventos em Sorocaba, considere:</p>
        <ul>
          <li>Gosto dos convidados</li>
          <li>Tipo de evento (churrasco, festa, etc)</li>
          <li>Quantidade necessária</li>
          <li>Disponibilidade de entrega</li>
        </ul>

        <h3>Delivery de Chopp em Sorocaba</h3>
        <p>A Bierz oferece delivery de chopp para todos os tipos. Ligue para nosso disk chopp sorocaba e escolha a variedade perfeita!</p>
      `,
      keywords: "tipos de chopp, chopp pilsen, chopp ipa, chopp weiss, chopp stout, chopp sorocaba, chope sorocaba, delivery de chopp"
    },
    {
      id: 5,
      title: "Equipamentos para Servir Chopp: Tudo o que Você Precisa",
      excerpt: "Descubra quais equipamentos são necessários para servir chopp com qualidade. Dicas sobre geladeiras, torneiras e acessórios.",
      category: "equipamentos",
      author: "Bierz",
      date: "05 de Março, 2026",
      image: "https://images.unsplash.com/photo-1566041510632-c8fbca88e0bb?w=600&h=400&fit=crop",
      slug: "equipamentos-chopp",
      content: `
        <h2>Equipamentos para Servir Chopp</h2>
        <p>Para servir chopp com qualidade em seus eventos em Sorocaba, você precisa dos equipamentos certos. Confira nosso guia completo!</p>

        <h3>Geladeira para Chopp</h3>
        <p>Essencial para manter o chopp na temperatura ideal (2-4°C). Oferecemos aluguel e venda de geladeiras para chopp.</p>

        <h3>Torneira de Chopp</h3>
        <p>Uma boa torneira garante o servimento perfeito. Temos torneiras de qualidade para eventos e uso contínuo.</p>

        <h3>Copos Apropriados</h3>
        <p>Use copos de vidro limpos e secos. Oferecemos copos especiais para chopp em diferentes tamanhos.</p>

        <h3>Manutenção do Equipamento</h3>
        <p>Limpeza regular é essencial. Nosso disk chopp sorocaba oferece dicas e produtos de limpeza.</p>

        <h3>Chope para Eventos</h3>
        <p>Para eventos em Sorocaba, oferecemos pacotes completos com equipamentos e delivery de chopp. Ligue para nosso disk chope sorocaba!</p>

        <h3>Aluguel de Equipamentos</h3>
        <p>Não quer comprar? Oferecemos aluguel de equipamentos para chopp para seus eventos. Entrega incluída!</p>
      `,
      keywords: "equipamentos chopp, geladeira chopp, torneira chopp, copos chopp, chope para eventos, delivery de chopp, disk chopp sorocaba"
    }
  ];

  const categories = [
    { id: 'todos', name: 'Todos os Artigos' },
    { id: 'guias', name: 'Guias' },
    { id: 'dicas', name: 'Dicas' },
    { id: 'servicos', name: 'Serviços' },
    { id: 'educacao', name: 'Educação' },
    { id: 'equipamentos', name: 'Equipamentos' }
  ];

  const filteredPosts = selectedCategory === 'todos' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-gray-900 to-black min-h-screen">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                Blog do <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">Chopp Bierz</span>
              </h1>
              <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                Dicas, guias e informações sobre chopp sorocaba, chope para eventos, delivery de chopp e muito mais!
              </p>
            </div>

            {/* SEO Keywords Display */}
            <div className="bg-white/5 backdrop-blur-sm border border-[#F59E0B]/20 rounded-lg p-6 max-w-3xl mx-auto">
              <h2 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Search className="w-5 h-5 text-[#F59E0B]" />
                Palavras-chave indexadas
              </h2>
              <div className="flex flex-wrap gap-2">
                {['chopp sorocaba', 'chope sorocaba', 'delivery de chopp', 'chope para eventos', 'chope para churrasco', 'disk chopp', 'disk chope sorocaba', 'chopp', 'chope', 'entrega', 'disk'].map((keyword) => (
                  <span key={keyword} className="px-3 py-1 bg-[#F59E0B]/20 border border-[#F59E0B]/50 rounded-full text-[#F59E0B] text-sm font-medium">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-black border-b border-[#F59E0B]/20">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    selectedCategory === cat.id
                      ? 'bg-[#F59E0B] text-black shadow-lg shadow-[#F59E0B]/50'
                      : 'bg-white/10 text-gray-200 hover:bg-white/20'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section ref={sectionRef} className="py-20 bg-gradient-to-b from-black to-gray-900 transition-all duration-700 min-h-screen opacity-100">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredPosts.map((post, index) => (
                <Card 
                  key={post.id}
                  className="bg-white/5 backdrop-blur-sm border-[#F59E0B]/20 hover:border-[#F59E0B]/50 transition-all duration-300 overflow-hidden group opacity-100 translate-y-0"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-[#F59E0B]/20 text-[#F59E0B] text-xs font-semibold rounded-full">
                        {categories.find(c => c.id === post.category)?.name}
                      </span>
                    </div>
                    <CardTitle className="text-white group-hover:text-[#F59E0B] transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </div>
                      </div>

                      {/* Keywords */}
                      <div className="pt-4 border-t border-white/10">
                        <p className="text-xs text-gray-500 mb-2">Palavras-chave:</p>
                        <div className="flex flex-wrap gap-1">
                          {post.keywords.split(', ').map((keyword) => (
                            <span key={keyword} className="text-xs bg-white/5 text-gray-400 px-2 py-1 rounded">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Read More Button */}
                      <Button
                        className="w-full bg-[#F59E0B] hover:bg-[#F97316] text-black font-semibold transition-all duration-200 group/btn"
                      >
                        Ler Artigo
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">Nenhum artigo encontrado nesta categoria.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[#F59E0B]/20 to-[#F97316]/20 border-y border-[#F59E0B]/20 min-h-screen">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Precisa de Chopp em Sorocaba?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Ligue para nosso disk chopp sorocaba e aproveite nosso serviço de delivery de chopp para eventos, churrascos e muito mais!
            </p>
            <Button
              onClick={() => window.open('https://wa.me/5515988015195', '_blank')}
              className="bg-[#F59E0B] hover:bg-[#F97316] text-black font-bold text-lg px-8 py-6"
            >
              Contato via WhatsApp
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BlogPage;
