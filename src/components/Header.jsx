import React, { useState, useEffect, useRef } from 'react';
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
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { getItemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const headerRef = useRef(null);
  const itemCount = getItemCount();

  /* ── Detecta scroll e atualiza estado ── */
  useEffect(() => {
    const SCROLL_THRESHOLD = 80;

    // Obtém a posição de scroll independente de onde o scroll acontece
    const getScrollPosition = () =>
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    const handleScroll = () => {
      setIsScrolled(getScrollPosition() > SCROLL_THRESHOLD);
    };

    // Verifica posição inicial (caso a página já esteja rolada ao montar)
    handleScroll();

    // Ouve scroll no window, document e body para cobrir todos os casos
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    document.body.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
      document.body.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /* ── Atualiza variável CSS com a altura real do header ── */
  useEffect(() => {
    if (!headerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      document.documentElement.style.setProperty(
        '--header-h',
        `${entry.contentRect.height}px`
      );
    });
    ro.observe(headerRef.current);
    return () => ro.disconnect();
  }, []);

  /* ── Fecha menu mobile ao navegar ── */
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    setIsMobileMenuOpen(false);

    const performScrollToTop = () => {
      const heroSection = document.getElementById('identification');
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (location.pathname !== '/') {
      navigate('/');
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(performScrollToTop);
      });
      return;
    }

    performScrollToTop();
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isHome = location.pathname === '/';

  /* ── Classe do header baseada no estado ── */
  const headerClass = [
    'site-header',
    isMobileMenuOpen
      ? 'header-menu-open'
      : !isScrolled
        ? 'header-top'
        : 'header-scrolled',
  ].join(' ');

  return (
    <header ref={headerRef} className={headerClass}>
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-5 lg:px-8">
        <div className="flex h-[84px] items-center justify-between gap-4 lg:h-[92px]">

          {/* ── Logo ── */}
          <div className="flex shrink-0 items-center">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex"
              aria-label="Ir para o início"
            >
              <img
                src="/logo.png"
                alt="Bierz Logo"
                className="h-[56px] w-auto cursor-pointer transition-transform duration-300 hover:scale-105 sm:h-[62px] lg:h-[72px]"
              />
            </button>
          </div>

          {/* ── Navegação Desktop ── */}
          <nav className="ml-auto hidden items-center gap-4 lg:gap-6 md:flex">
            <button
              onClick={() => scrollToSection('section-how-it-works')}
              className="text-gray-200 hover:text-[#F59E0B] transition-colors duration-200 font-medium whitespace-nowrap"
            >
              Como funciona
            </button>
            <button
              onClick={() => scrollToSection('products')}
              className="text-gray-200 hover:text-[#F59E0B] transition-colors duration-200 font-medium whitespace-nowrap"
            >
              Produtos
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-200 hover:text-[#F59E0B] transition-colors duration-200 font-medium whitespace-nowrap"
            >
              Equipamentos
            </button>
            <button
              onClick={() => scrollToSection('calculator')}
              className="text-gray-200 hover:text-[#F59E0B] transition-colors duration-200 font-medium whitespace-nowrap"
            >
              Calculadora
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-200 hover:text-[#F59E0B] transition-colors duration-200 font-medium whitespace-nowrap"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-200 hover:text-[#F59E0B] transition-colors duration-200 font-medium whitespace-nowrap"
            >
              Contato
            </button>

            {/* Carrinho */}
            <Link to="/carrinho" className="relative ml-2">
              <Button
                variant="outline"
                size="icon"
                className="border-[#F59E0B]/50 text-[#F59E0B] hover:bg-[#F59E0B] hover:text-black"
              >
                <ShoppingCart className="w-5 h-5" />
              </Button>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#F59E0B] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>

            {/* Autenticação */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-[#F59E0B]/50 text-[#F59E0B] hover:bg-[#F59E0B] hover:text-black whitespace-nowrap"
                  >
                    <User className="w-4 h-4 mr-2" />
                    {user?.name?.split(' ')[0]}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-900 border-[#F59E0B]/30">
                  <DropdownMenuItem asChild>
                    <Link to="/perfil" className="text-gray-200 hover:text-[#F59E0B] cursor-pointer">
                      <User className="w-4 h-4 mr-2" />Meu Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/pedidos" className="text-gray-200 hover:text-[#F59E0B] cursor-pointer">
                      <ShoppingCart className="w-4 h-4 mr-2" />Meus Pedidos
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator className="bg-[#F59E0B]/30" />
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="text-[#F59E0B] cursor-pointer">
                          <Settings className="w-4 h-4 mr-2" />Painel Admin
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator className="bg-[#F59E0B]/30" />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button
                  variant="outline"
                  className="border-[#F59E0B]/50 text-[#F59E0B] hover:bg-[#F59E0B] hover:text-black whitespace-nowrap"
                >
                  <User className="w-4 h-4 mr-2" />
                  Entrar
                </Button>
              </Link>
            )}

            <Button
              onClick={() => window.open('https://wa.me/5515988015195', '_blank')}
              className="bg-[#F59E0B] hover:bg-[#F97316] text-black font-semibold transition-all duration-200 shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              <Phone className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
          </nav>

          {/* ── Botões Mobile ── */}
          <div className="ml-auto flex items-center gap-3 md:hidden">
            <Link to="/carrinho" className="relative">
              <Button
                variant="outline"
                size="icon"
                className="border-[#F59E0B]/50 text-[#F59E0B]"
              >
                <ShoppingCart className="w-5 h-5" />
              </Button>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#F59E0B] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-[#F59E0B] transition-colors"
              aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Menu Mobile ── */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col p-6 space-y-4">
            <button
              onClick={() => scrollToSection('section-how-it-works')}
              className="text-left text-lg text-gray-200 hover:text-[#F59E0B]"
            >
              Como funciona
            </button>
            <button
              onClick={() => scrollToSection('products')}
              className="text-left text-lg text-gray-200 hover:text-[#F59E0B]"
            >
              Produtos
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-left text-lg text-gray-200 hover:text-[#F59E0B]"
            >
              Equipamentos
            </button>
            <button
              onClick={() => scrollToSection('calculator')}
              className="text-left text-lg text-gray-200 hover:text-[#F59E0B]"
            >
              Calculadora
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-left text-lg text-gray-200 hover:text-[#F59E0B]"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-left text-lg text-gray-200 hover:text-[#F59E0B]"
            >
              Contato
            </button>
            <div className="pt-4 border-t border-white/10 flex flex-col gap-4">
              {!isAuthenticated && (
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full border-[#F59E0B]/50 text-[#F59E0B]"
                  >
                    Entrar
                  </Button>
                </Link>
              )}
              <Button
                onClick={() => window.open('https://wa.me/5515988015195', '_blank')}
                className="w-full bg-[#F59E0B] text-black font-bold"
              >
                WhatsApp
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
