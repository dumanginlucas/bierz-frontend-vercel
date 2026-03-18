import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { blogCategories, blogKeywordCluster, blogPosts } from '../data/blogPosts';
import {
  ProgressSlider,
  SliderContent,
  SliderWrapper,
  SliderBtnGroup,
  SliderBtn,
} from '../components/ui/progressive-carousel';

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

  const carouselPosts = filteredPosts.length > 0 ? filteredPosts : blogPosts;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black text-white">
        {/* Hero Section com Carrossel Progressivo */}
        <section className="border-b border-[#F59E0B]/15 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.18),_transparent_36%),linear-gradient(to_bottom,#091226,#000000_55%)] pt-24 pb-16">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-4xl text-center mb-10">
              <h1 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                Blog do <span className="text-[#F59E0B]">Chopp Bierz</span>
              </h1>
              <p className="mx-auto mt-4 max-w-3xl text-sm text-gray-300 sm:text-base">
                Descubra tudo sobre chopp, chope, eventos e churrascos em Sorocaba.
              </p>
            </div>

            {/* Carrossel Progressivo */}
            <div className="mt-8">
              <ProgressSlider
                vertical={false}
                activeSlider={carouselPosts[0]?.slug || 'post-1'}
                duration={6000}
                fastDuration={400}
              >
                <SliderContent>
                  {carouselPosts.map((post) => (
                    <SliderWrapper
                      key={post.slug}
                      value={post.slug}
                      className="w-full"
                    >
                      <div className="relative w-full overflow-hidden rounded-2xl border border-[#F59E0B]/20 bg-black shadow-2xl shadow-black/40">
                        {/* Container 16:9 RIGOROSO - Garante que a imagem não seja cortada */}
                        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                          <img
                            src={post.image}
                            alt={post.title}
                            className="absolute inset-0 h-full w-full object-contain bg-black"
                            style={{ objectPosition: 'center top' }}
                          />
                          
                          {/* Overlay com gradiente apenas na base para não cobrir o topo da imagem */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                          
                          {/* Conteúdo posicionado na base */}
                          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                            <span className="mb-2 inline-flex rounded-full bg-[#F59E0B]/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#F59E0B]">
                              Destaque
                            </span>
                            <h2 className="text-base font-bold leading-tight sm:text-xl lg:text-2xl text-white line-clamp-2">
                              {post.title}
                            </h2>
                            <p className="mt-1.5 text-[10px] sm:text-xs text-gray-200 line-clamp-1 opacity-90">
                              {post.excerpt}
                            </p>
                            <div className="mt-2.5 flex flex-wrap gap-3 text-[10px] sm:text-xs text-gray-300">
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
                            <div className="mt-3">
                              <Link to={`/blog/${post.slug}`}>
                                <Button className="bg-[#F59E0B] text-black hover:bg-[#f7a91e] text-[10px] sm:text-xs h-8 px-4">
                                  Ler artigo
                                  <ArrowRight className="ml-1.5 h-3 w-3" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SliderWrapper>
                  ))}
                </SliderContent>

                {/* Botões do Carrossel */}
                <div className="mt-4">
                  <SliderBtnGroup className="h-fit dark:text-white text-black dark:bg-black/60 bg-white/40 backdrop-blur-md overflow-x-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0.5 rounded-lg p-1">
                    {carouselPosts.map((post, index) => (
                      <SliderBtn
                        key={index}
                        value={post.slug}
                        className="text-left cursor-pointer p-2 flex-shrink-0 hover:bg-white/5 rounded transition-colors"
                        progressBarClass="dark:bg-[#F59E0B] bg-[#F59E0B] h-0.5"
                      >
                        <h3 className="text-[10px] font-semibold text-white line-clamp-1">
                          {post.title}
                        </h3>
                        <p className="text-[9px] text-gray-400 line-clamp-1 mt-0.5">
                          {post.excerpt}
                        </p>
                      </SliderBtn>
                    ))}
                  </SliderBtnGroup>
                </div>
              </ProgressSlider>
            </div>
          </div>
        </section>

        {/* Filtro de Categorias */}
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

        {/* Listagem de Artigos */}
        <section className="py-12">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mb-8">
              <h2 className="text-2xl font-bold sm:text-3xl">Todos os artigos</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <div
                  key={post.slug}
                  className="overflow-hidden border border-[#F59E0B]/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#F59E0B]/45 rounded-xl flex flex-col h-full"
                >
                  {/* Imagem 16:9 sem corte */}
                  <div className="relative w-full bg-black flex-shrink-0" style={{ paddingBottom: '56.25%' }}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="absolute inset-0 h-full w-full object-contain bg-black"
                    />
                  </div>
                  
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="rounded-full bg-[#F59E0B]/15 px-2.5 py-0.5 text-[10px] font-semibold text-[#F59E0B] flex-shrink-0">
                        {
                          blogCategories.find(
                            (item) => item.id === post.category
                          )?.name
                        }
                      </span>
                      <span className="text-[10px] text-gray-500 flex-shrink-0">{post.readTime}</span>
                    </div>

                    <h3 className="text-base font-bold leading-snug text-white line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-gray-400 line-clamp-2 flex-grow">
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
                    </div>

                    <Link to={`/blog/${post.slug}`} className="mt-4 block">
                      <Button className="w-full bg-[#F59E0B] text-black hover:bg-[#f7a91e] text-xs h-8">
                        Ler artigo
                        <ArrowRight className="ml-1.5 h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
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
