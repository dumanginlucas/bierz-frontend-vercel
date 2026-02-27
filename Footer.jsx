import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Beer, Phone, Mail, MapPin } from 'lucide-react';
import { companyInfo } from '../mock';
import { scrollToSection } from '../lib/scrollToSection';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const go = (id) => scrollToSection(id, { navigate, location });

  return (
    <footer className="border-t border-[#F59E0B]/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.png"
                alt="Bierz Logo"
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm mb-4">
              {companyInfo.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#F59E0B] font-bold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => go('identification')}
                  className="text-gray-400 hover:text-[#F59E0B] transition-colors text-sm"
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  onClick={() => go('how-it-works')}
                  className="text-gray-400 hover:text-[#F59E0B] transition-colors text-sm"
                >
                  Como Funciona
                </button>
              </li>
              <li>
                <button
                  onClick={() => go('products')}
                  className="text-gray-400 hover:text-[#F59E0B] transition-colors text-sm"
                >
                  Produtos
                </button>
              </li>
              <li>
                <button
                  onClick={() => go('services')}
                  className="text-gray-400 hover:text-[#F59E0B] transition-colors text-sm"
                >
                  Serviços
                </button>
              </li>
              <li>
                <button
                  onClick={() => go('calculator')}
                  className="text-gray-400 hover:text-[#F59E0B] transition-colors text-sm"
                >
                  Calculadora de Chopp
                </button>
              </li>
              <li>
                <button
                  onClick={() => go('about')}
                  className="text-gray-400 hover:text-[#F59E0B] transition-colors text-sm"
                >
                  Sobre Nós
                </button>
              </li>
              <li>
                <button
                  onClick={() => go('contact')}
                  className="text-gray-400 hover:text-[#F59E0B] transition-colors text-sm"
                >
                  Contato
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-[#F59E0B] font-bold text-lg mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#F59E0B] flex-shrink-0 mt-1" />
                <a
                  href={`https://wa.me/${companyInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#F59E0B] transition-colors text-sm"
                >
                  {companyInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#F59E0B] flex-shrink-0 mt-1" />
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="text-gray-400 hover:text-[#F59E0B] transition-colors text-sm"
                >
                  {companyInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#F59E0B] flex-shrink-0 mt-1" />
                <span className="text-gray-400 text-sm">{companyInfo.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#F59E0B]/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Bierz - Distribuidora de Chopp e Cervejas. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Beer className="w-4 h-4 text-[#F59E0B]" />
              <span>Beba com moderação</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
