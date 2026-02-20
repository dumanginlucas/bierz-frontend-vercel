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
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    
    // Se não estiver na home, navega para home primeiro
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
      return;
    }
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Efeito para scroll após navegação
  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(location.state.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      // Limpa o state
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-md shadow-lg' : 'bg-black/95 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-28 md:h-32">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img
                src="/logo.jpg"
                alt="Bierz Logo"
                className="h-20 md:h-24 w-auto cursor-pointer transition-transform hover:scale-105"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-gray-200 hover:text-[#F59E0B] transition-colors duration-200 font-medium"
            >
              Como funciona
            </button>
<button
              onClick={() => scrollToSection('products')}
              className="text-gray-200 hover:text-[#F59E0B] transition-colors duration-200 font-medium"
            >
              Produtos
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-200 hover:text-[#F59E0B] transition-colors duration-200 font-medium"
            >
              Serviço
            </button>
            <button
              onClick={() => scrollToSection('calculator')}
              className="text-gray-200 hover:text-[#F59E0B] transition-colors duration-200 font-medium"
            >
              Calculadora
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-200 hover:text-[#F59E0B] transition-colors duration-200 font-medium"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-200 hover:text-[#F59E0B] transition-colors duration-200 font-medium"
            >
              Contato
            </button>

            {/* Cart Button */}
            <Link to="/carrinho" className="relative">
              <Button
                variant="outline"
                size="icon"
                className="border-[#F59E0B]/50 text-[#F59E0B] hover:bg-[#F59E0B] hover:text-black"
                data-testid="cart-button"
              >
                <ShoppingCart className="w-5 h-5" />
              </Button>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#F59E0B] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>

            {/* Auth */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-[#F59E0B]/50 text-[#F59E0B] hover:bg-[#F59E0B] hover:text-black"
                    data-testid="user-menu"
                  >
                    <User className="w-4 h-4 mr-2" />
                    {user?.name?.split(' ')[0]}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-900 border-[#F59E0B]/30">
                  <DropdownMenuItem asChild>
                    <Link to="/perfil" className="text-gray-200 hover:text-[#F59E0B] cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      Meu Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/pedidos" className="text-gray-200 hover:text-[#F59E0B] cursor-pointer">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Meus Pedidos
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator className="bg-[#F59E0B]/30" />
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="text-[#F59E0B] cursor-pointer">
                          <Settings className="w-4 h-4 mr-2" />
                          Painel Admin
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator className="bg-[#F59E0B]/30" />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="text-red-500 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button
                  variant="outline"
                  className="border-[#F59E0B]/50 text-[#F59E0B] hover:bg-[#F59E0B] hover:text-black"
                  data-testid="login-button"
                >
                  <User className="w-4 h-4 mr-2" />
                  Entrar
                </Button>
              </Link>
            )}

            <Button
              onClick={() => window.open('https://wa.me/5515988015195', '_blank')}
              className="bg-[#F59E0B] hover:bg-[#F97316] text-black font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Phone className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
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
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/98 backdrop-blur-md border-t border-[#F59E0B]/20 pb-4">
            <nav className="flex flex-col space-y-4 py-4">
              
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-gray-200 hover:text-[#F59E0B] transition-colors duration-200 font-medium text-left"
            >
              Como funciona
            </button>
<button
                onClick={() => scrollToSection('products')}
                className="text-gray-200 hover:text-[#F59E0B] transition-colors duration-200 font-medium text-left px-4 whitespace-nowrap text-base"
              >
                Produtos
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-gray-200 hover:text-[#F59E0B] transition-colors duration-200 font-medium text-left px-4 whitespace-nowrap text-base"
              >
                Serviço
              </button>
              <button
                onClick={() => scrollToSection('calculator')}
                className="text-gray-200 hover:text-[#F59E0B] transition-colors duration-200 font-medium text-left px-4 whitespace-nowrap text-base"
              >
                Calculadora
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-200 hover:text-[#F59E0B] transition-colors duration-200 font-medium text-left px-4 whitespace-nowrap text-base"
              >
                Sobre
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-200 hover:text-[#F59E0B] transition-colors duration-200 font-medium text-left px-4 whitespace-nowrap text-base"
              >
                Contato
              </button>
              
              <div className="px-4 pt-2 border-t border-[#F59E0B]/20 space-y-3">
                {isAuthenticated ? (
                  <>
                    <Link to="/perfil" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full border-[#F59E0B]/50 text-[#F59E0B]">
                        <User className="w-4 h-4 mr-2" />
                        Meu Perfil
                      </Button>
                    </Link>
                    <Link to="/pedidos" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full border-[#F59E0B]/50 text-[#F59E0B]">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Meus Pedidos
                      </Button>
                    </Link>
                    {isAdmin && (
                      <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                          <Settings className="w-4 h-4 mr-2" />
                          Painel Admin
                        </Button>
                      </Link>
                    )}
                    <Button 
                      onClick={handleLogout}
                      variant="outline" 
                      className="w-full border-red-500/50 text-red-500"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sair
                    </Button>
                  </>
                ) : (
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-[#F59E0B]/50 text-[#F59E0B]">
                      <User className="w-4 h-4 mr-2" />
                      Entrar / Cadastrar
                    </Button>
                  </Link>
                )}
                <Button
                  onClick={() => window.open('https://wa.me/5515988015195', '_blank')}
                  className="w-full bg-[#F59E0B] hover:bg-[#F97316] text-black font-semibold"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
