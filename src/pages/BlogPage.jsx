import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, Search, User } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { blogCategories, blogKeywordCluster, blogPosts } from '../data/blogPosts';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');

  React.useEffect(() => {
    document.title = 'Blog do Chopp Bierz | Chopp e Chope em Sorocaba';

    const ensureMeta = (name, content, attribute = 'name') => {
      let tag = document.head.querySelector(`meta[${attribute}="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    ensureMeta(
      'description',
      'Blog da Bierz com artigos sobre chopp em Sorocaba, chope para eventos, disk chopp, delivery e dicas para churrascos e festas.'
    );
    ensureMeta('keywords', blogKeywordCluster.join(', '));
  }, []);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'todos') return blogPosts;
    return blogPosts.filter((post) => post.category === selectedCategory);
  }, [selectedCategory]);

  const featuredPost = filteredPosts[0];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black text-white">
        <section className="border-b border-[#F59E0B]/15 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.18),_transparent_36%),linear-gradient(to_bottom,#091226,#000000_55%)] pt-28 pb-14">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-4xl text-center">
              <span className="mb-4 inline-flex items-center rounded-full border border-[#F59E0B]/35 bg-[#F59E0B]/10 px-4 py-1 text-sm font-semibold text-[#F59E0B]">
                Conteúdo para SEO local e conversão
              </span>
              <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                Blog do <span className="text-[#F59E0B]">Chopp Bierz</span>
              </h1>
              <p className="mx-auto mt-5 max-w-3xl text-base text-gray-300 sm:text-lg">
                Artigos pensados para ranquear melhor no Google e responder buscas reais como{' '}
                <strong className="text-white">delivery de chopp em Sorocaba</strong>,{' '}
                <strong className="text-white">disk chope Sorocaba</strong> e{' '}
                <strong className="text-white">chopp para churrasco</strong>.
              </p>
            </div>

            {featuredPost && (
              <div className="mt-12 grid overflow-hidden rounded-3xl border border-[#F59E0B]/20 bg-white/5 shadow-2xl shadow-black/40 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="min-h-[280px] bg-black">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                  <span className="mb-4 inline-flex w-fit rounded-full bg-[#F59E0B]/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#F59E0B]">
                    Artigo em destaque
                  </span>
                  <h2 className="text-2xl font-bold leading-tight sm:text-3xl">{featuredPost.title}</h2>
                  <p className="mt-4 text-gray-300">{featuredPost.excerpt}</p>
                  <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-400">
                    <span className="inline-flex items-center gap-2"><User className="h-4 w-4" />{featuredPost.author}</span>
                    <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4" />{featuredPost.date}</span>
                    <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" />{featuredPost.readTime}</span>
                  </div>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {featuredPost.keywords.slice(0, 5).map((keyword) => (
                      <span key={keyword} className="rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/10 px-3 py-1 text-xs font-medium text-[#F8C15C]">
                        {keyword}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8">
                    <Link to={`/blog/${featuredPost.slug}`}>
                      <Button className="bg-[#F59E0B] text-black hover:bg-[#f7a91e]">
                        Ler artigo completo
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="border-b border-[#F59E0B]/10 bg-black py-7">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {blogCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`rounded-xl px-5 py-2 text-sm font-semibold transition-all ${
                    selectedCategory === category.id
                      ? 'bg-[#F59E0B] text-black shadow-lg shadow-[#F59E0B]/25'
                      : 'bg-white/10 text-gray-200 hover:bg-white/15'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">Artigos publicados</p>
                <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Conteúdo organizado para leitura e indexação</h2>
              </div>
              <p className="hidden max-w-xl text-right text-sm text-gray-400 lg:block">
                Cada artigo agora possui uma página individual para fortalecer o SEO, melhorar a navegação e criar mais relevância para buscas locais ligadas a chopp, chope, entrega e eventos.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {filteredPosts.map((post) => (
                <Card key={post.slug} className="overflow-hidden border-[#F59E0B]/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#F59E0B]/45">
                  <div className="h-56 bg-black">
                    <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
                  </div>
                  <CardContent className="p-5">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="rounded-full bg-[#F59E0B]/15 px-3 py-1 text-xs font-semibold text-[#F59E0B]">
                        {blogCategories.find((item) => item.id === post.category)?.name}
                      </span>
                      <span className="text-xs text-gray-500">{post.readTime}</span>
                    </div>

                    <h3 className="text-xl font-bold leading-tight text-white">{post.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-gray-400">{post.excerpt}</p>

                    <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500">
                      <span className="inline-flex items-center gap-1"><User className="h-3.5 w-3.5" />{post.author}</span>
                      <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{post.date}</span>
                    </div>

                    <div className="mt-5 border-t border-white/10 pt-4">
                      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">Palavras-chave do artigo</p>
                      <div className="flex flex-wrap gap-2">
                        {post.keywords.slice(0, 6).map((keyword) => (
                          <span key={keyword} className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-gray-300">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link to={`/blog/${post.slug}`} className="mt-6 block">
                      <Button className="w-full bg-[#F59E0B] text-black hover:bg-[#f7a91e]">
                        Ler artigo
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-gray-400">
                Nenhum artigo encontrado nessa categoria.
              </div>
            )}
          </div>
        </section>

        <section className="border-y border-[#F59E0B]/10 bg-gradient-to-b from-[#0b1322] to-black py-14">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="rounded-3xl border border-[#F59E0B]/20 bg-white/5 p-6 sm:p-8">
              <h2 className="flex items-center gap-3 text-2xl font-bold text-white">
                <Search className="h-5 w-5 text-[#F59E0B]" />
                Buscas comuns que esse blog precisa cobrir
              </h2>
              <p className="mt-3 max-w-3xl text-gray-400">
                Essas variações ajudam a ampliar o alcance orgânico porque refletem formas reais de busca usadas pelos clientes na região.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {blogKeywordCluster.map((keyword) => (
                  <span key={keyword} className="rounded-full border border-[#F59E0B]/25 bg-[#F59E0B]/10 px-3 py-1.5 text-sm font-medium text-[#F8C15C]">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BlogPage;
