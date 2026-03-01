import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { useCart } from '../contexts/CartContext';
import axios from 'axios';
import {
  Beer, Wine, Snowflake, Zap, CupSoda, ShoppingCart,
  GlassWater, Plus, Minus, Truck, Sparkles, Droplets
} from 'lucide-react';
import ProductSkeleton from './ProductSkeleton';

const API_URL = process.env.REACT_APP_BACKEND_URL;

/* ─── Mapeamento icon-name → componente Lucide ─── */
const ICON_MAP = {
  beer: Beer,
  wine: Wine,
  star: Sparkles,
  snowflake: Snowflake,
  zap: Zap,
  'cup-soda': CupSoda,
  'glass-water': GlassWater,
  droplets: Droplets,
};

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('chopp');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageAnim, setModalImageAnim] = useState(false);
  const { addItem } = useCart();

  /* Animação da imagem no modal (fade + scale) */
  useEffect(() => {
    if (!modalOpen || !selectedProduct) {
      setModalImageAnim(false);
      return;
    }
    setModalImageAnim(false);
    const t = setTimeout(() => setModalImageAnim(true), 60);
    return () => clearTimeout(t);
  }, [modalOpen, selectedProduct?.id]);

  const categoryOrder = ['chopp', 'cerveja-especial', 'energetico', 'copos', 'gelo', 'outras', 'todos'];

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/products`);
      setProducts(response.data);
      const initQuantities = {};
      const initSizes = {};
      response.data.forEach(p => {
        initQuantities[p.id] = p.price_unit === 'litro' ? 30 : 1;
        initSizes[p.id] = p.sizes[0] || '';
      });
      setQuantities(initQuantities);
      setSelectedSizes(initSizes);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/categories`);
      const filteredAndSorted = response.data
        .filter(cat => categoryOrder.includes(cat.id))
        .sort((a, b) => categoryOrder.indexOf(a.id) - categoryOrder.indexOf(b.id));
      setCategories(filteredAndSorted);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const filteredProducts = selectedCategory === 'todos'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const formatTagLabel = (key) => {
    if (!key) return '';
    if (key === 'destaque') return 'Destaque';
    const s = String(key).replace(/_/g, ' ').trim();
    return s.length ? s.charAt(0).toUpperCase() + s.slice(1) : '';
  };

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const orderA = (a.order && a.order > 0) ? a.order : 9999;
    const orderB = (b.order && b.order > 0) ? b.order : 9999;
    if (orderA !== orderB) return orderA - orderB;
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return (a.name ?? '').localeCompare(b.name ?? '', 'pt-BR');
  });

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    const size = selectedSizes[product.id] || product.sizes[0];
    addItem(product, quantity, size);
  };

  const updateQuantity = (productId, delta, isLitro) => {
    setQuantities(prev => {
      const current = prev[productId] || (isLitro ? 30 : 1);
      const step = isLitro ? 10 : 1;
      const min = isLitro ? 20 : 1;
      return { ...prev, [productId]: Math.max(min, current + delta * step) };
    });
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  /* Renderiza ícone a partir do nome da categoria */
  const renderIcon = (iconName, className = 'w-4 h-4') => {
    const IconComponent = ICON_MAP[iconName] || Beer;
    return <IconComponent className={className} />;
  };

  const formatPrice = (price) =>
    price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  /* ── Loading skeleton ── */
  if (loading) {
    return (
      <section id="products" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              Nossos{' '}
              <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                Produtos
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto px-4">
              Oferecemos uma ampla variedade de produtos gelados para tornar seu evento inesquecível
            </p>
          </div>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ── Main render ── */
  return (
    <section id="products" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">

        {/* Título */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3 sm:mb-4">
            Nossos{' '}
            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
              Produtos
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto px-4">
            Oferecemos uma ampla variedade de produtos gelados para tornar seu evento inesquecível
          </p>
        </div>

        {/* ════════════════════════════════════════════════
            NOVA BARRA DE CATEGORIAS — design base44
            ════════════════════════════════════════════════ */}
        <div className="flex mb-8 md:justify-center"
          <div className="w-full overflow-x-auto scrollbar-hide touch-pan-x md:overflow-visible"
            <div className="flex w-max px-4 md:w-full md:justify-center"
              <nav
                className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-1.5 gap-1 shadow-2xl shadow-black/60 min-w-max md:min-w-0"
                role="tablist"
                aria-label="Categorias de produtos"
              >
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={[
                        'relative flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm',
                        'transition-all duration-200 whitespace-nowrap shrink-0 outline-none',
                        'focus-visible:ring-2 focus-visible:ring-amber-500/60',
                        isActive
                          ? 'bg-amber-500 text-black shadow-md shadow-amber-500/30'
                          : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/70',
                      ].join(' ')}
                      data-testid={`category-${cat.id}`}
                    >
                      {/* Ícone — cinza quando inativo, preto quando ativo */}
                      <span className={`flex-shrink-0 ${isActive ? 'text-black' : 'text-zinc-500'}`}>
                        {renderIcon(cat.icon, 'w-5 h-5')}
                      </span>
                      {/* Texto: completo em sm+, primeira palavra em mobile */}
                      <span className="hidden sm:inline">{cat.name}</span>
                      <span className="sm:hidden">{cat.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
        {/* ════════════════════════════════════════════════ */}

        {/* Banner entrega grátis */}
        <div
          className="bg-gradient-to-r from-green-600/20 to-green-500/10 border border-green-500/30 rounded-xl p-4 mb-8
            flex items-center justify-center gap-3
            transition-all duration-300
            hover:shadow-lg hover:shadow-green-500/20 hover:border-green-500/50"
        >
          <Truck className="w-6 h-6 text-green-400" />
          <p className="text-green-400 font-semibold text-lg">
            Compras acima de 30 litros de Chopp recebem entrega grátis!
          </p>
        </div>

        {/* Grid de produtos */}
        <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {sortedProducts.map((product) => {
            const isLitro = product.price_unit === 'litro';
            const quantity = quantities[product.id] || (isLitro ? 30 : 1);
            const totalPrice = product.price * quantity;

            return (
              <Card
                key={product.id}
                className="bg-white/5 border-amber-500/20 hover:border-amber-500 overflow-hidden cursor-pointer
                  transition-all duration-200 ease-out
                  hover:shadow-xl hover:shadow-amber-500/10
                  hover:-translate-y-1 active:scale-[0.98] group"
                data-testid={`product-card-${product.id}`}
                onClick={() => openProductModal(product)}
              >
                {/* Imagem */}
                <div className="relative aspect-[8/9] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {(product.social_tag || product.featured) && (
                    <div className="absolute top-2 left-2">
                      <Badge
                        className="bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold flex items-center gap-1"
                        style={{ textTransform: 'none' }}
                      >
                        {(product.social_tag || (product.featured ? 'destaque' : null)) === 'destaque' && (
                          <Sparkles className="w-3 h-3" />
                        )}
                        {formatTagLabel(product.social_tag || (product.featured ? 'destaque' : ''))}
                      </Badge>
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-black font-semibold text-xs px-2 py-0.5">
                      {categories.find(c => c.id === product.category)?.name || product.category}
                    </Badge>
                  </div>
                  {product.stock < 10 && product.stock > 0 && !product.featured && (
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-red-500 text-white text-xs px-2 py-0.5">Últimas un.</Badge>
                    </div>
                  )}
                </div>

                {/* Conteúdo */}
                <div className="p-3">
                  <h3 className="text-white text-sm font-bold mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-orange-600 group-hover:bg-clip-text transition-all line-clamp-1">
                    {product.name}
                  </h3>
                  {product.brand && (
                    <p className="text-amber-500 text-xs font-semibold mb-1">{product.brand}</p>
                  )}
                  <p className="text-gray-400 text-xs mb-2 line-clamp-1">{product.description}</p>

                  {(product.abv || product.ibu) && (
                    <div className="flex items-center gap-2 mb-2">
                      {product.abv && (
                        <Badge variant="outline" className="text-xs border-amber-500/50 text-amber-500 px-1.5 py-0">
                          {product.abv}% ABV
                        </Badge>
                      )}
                      {product.ibu && (
                        <Badge variant="outline" className="text-xs border-amber-500/50 text-amber-500 px-1.5 py-0">
                          {product.ibu} IBU
                        </Badge>
                      )}
                    </div>
                  )}

                  <div className="mb-2">
                    <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent font-bold text-base">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-gray-400 text-xs">/{product.price_unit}</span>
                  </div>

                  {product.sizes.length > 1 && !isLitro && (
                    <div className="mb-2" onClick={(e) => e.stopPropagation()}>
                      <Select
                        value={selectedSizes[product.id]}
                        onValueChange={(value) =>
                          setSelectedSizes(prev => ({ ...prev, [product.id]: value }))
                        }
                      >
                        <SelectTrigger className="h-8 text-xs bg-gray-900/50 border-amber-500/30 text-white">
                          <SelectValue placeholder="Tamanho" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-amber-500/30">
                          {product.sizes.map(size => (
                            <SelectItem key={size} value={size} className="text-white text-xs">
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div
                    className="flex items-center justify-between gap-2 mb-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-1.5">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 border-amber-500/30 text-amber-500 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-600 hover:text-black hover:border-transparent transition-all duration-150 active:scale-[0.90]"
                        onClick={(e) => { e.stopPropagation(); updateQuantity(product.id, -1, isLitro); }}
                        data-testid={`decrease-qty-${product.id}`}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="text-white text-sm font-bold min-w-[2rem] text-center">
                        {quantity}{isLitro ? 'L' : ''}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 border-amber-500/30 text-amber-500 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-600 hover:text-black hover:border-transparent transition-all duration-150 active:scale-[0.90]"
                        onClick={(e) => { e.stopPropagation(); updateQuantity(product.id, 1, isLitro); }}
                        data-testid={`increase-qty-${product.id}`}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent font-bold text-base leading-tight">
                      {formatPrice(totalPrice)}
                    </div>
                  </div>

                  <Button
                    onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                    className="w-full h-8 text-xs bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-semibold shadow-lg shadow-orange-500/30 transition-all duration-150 hover:brightness-110 active:scale-[0.97]"
                    disabled={product.stock === 0}
                    data-testid={`add-to-cart-${product.id}`}
                  >
                    <ShoppingCart className="w-3 h-3 mr-1" />
                    {product.stock === 0 ? 'Esgotado' : 'Adicionar'}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Estado vazio */}
        {sortedProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center opacity-0 animate-[fadeUp_400ms_ease-out_forwards]">
            <div className="max-w-md rounded-2xl bg-white/5 backdrop-blur-sm p-8 border border-white/10 shadow-xl">
              <div className="mb-4 text-5xl animate-bounce">🍺</div>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-3">
                Nenhum produto nessa categoria
              </h3>
              <p className="text-sm sm:text-base text-white/70 mb-6">
                Não encontramos produtos na categoria selecionada. Que tal explorar outras opções?
              </p>
              <button
                onClick={() => setSelectedCategory('todos')}
                className="h-12 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-black font-semibold transition-all duration-150 hover:brightness-110 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-500/30 active:scale-[0.97]"
              >
                <Beer className="inline-block w-5 h-5 mr-2" />
                Ver Todos os Produtos
              </button>
              <div className="mt-8">
                <p className="text-xs sm:text-sm text-white/50 mb-3">Categorias populares:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {categories
                    .filter(c => c.id !== selectedCategory && c.id !== 'todos')
                    .slice(0, 4)
                    .map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-white/5 border border-amber-500/30 text-gray-300 hover:border-amber-500 hover:text-amber-500 hover:-translate-y-0.5 transition-all duration-150 active:scale-[0.95]"
                      >
                        {renderIcon(cat.icon)}
                        {cat.name}
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Modal de detalhe do produto ── */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="bg-gray-900 border-amber-500/30 text-white max-w-2xl max-h-[90vh] overflow-y-auto modal-scrollbar p-0 [&>button[aria-label='Close']]:hidden">
          <div className="sticky top-2 z-50 flex justify-end px-2 pt-2">
            <button
              onClick={() => setModalOpen(false)}
              className="h-9 w-9 rounded-full border border-amber-600/60 text-white flex items-center justify-center hover:bg-white/5 transition"
              aria-label="Fechar"
            >
              ✕
            </button>
          </div>

          {selectedProduct && (() => {
            const isLitro = selectedProduct.price_unit === 'litro';
            const quantity = quantities[selectedProduct.id] || (isLitro ? 30 : 1);
            const totalPrice = selectedProduct.price * quantity;

            return (
              <>
                <div className="pt-1 sm:pt-2">
                  <div className="relative">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      loading="lazy"
                      decoding="async"
                      className={`w-full max-h-[260px] sm:max-h-[340px] object-contain mx-auto transition-all duration-700 ease-out will-change-transform ${
                        modalImageAnim ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.08]'
                      }`}
                    />
                    {(selectedProduct.social_tag || selectedProduct.featured) && (
                      <div className="absolute top-4 left-4">
                        <Badge
                          className="bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold flex items-center gap-1"
                          style={{ textTransform: 'none' }}
                        >
                          {(selectedProduct.social_tag || (selectedProduct.featured ? 'destaque' : null)) === 'destaque' && (
                            <Sparkles className="w-4 h-4" />
                          )}
                          {formatTagLabel(selectedProduct.social_tag || (selectedProduct.featured ? 'destaque' : ''))}
                        </Badge>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-black font-semibold">
                        {categories.find(c => c.id === selectedProduct.category)?.name || selectedProduct.category}
                      </Badge>
                    </div>
                    {selectedProduct.stock < 10 && selectedProduct.stock > 0 && (
                      <div className="absolute bottom-4 left-4">
                        <Badge className="bg-red-500 text-white">Últimas unidades!</Badge>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{selectedProduct.name}</h2>

                  {selectedProduct.brand && (
                    <p className="text-amber-500 text-lg font-semibold mb-3">{selectedProduct.brand}</p>
                  )}

                  {(selectedProduct.abv || selectedProduct.ibu) && (
                    <div className="flex items-center gap-3 mb-4">
                      {selectedProduct.abv && (
                        <Badge variant="outline" className="border-amber-500/50 text-amber-500 px-3 py-1">
                          🍺 {selectedProduct.abv}% ABV
                        </Badge>
                      )}
                      {selectedProduct.ibu && (
                        <Badge variant="outline" className="border-amber-500/50 text-amber-500 px-3 py-1">
                          🌿 {selectedProduct.ibu} IBU
                        </Badge>
                      )}
                    </div>
                  )}

                  <div className="mb-4">
                    <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent font-bold text-3xl">
                      {formatPrice(selectedProduct.price)}
                    </span>
                    <span className="text-gray-400 text-lg">/{selectedProduct.price_unit}</span>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-amber-500 font-semibold mb-2">Descrição</h3>
                    <p className="text-gray-300 leading-relaxed">{selectedProduct.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-gray-400 text-sm">Tamanhos disponíveis</p>
                      <p className="text-white font-semibold">{selectedProduct.sizes.join(', ')}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-gray-400 text-sm">Disponibilidade</p>
                      <p className={`font-semibold ${selectedProduct.stock > 10 ? 'text-green-500' : selectedProduct.stock > 0 ? 'text-yellow-500' : 'text-red-500'}`}>
                        {selectedProduct.stock > 10
                          ? 'Em estoque'
                          : selectedProduct.stock > 0
                          ? `Apenas ${selectedProduct.stock} ${isLitro ? 'L' : 'un.'} restantes`
                          : 'Esgotado'}
                      </p>
                    </div>
                  </div>

                  {selectedProduct.sizes.length > 1 && !isLitro && (
                    <div className="mb-4">
                      <label className="text-gray-400 text-sm block mb-2">Selecione o tamanho:</label>
                      <Select
                        value={selectedSizes[selectedProduct.id]}
                        onValueChange={(value) =>
                          setSelectedSizes(prev => ({ ...prev, [selectedProduct.id]: value }))
                        }
                      >
                        <SelectTrigger className="bg-black/50 border-amber-500/30 text-white">
                          <SelectValue placeholder="Tamanho" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-amber-500/30">
                          {selectedProduct.sizes.map(size => (
                            <SelectItem key={size} value={size} className="text-white">
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="mb-4">
                    <label className="text-gray-400 text-sm block mb-2">
                      Quantidade {isLitro ? '(litros)' : ''}:
                    </label>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 border-amber-500/30 text-amber-500 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-600 hover:text-black hover:border-transparent"
                        onClick={() => updateQuantity(selectedProduct.id, -1, isLitro)}
                      >
                        <Minus className="w-5 h-5" />
                      </Button>
                      <span className="text-white text-2xl font-bold w-20 text-center">
                        {quantity}{isLitro ? 'L' : ''}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 border-amber-500/30 text-amber-500 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-600 hover:text-black hover:border-transparent"
                        onClick={() => updateQuantity(selectedProduct.id, 1, isLitro)}
                      >
                        <Plus className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-amber-500/10 to-orange-600/10 rounded-lg p-4 mb-6 border border-amber-500/20">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-lg">Total:</span>
                      <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent font-bold text-2xl">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={() => { handleAddToCart(selectedProduct); setModalOpen(false); }}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-bold text-lg py-6 shadow-lg shadow-orange-500/30"
                    disabled={selectedProduct.stock === 0}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {selectedProduct.stock === 0 ? 'Produto Esgotado' : 'Adicionar ao Carrinho'}
                  </Button>
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Products;
