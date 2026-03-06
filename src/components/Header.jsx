import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ShoppingCart, User, LogOut, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { getItemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const itemCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const headerEl = document.querySelector('header');
    if (!headerEl || typeof ResizeObserver === 'undefined') return;

    const setHeaderH = () => {
      const h = headerEl.offsetHeight || 0;
      document.documentElement.style.setProperty('--header-h', `${h}px`);
    };

    const setScrollbarW = () => {
      const sbw = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.setProperty('--sbw', `${Math.max(0, sbw)}px`);
    };

    setHeaderH();
    setScrollbarW();

    const ro = new ResizeObserver(setHeaderH);
    ro.observe(headerEl);

    window.addEventListener('resize', setScrollbarW);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', setScrollbarW);
    };
  }, []);

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
      return;
    }
    const doScroll = () => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    requestAnimationFrame(() => requestAnimationFrame(doScroll));
  };

  const scrollToTop = () => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: 'top' } });
      return;
    }
    const element = document.getElementById('identification');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (location.state?.scrollTo) {
      const id = location.state.scrollTo;
      const t = setTimeout(() => {
        if (id === 'top') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
      window.history.replaceState({}, document.title);
      return () => clearTimeout(t);
    }
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const desktopNavLinkClass =
    'text-[15px] lg:text-base text-gray-100/95 hover:text-[#F59E0B] transition-colors duration-200 font-semibold whitespace-nowrap';

  const mobileMenuPanelClass = isScrolled
    ? 'bg-black/85 backdrop-blur-xl border-white/10 shadow-2xl'
    : 'bg-black/70 backdrop-blur-lg border-white/10';

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-black/45 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.25)]'
          : 'bg-transparent border-b border-transparent'
      }`}
      style={{ right: 'var(--sbw, 0px)' }}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[86px] items-center gap-4 lg:min-h-[92px]">
          <div className="shrink-0">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="inline-flex"
              aria-label="Ir para o topo"
            >
              <img
                src="/logo.png"
                alt="Bierz Logo"
                className="h-[64px] w-auto cursor-pointer object-contain transition-transform duration-300 hover:scale-105 sm:h-[72px] lg:h-[78px]"
              />
            </a>
          </div>

          <div className="hidden min-w-0 flex-1 items-center justify-end gap-4 md:flex lg:gap-6 xl:gap-8">
            <nav className="flex min-w-0 items-center justify-end gap-4 lg:gap-5 xl:gap-6">
              <button onClick={() => scrollToSection('section-how-it-works')} className={desktopNavLinkClass}>Como funciona</button>
              <button onClick={() => scrollToSection('products')} className={desktopNavLinkClass}>Produtos</button>
              <button onClick={() => scrollToSection('services')} className={desktopNavLinkClass}>Equipamentos</button>
              <button onClick={() => scrollToSection('calculator')} className={desktopNavLinkClass}>Calculadora</button>
              <button onClick={() => scrollToSection('about')} className={desktopNavLinkClass}>Sobre</button>
              <button onClick={() => scrollToSection('contact')} className={desktopNavLinkClass}>Contato</button>
            </nav>

            <div className="flex shrink-0 items-center gap-3 lg:gap-4">
              <Link to="/carrinho" className="relative">
                <Button variant="outline" size="icon" className="border-[#F59E0B]/50 text-[#F59E0B] hover:bg-[#F59E0B] hover:text-black">
                  <ShoppingCart className="w-5 h-5" />
                </Button>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#F59E0B] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </Link>

              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="border-[#F59E0B]/50 text-[#F59E0B] hover:bg-[#F59E0B] hover:text-black">
                      <User className="w-4 h-4 mr-2" />
                      {user?.name?.split(' ')[0]}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-gray-900 border-[#F59E0B]/30">
                    <DropdownMenuItem asChild><Link to="/perfil" className="text-gray-200 hover:text-[#F59E0B] cursor-pointer"><User className="w-4 h-4 mr-2" />Meu Perfil</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link to="/pedidos" className="text-gray-200 hover:text-[#F59E0B] cursor-pointer"><ShoppingCart className="w-4 h-4 mr-2" />Meus Pedidos</Link></DropdownMenuItem>
                    {isAdmin && (
                      <>
                        <DropdownMenuSeparator className="bg-[#F59E0B]/30" />
                        <DropdownMenuItem asChild><Link to="/admin" className="text-[#F59E0B] cursor-pointer"><Settings className="w-4 h-4 mr-2" />Painel Admin</Link></DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator className="bg-[#F59E0B]/30" />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer"><LogOut className="w-4 h-4 mr-2" />Sair</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/login">
                  <Button variant="outline" className="border-[#F59E0B]/50 text-[#F59E0B] hover:bg-[#F59E0B] hover:text-black">
                    <User className="w-4 h-4 mr-2" />
                    Entrar
                  </Button>
                </Link>
              )}

              <Button onClick={() => window.open('https://wa.me/5515988015195', '_blank')} className="bg-[#F59E0B] hover:bg-[#F97316] text-black font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
                <Phone className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3 md:hidden">
            <Link to="/carrinho" className="relative">
              <Button variant="outline" size="icon" className="border-[#F59E0B]/50 text-[#F59E0B]">
                <ShoppingCart className="w-5 h-5" />
              </Button>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#F59E0B] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white hover:text-[#F59E0B] transition-colors">
              {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className={`md:hidden border-t animate-in slide-in-from-top duration-300 ${mobileMenuPanelClass}`}>
          <nav className="flex flex-col p-6 space-y-4">
            <button onClick={() => scrollToSection('section-how-it-works')} className="text-left text-lg text-gray-200 hover:text-[#F59E0B]">Como funciona</button>
            <button onClick={() => scrollToSection('products')} className="text-left text-lg text-gray-200 hover:text-[#F59E0B]">Produtos</button>
            <button onClick={() => scrollToSection('services')} className="text-left text-lg text-gray-200 hover:text-[#F59E0B]">Equipamentos</button>
            <button onClick={() => scrollToSection('calculator')} className="text-left text-lg text-gray-200 hover:text-[#F59E0B]">Calculadora</button>
            <button onClick={() => scrollToSection('about')} className="text-left text-lg text-gray-200 hover:text-[#F59E0B]">Sobre</button>
            <button onClick={() => scrollToSection('contact')} className="text-left text-lg text-gray-200 hover:text-[#F59E0B]">Contato</button>
            <div className="pt-4 border-t border-white/10 flex flex-col gap-4">
              {!isAuthenticated && (
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-[#F59E0B]/50 text-[#F59E0B]">Entrar</Button>
                </Link>
              )}
              <Button onClick={() => window.open('https://wa.me/5515988015195', '_blank')} className="w-full bg-[#F59E0B] text-black font-bold">WhatsApp</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
