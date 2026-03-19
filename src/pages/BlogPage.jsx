import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
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

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black text-white">
        <section className="border-b border-[#F59E0B]/10 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.16),_transparent_34%),linear-gradient(to_bottom,#091226,#000000_56%)] pt-24 pb-8 sm:pt-28 sm:pb-10">
          <div className="container mx-auto max-w-6xl px-4 text-center">
            <span className="inline-flex rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#F8C15C] sm:text-[11px]">
              Conteúdo sobre chopp em Sorocaba
            </span>
            <h1 className="mx-auto mt-4 max-w-4xl text-3xl font-black leading-[1.05] sm:mt-5 sm:text-4xl lg:text-5xl">
              Blog do <span className="text-[#F59E0B]">Chopp Bierz</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-300 sm:max-w-3xl sm:text-base sm:leading-7">
              Artigos diretos e úteis sobre chopp, chope, eventos, churrascos, equipamentos e delivery em Sorocaba.
            </p>
          </div>
        </section>

        <section className="border-b border-[#F59E0B]/10 bg-black py-4 sm:py-6">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex min-w-max gap-2 pb-1 sm:min-w-0 sm:flex-wrap sm:justify-center">
                {blogCategories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`shrink-0 rounded-lg px-4 py-2 text-xs font-semibold transition-all sm:px-4 sm:py-1.5 ${
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
          </div>
        </section>

        <section className="py-8 sm:py-12">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F59E0B] sm:text-sm">Artigos publicados</p>
                <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Todos os artigos</h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-gray-400">Conteúdo organizado para leitura confortável e navegação rápida no celular.</p>
            </div>

            <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <article
                  key={post.slug}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#F59E0B]/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#F59E0B]/45"
                >
                  <div className="relative w-full overflow-hidden bg-[#050505] p-2 sm:p-3">
                    <div className="flex w-full items-center justify-center overflow-hidden rounded-xl bg-black/60" style={{ aspectRatio: '16 / 9' }}>
                      <img src={post.image} alt={post.title} className="max-h-full max-w-full object-contain" />
                    </div>
                  </div>

                  <div className="flex flex-grow flex-col px-4 pb-4 pt-2 sm:p-5">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <span className="rounded-full bg-[#F59E0B]/15 px-2.5 py-1 text-[10px] font-semibold text-[#F59E0B] sm:text-[11px]">
                        {blogCategories.find((item) => item.id === post.category)?.name}
                      </span>
                      <span className="text-[10px] text-gray-500 sm:text-[11px]">{post.readTime}</span>
                    </div>

                    <h3 className="text-lg font-bold leading-snug text-white sm:text-xl line-clamp-3">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-gray-400 line-clamp-4 flex-grow">
                      {post.excerpt}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-[11px] text-gray-500 sm:text-xs">
                      <span className="inline-flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5" />
                        {post.author}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {post.date}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readTime}
                      </span>
                    </div>

                    <Link to={`/blog/${post.slug}`} className="mt-5 block">
                      <Button className="h-10 w-full rounded-xl bg-[#F59E0B] text-sm font-semibold text-black hover:bg-[#f7a91e] sm:h-11">
                        Ler artigo
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="rounded-lg border border-white/10 bg-white/5 p-8 text-center text-gray-400">
                Nenhum artigo encontrado nessa categoria.
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BlogPage;
