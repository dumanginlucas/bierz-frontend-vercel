import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

const BlogCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else setItemsPerPage(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1 >= blogPosts.length ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? blogPosts.length - 1 : prev - 1));
  };

  const visiblePosts = [];
  for (let i = 0; i < itemsPerPage; i++) {
    visiblePosts.push(blogPosts[(currentIndex + i) % blogPosts.length]);
  }

  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h4 className="text-2xl font-bold text-white uppercase tracking-tight">Destaques do Blog</h4>
          <p className="text-zinc-500 text-xs uppercase tracking-widest mt-1">Dicas e curiosidades sobre o mundo do chopp</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={prevSlide}
            className="p-2 rounded-full bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextSlide}
            className="p-2 rounded-full bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="wait">
          {visiblePosts.map((post, idx) => (
            <motion.div
              key={`${post.slug}-${currentIndex}-${idx}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="group bg-zinc-900/30 border border-white/5 rounded-2xl overflow-hidden hover:border-amber-500/20 transition-all flex flex-col h-full"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
              </div>
              
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-3">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                </div>
                
                <h5 className="text-base font-bold text-white mb-3 line-clamp-2 group-hover:text-amber-500 transition-colors">
                  {post.title}
                </h5>
                
                <p className="text-xs text-zinc-500 leading-relaxed line-clamp-3 mb-6 flex-1">
                  {post.excerpt}
                </p>
                
                <Link 
                  to={`/blog/${post.slug}`}
                  onClick={() => {
                    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
                    document.documentElement.scrollTop = 0;
                    document.body.scrollTop = 0;
                  }}
                  className="inline-flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest group/link"
                >
                  Ler artigo 
                  <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-10 text-center">
        <Link 
          to="/blog"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
        >
          Ver todos os artigos
        </Link>
      </div>
    </div>
  );
};

export default BlogCarousel;
