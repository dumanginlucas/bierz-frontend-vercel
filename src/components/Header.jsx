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
      setIsScrolled(window.scrollY > 32);
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

  const headerShellClass = isScrolled
    ? 'bg-black/65 backdrop-blur-xl border border-white/10 shadow-[0_12px_35px_rgba(0,0,0,0.35)]'
    : 'bg-transparent border border-transparent shadow-none';

  const actionOutlineClass = 'border-[#F59E0B]/45 text-[#F59E0B] bg-black/10 hover:bg-[#F59E0B] hover:text-black';

  return (
    <header
      className="fixed top-0 left-0 z-50 w-full transition-all duration-300"
      style={{ right: 'var(--sbw, 0px)' }}
    >
      <div className="mx-auto w-full max-w-[1600px] px-3 pt-3 sm:px-4 md:px-6 lg:px-8">
        <div
          className={[
            'transition-all duration-300',
            isScrolled ? 'rounded-2xl' : 'rounded-none',
            headerShellClass,
          ].join(' ')}
        >
          <div className="flex min-h-[74px] items-center justify-between gap-3 px-3 sm:px-4 md:min-h-[84px] md:px-5 lg:px-6">
            <div className="flex shrink-0 items-center">
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
                  className={`w-auto cursor-pointer transition-all duration-300 hover:scale-105 ${isScrolled ? 'h-10 sm:h-11 md:h-12' : 'h-11 sm:h-12 md:h-14'}`}
                />
              </a>
            </div>

            <nav className="hidden items-center gap-4 lg:gap-5 xl:gap-6 md:flex">
              <button onClick={() => scrollToSection('section-how-it-works')} className="text-sm font-medium text-gray-100 transition-colors duration-200 hover:text-[#F59E0B] lg:text-base">Como funciona</button>
              <button onClick={() => scrollToSection('products')} className="text-sm font-medium text-gray-100 transition-colors duration-200 hover:text-[#F59E0B] lg:text-base">Produtos</button>
              <button onClick={() => scrollToSection('services')} className="text-sm font-medium text-gray-100 transition-colors duration-200 hover:text-[#F59E0B] lg:text-base">Equipamentos</button>
              <button onClick={() => scrollToSection('calculator')} className="text-sm font-medium text-gray-100 transition-colors duration-200 hover:text-[#F59E0B] lg:text-base">Calculadora</button>
              <button onClick={() => scrollToSection('about')} className="text-sm font-medium text-gray-100 transition-colors duration-200 hover:text-[#F59E0B] lg:text-base">Sobre</button>
              <button onClick={() => scrollToSection('contact')} className="text-sm font-medium text-gray-100 transition-colors duration-200 hover:text-[#F59E0B] lg:text-base">Contato</button>
            </nav>

            <div className="hidden items-center gap-2 lg:gap-3 md:flex">
              <Link to="/carrinho" className="relative shrink-0">
                <Button variant="outline" size="icon" className={actionOutlineClass}>
                  <ShoppingCart className="h-5 w-5" />
                </Button>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#F59E0B] text-xs font-bold text-black">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </Link>

              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className={`${actionOutlineClass} px-3`}>
                      <User className="mr-2 h-4 w-4" />
                      {user?.name?.split(' ')[0]}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="border-[#F59E0B]/30 bg-gray-900">
                    <DropdownMenuItem asChild><Link to="/perfil" className="cursor-pointer text-gray-200 hover:text-[#F59E0B]"><User className="mr-2 h-4 w-4" />Meu Perfil</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link to="/pedidos" className="cursor-pointer text-gray-200 hover:text-[#F59E0B]"><ShoppingCart className="mr-2 h-4 w-4" />Meus Pedidos</Link></DropdownMenuItem>
                    {isAdmin && (
                      <>
                        <DropdownMenuSeparator className="bg-[#F59E0B]/30" />
                        <DropdownMenuItem asChild><Link to="/admin" className="cursor-pointer text-[#F59E0B]"><Settings className="mr-2 h-4 w-4" />Painel Admin</Link></DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator className="bg-[#F59E0B]/30" />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500"><LogOut className="mr-2 h-4 w-4" />Sair</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/login">
                  <Button variant="outline" className={`${actionOutlineClass} px-4`}>
                    <User className="mr-2 h-4 w-4" />
                    Entrar
                  </Button>
                </Link>
              )}

              <Button onClick={() => window.open('https://wa.me/5515988015195', '_blank')} className="bg-[#F59E0B] px-4 text-black shadow-lg transition-all duration-200 hover:bg-[#F97316] hover:shadow-xl lg:px-5">
                <Phone className="mr-2 h-4 w-4" />
                WhatsApp
              </Button>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <Link to="/carrinho" className="relative">
                <Button variant="outline" size="icon" className={actionOutlineClass}>
                  <ShoppingCart className="h-5 w-5" />
                </Button>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#F59E0B] text-xs font-bold text-black">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </Link>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="rounded-xl border border-white/10 bg-black/20 p-2 text-white transition-colors hover:text-[#F59E0B]">
                {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="border-t border-white/10 bg-black/85 backdrop-blur-xl md:hidden">
              <nav className="flex flex-col gap-4 px-4 pb-5 pt-4 sm:px-5">
                <button onClick={() => scrollToSection('section-how-it-works')} className="text-left text-base text-gray-200 hover:text-[#F59E0B]">Como funciona</button>
                <button onClick={() => scrollToSection('products')} className="text-left text-base text-gray-200 hover:text-[#F59E0B]">Produtos</button>
                <button onClick={() => scrollToSection('services')} className="text-left text-base text-gray-200 hover:text-[#F59E0B]">Equipamentos</button>
                <button onClick={() => scrollToSection('calculator')} className="text-left text-base text-gray-200 hover:text-[#F59E0B]">Calculadora</button>
                <button onClick={() => scrollToSection('about')} className="text-left text-base text-gray-200 hover:text-[#F59E0B]">Sobre</button>
                <button onClick={() => scrollToSection('contact')} className="text-left text-base text-gray-200 hover:text-[#F59E0B]">Contato</button>
                <div className="flex flex-col gap-3 border-t border-white/10 pt-4">
                  {!isAuthenticated && (
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full border-[#F59E0B]/50 text-[#F59E0B] hover:bg-[#F59E0B] hover:text-black">Entrar</Button>
                    </Link>
                  )}
                  <Button onClick={() => window.open('https://wa.me/5515988015195', '_blank')} className="w-full bg-[#F59E0B] font-bold text-black hover:bg-[#F97316]">WhatsApp</Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
