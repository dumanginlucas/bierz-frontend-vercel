import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { getBlogPostBySlug, getRelatedPosts, blogCategories } from '../data/blogPosts';

const defaultCta = {
  title: 'Precisa de chopp para o seu evento?',
  description:
    'A Bierz entrega o chopp gelado, instala o equipamento no local e depois faz a retirada para você aproveitar com mais praticidade em churrascos, festas e confraternizações.',
  buttonLabel: 'Pedir pelo WhatsApp',
};

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);

  useEffect(() => {
    if (!post) return;
    document.title = `${post.title} | Blog do Chopp Bierz`;

    const ensureMeta = (name, content, attribute = 'name') => {
      let tag = document.head.querySelector(`meta[${attribute}="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    ensureMeta('description', post.seoDescription);
    ensureMeta('og:title', `${post.title} | Blog do Chopp Bierz`, 'property');
    ensureMeta('og:description', post.seoDescription, 'property');
    ensureMeta('keywords', post.keywords.join(', '));

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [post]);

  const relatedPosts = getRelatedPosts(slug, post?.category);
  const cta = post?.cta || defaultCta;

  if (!post) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-black px-4 pt-32 text-white">
          <div className="mx-auto max-w-3xl rounded-3xl border border-[#F59E0B]/20 bg-white/5 p-8 text-center">
            <h1 className="text-3xl font-bold">Artigo não encontrado</h1>
            <p className="mt-4 text-gray-400">Esse link pode ter sido alterado ou o artigo ainda não foi publicado.</p>
            <Link to="/blog" className="mt-8 inline-block">
              <Button className="bg-[#F59E0B] text-black hover:bg-[#f7a91e]">Voltar para o blog</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black text-white">
        <section className="border-b border-[#F59E0B]/10 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.16),_transparent_34%),linear-gradient(to_bottom,#091226,#000000_56%)] pt-28 pb-10 sm:pb-12">
          <div className="container mx-auto max-w-4xl px-4">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-[#F8C15C] transition hover:text-[#F59E0B]">
              <ArrowLeft className="h-4 w-4" />
              Voltar para todos os artigos
            </Link>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <span className="rounded-full bg-[#F59E0B]/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#F59E0B] sm:text-xs">
                {blogCategories.find((item) => item.id === post.category)?.name || post.category}
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-gray-300 sm:text-xs">
                Blog Bierz
              </span>
            </div>
            <h1 className="mt-5 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">{post.title}</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-gray-300 sm:mt-5 sm:text-lg sm:leading-8">{post.seoDescription}</p>
            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-400">
              <span className="inline-flex items-center gap-2"><User className="h-4 w-4" />{post.author}</span>
              <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4" />{post.date}</span>
              <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" />{post.readTime}</span>
            </div>
          </div>
        </section>

        <section className="py-8 sm:py-10">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="overflow-hidden rounded-[1.75rem] border border-[#F59E0B]/20 bg-white/5">
              <div className="relative aspect-video w-full bg-black/60">
                <img
                  src={post.image}
                  alt={post.title}
                  className="absolute inset-0 h-full w-full object-contain p-2 sm:p-3"
                  style={{ objectPosition: 'center center' }}
                />
              </div>
            </div>

            <article className="mt-6 rounded-[1.75rem] border border-white/10 bg-white/5 p-5 sm:mt-8 sm:p-8">
              <div className="space-y-8 sm:space-y-10">
                {post.sections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="text-xl font-bold leading-tight text-white sm:text-2xl">{section.heading}</h2>
                    <div className="mt-4 space-y-4 text-[15px] leading-7 text-gray-300 sm:text-base sm:leading-8">
                      {section.paragraphs.map((paragraph, index) => (
                        <p key={`${section.heading}-${index}`}>{paragraph}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              <div className="mt-10 rounded-3xl border border-[#F59E0B]/20 bg-[linear-gradient(180deg,rgba(245,158,11,0.12),rgba(245,158,11,0.04))] p-5 sm:p-6">
                <h3 className="text-xl font-bold leading-tight text-white sm:text-2xl">{cta.title}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-200 sm:text-base sm:leading-7">
                  {cta.description}
                </p>
                <Button
                  onClick={() => window.open('https://wa.me/5515988015195', '_blank')}
                  className="mt-5 h-11 rounded-full bg-[#F59E0B] px-6 text-sm font-semibold text-black hover:bg-[#f7a91e] sm:h-12 sm:text-base"
                >
                  {cta.buttonLabel}
                </Button>
              </div>

              <div className="mt-10 border-t border-white/10 pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 sm:text-sm">Palavras-chave relacionadas</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full border border-[#F59E0B]/25 bg-[#F59E0B]/10 px-3 py-1.5 text-xs leading-5 text-[#F8C15C] sm:text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="border-t border-[#F59E0B]/10 bg-[#071120] py-12 sm:py-14">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">Continue navegando</p>
                <h2 className="mt-2 text-2xl font-bold">Outros artigos do blog</h2>
              </div>
              <Link to="/blog" className="hidden md:block">
                <Button variant="outline" className="border-[#F59E0B]/40 text-[#F59E0B] hover:bg-[#F59E0B] hover:text-black">
                  Ver todos os artigos
                </Button>
              </Link>
            </div>

            <div className="grid gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedPosts.map((item) => (
                <div key={item.slug} className="overflow-hidden rounded-[1.5rem] border border-[#F59E0B]/20 bg-white/5">
                  <div className="relative aspect-video w-full bg-black/60">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-contain p-2 sm:p-3"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold leading-snug sm:text-xl">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-gray-400">{item.excerpt}</p>
                    <Link to={`/blog/${item.slug}`} className="mt-5 inline-flex items-center font-semibold text-[#F59E0B] hover:text-[#f7a91e]">
                      Ler artigo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BlogPostPage;
