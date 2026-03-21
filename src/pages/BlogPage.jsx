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
    window.scrollTo(0, 0);
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
        <section className="border-b border-[#F59E0B]/15 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.18),_transparent_36%),linear-gradient(to_bottom,#091226,#000000_55%)] pt-24 pb-12 sm:pb-16">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="text-3xl font-black leading-[1.05] sm:text-4xl lg:text-5xl">
                Blog do <span className="text-[#F59E0B]">Chopp Bierz</span>
              </h1>
              <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-gray-300 sm:text-base sm:leading-7">
                Conteúdos sobre chopp, chope, eventos, churrascos e delivery em Sorocaba para ajudar você a pedir melhor e servir bem.
              </p>
            </div>

            <div className="mt-8 sm:mt-10">
              <ProgressSlider
                vertical={false}
                activeSlider={carouselPosts[0]?.slug || 'post-1'}
                duration={6000}
                fastDuration={400}
              >
                <SliderContent>
                  {carouselPosts.map((post) => (
                    <SliderWrapper key={post.slug} value={post.slug} className="w-full">
                      <div className="w-full overflow-hidden rounded-[1.5rem] border border-[#F59E0B]/20 bg-[#050505] shadow-2xl shadow-black/40">
                        <div className="relative aspect-video w-full overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0.24))]">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="absolute inset-0 h-full w-full object-contain p-2 sm:p-3"
                            style={{ objectPosition: 'center center' }}
                          />

                          <div className="hidden md:block absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/75 to-transparent" />
                          <div className="hidden md:block absolute inset-x-0 bottom-0 p-4 sm:p-6 lg:p-8">
                            <div className="max-w-3xl">
                              <span className="mb-2 inline-flex rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#F59E0B] sm:text-[11px]">
                                Destaque do blog
                              </span>
                              <h2 className="text-lg font-bold leading-tight text-white sm:text-2xl lg:text-3xl">
                                {post.title}
                              </h2>
                              <p className="mt-2 max-w-2xl text-xs leading-5 text-gray-200 sm:text-sm sm:leading-6">
                                {post.excerpt}
                              </p>
                              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-gray-300 sm:text-xs">
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
                              <div className="mt-4">
                                <Link to={`/blog/${post.slug}`}>
                                  <Button className="h-9 rounded-full bg-[#F59E0B] px-5 text-xs font-semibold text-black hover:bg-[#f7a91e] sm:h-10 sm:text-sm">
                                    Ler artigo
                                    <ArrowRight className="ml-2 h-3.5 w-3.5" />
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="block border-t border-white/5 bg-[linear-gradient(180deg,#080808,#0d1220)] p-4 md:hidden">
                          <span className="inline-flex rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#F59E0B]">
                            Destaque do blog
                          </span>
                          <h2 className="mt-3 text-xl font-bold leading-tight text-white">
                            {post.title}
                          </h2>
                          <p className="mt-2 text-sm leading-6 text-gray-300">
                            {post.excerpt}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-gray-400">
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
                          <div className="mt-4">
                            <Link to={`/blog/${post.slug}`}>
                              <Button className="h-11 w-full rounded-full bg-[#F59E0B] px-5 text-sm font-semibold text-black hover:bg-[#f7a91e]">
                                Ler artigo
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </SliderWrapper>
                  ))}
                </SliderContent>

                <div className="mt-4">
                  <SliderBtnGroup className="grid h-fit grid-cols-1 gap-1 rounded-2xl bg-white/5 p-1.5 backdrop-blur-md sm:grid-cols-2 lg:grid-cols-4">
                    {carouselPosts.map((post, index) => (
                      <SliderBtn
                        key={index}
                        value={post.slug}
                        className="cursor-pointer rounded-xl p-3 text-left transition-colors hover:bg-white/5"
                        progressBarClass="dark:bg-[#F59E0B] bg-[#F59E0B] h-0.5"
                      >
                        <h3 className="text-[11px] font-semibold leading-4 text-white sm:text-xs">
                          {post.title}
                        </h3>
                        <p className="mt-1 text-[10px] leading-4 text-gray-400 sm:text-[11px]">
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

        <section className="border-b border-[#F59E0B]/10 bg-black py-5 sm:py-6">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex min-w-max gap-2">
                {blogCategories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all sm:text-sm ${
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

        <section className="py-10 sm:py-12">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mb-7 sm:mb-8">
              <h2 className="text-2xl font-bold sm:text-3xl">Todos os artigos</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
                Conteúdo para quem quer pedir com mais segurança, entender melhor o produto e organizar eventos com mais praticidade.
              </p>
            </div>

            <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <div
                  key={post.slug}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#F59E0B]/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#F59E0B]/45"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-black/60">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="absolute inset-0 h-full w-full object-contain p-2 sm:p-3"
                      style={{ objectPosition: 'center center' }}
                    />
                  </div>

                  <div className="flex flex-grow flex-col p-4 sm:p-5">
                    <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                      <span className="rounded-full bg-[#F59E0B]/15 px-2.5 py-1 text-[10px] font-semibold leading-none text-[#F59E0B] sm:text-[11px]">
                        {blogCategories.find((item) => item.id === post.category)?.name}
                      </span>
                      <span className="text-[10px] leading-none text-gray-500 sm:text-[11px]">{post.readTime}</span>
                    </div>

                    <h3 className="text-base font-bold leading-snug text-white sm:text-lg">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-gray-400 flex-grow">
                      {post.excerpt}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-gray-500 sm:text-xs">
                      <span className="inline-flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5" />
                        {post.author}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {post.date}
                      </span>
                    </div>

                    <Link to={`/blog/${post.slug}`} className="mt-5 block">
                      <Button className="h-10 w-full rounded-full bg-[#F59E0B] text-sm font-semibold text-black hover:bg-[#f7a91e]">
                        Ler artigo
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-gray-400">
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
