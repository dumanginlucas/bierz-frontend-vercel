import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { getBlogPostBySlug, getRelatedPosts, blogCategories } from '../data/blogPosts';

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
        <section className="border-b border-[#F59E0B]/10 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.16),_transparent_34%),linear-gradient(to_bottom,#091226,#000000_56%)] pt-28 pb-10">
          <div className="container mx-auto max-w-4xl px-4">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-[#F8C15C] transition hover:text-[#F59E0B]">
              <ArrowLeft className="h-4 w-4" />
              Voltar para todos os artigos
            </Link>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-[#F59E0B]/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#F59E0B]">
                {blogCategories.find((item) => item.id === post.category)?.name || post.category}
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-300">SEO local</span>
            </div>
            <h1 className="mt-5 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">{post.title}</h1>
            <p className="mt-5 text-lg leading-8 text-gray-300">{post.seoDescription}</p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-400">
              <span className="inline-flex items-center gap-2"><User className="h-4 w-4" />{post.author}</span>
              <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4" />{post.date}</span>
              <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" />{post.readTime}</span>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="overflow-hidden rounded-3xl border border-[#F59E0B]/20 bg-white/5">
              <img src={post.image} alt={post.title} className="h-[260px] w-full object-cover sm:h-[360px]" />
            </div>

            <article className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
              <div className="space-y-8">
                {post.sections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="text-2xl font-bold text-white">{section.heading}</h2>
                    <div className="mt-4 space-y-4 text-base leading-8 text-gray-300">
                      {section.paragraphs.map((paragraph, index) => (
                        <p key={`${section.heading}-${index}`}>{paragraph}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              <div className="mt-10 rounded-2xl border border-[#F59E0B]/20 bg-[#F59E0B]/10 p-5">
                <h3 className="text-xl font-bold text-white">Precisa de chopp para seu evento?</h3>
                <p className="mt-2 text-gray-300">
                  A Bierz atende pedidos de chopp, chope e delivery em Sorocaba com foco em praticidade, apresentação e experiência para churrascos, festas e eventos.
                </p>
                <Button
                  onClick={() => window.open('https://wa.me/5515988015195', '_blank')}
                  className="mt-5 bg-[#F59E0B] text-black hover:bg-[#f7a91e]"
                >
                  Pedir pelo WhatsApp
                </Button>
              </div>

              <div className="mt-10 border-t border-white/10 pt-6">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-400">Palavras-chave relacionadas</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.keywords.map((keyword) => (
                    <span key={keyword} className="rounded-full border border-[#F59E0B]/25 bg-[#F59E0B]/10 px-3 py-1.5 text-sm text-[#F8C15C]">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="border-t border-[#F59E0B]/10 bg-[#071120] py-14">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mb-8 flex items-center justify-between gap-4">
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

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedPosts.map((item) => (
                <div key={item.slug} className="overflow-hidden rounded-3xl border border-[#F59E0B]/20 bg-white/5">
                  <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />
                  <div className="p-5">
                    <h3 className="text-xl font-bold leading-tight">{item.title}</h3>
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
