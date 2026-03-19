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
        <section className="border-b border-[#F59E0B]/10 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.16),_transparent_34%),linear-gradient(to_bottom,#091226,#000000_56%)] pt-28 pb-10">
          <div className="container mx-auto max-w-6xl px-4 text-center">
            <span className="inline-flex rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F8C15C]">
              Conteúdo sobre chopp em Sorocaba
            </span>
            <h1 className="mx-auto mt-5 max-w-4xl text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
              Blog do <span className="text-[#F59E0B]">Chopp Bierz</span>
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-gray-300 sm:text-base">
              Artigos diretos e úteis sobre chopp, chope, eventos, churrascos, equipamentos e delivery em Sorocaba.
            </p>
          </div>
        </section>

        <section className="border-b border-[#F59E0B]/10 bg-black py-6">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="flex flex-wrap justify-center gap-2">
              {blogCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition-all ${
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

        <section className="py-12">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">Artigos publicados</p>
                <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Todos os artigos</h2>
              </div>
              <p className="text-sm text-gray-400">Conteúdo organizado para leitura e indexação.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <article
                  key={post.slug}
                  className="overflow-hidden rounded-xl border border-[#F59E0B]/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#F59E0B]/45 flex h-full flex-col"
                >
                  <div className="relative flex w-full items-center justify-center overflow-hidden bg-[#050505]" style={{ aspectRatio: '16 / 9' }}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div className="flex flex-grow flex-col p-4">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="rounded-full bg-[#F59E0B]/15 px-2.5 py-0.5 text-[10px] font-semibold text-[#F59E0B] flex-shrink-0">
                        {blogCategories.find((item) => item.id === post.category)?.name}
                      </span>
                      <span className="text-[10px] text-gray-500 flex-shrink-0">{post.readTime}</span>
                    </div>

                    <h3 className="text-base font-bold leading-snug text-white line-clamp-3">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-gray-400 line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-3 text-[10px] text-gray-500">
                      <span className="inline-flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {post.author}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <Link to={`/blog/${post.slug}`} className="mt-4 block">
                      <Button className="h-9 w-full bg-[#F59E0B] text-xs font-semibold text-black hover:bg-[#f7a91e]">
                        Ler artigo
                        <ArrowRight className="ml-1.5 h-3 w-3" />
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
