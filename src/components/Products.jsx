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
import { Beer, Wine, Star, Snowflake, Zap, CupSoda, ShoppingCart, GlassWater, Plus, Minus, Truck, Sparkles } from 'lucide-react';
import ProductSkeleton from './ProductSkeleton';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('chopp');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [socialTags, setSocialTags] = useState([]);
  const { addItem } = useCart();

  // Ordem desejada das categorias (removido 'cerveja')
  const categoryOrder = ['chopp', 'cerveja-especial', 'energetico', 'copos', 'gelo', 'outras', 'todos'];

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchSocialTags();
  }, []);

  const fetchSocialTags = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/social-tags`);
      setSocialTags(res.data || []);
    } catch (e) {
      // silencioso: site funciona mesmo sem tags
      console.warn('Error fetching social tags:', e);
    }
  };

  const getSocialTagDisplay = (product) => {
    const key = product?.social_tag || (product?.featured ? 'destaque' : null);
    if (!key) return null;
    const found = socialTags.find(t => t.key === key);
    if (found) return { key, label: found.label, emoji: found.emoji };
    // fallback mínimo para tags padrão
    const fallback = {
      destaque: { label: 'Destaque', emoji: '⭐' },
      mais_vendidos: { label: 'Mais vendidos', emoji: '🏆' },
      mais_pedido_semana: { label: 'Mais pedido da semana', emoji: '🔥' },
      preferido_aniversarios: { label: 'Preferido para aniversários', emoji: '🎉' },
      preferido_churrascos: { label: 'Preferido para churrascos', emoji: '🍖' },
      perfeito_eventos: { label: 'Perfeito para eventos', emoji: '🎊' },
      escolha_da_casa: { label: 'Escolha da casa', emoji: '✅' },
    };
    return { key, ...(fallback[key] || { label: key, emoji: '' }) };
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/products`);
      setProducts(response.data);
      // Initialize quantities and sizes
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
      // Filtrar apenas categorias desejadas e ordenar
      const filteredAndSorted = response.data
        .filter(cat => categoryOrder.includes(cat.id))
        .sort((a, b) => {
          const indexA = categoryOrder.indexOf(a.id);
          const indexB = categoryOrder.indexOf(b.id);
          return indexA - indexB;
        });
      setCategories(filteredAndSorted);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const filteredProducts = selectedCategory === 'todos'
    ? products
    : products.filter(p => p.category === selectedCategory);

  // Ordenação no frontend (fallback + garantia)
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    // 1. Por order (quem não tem vai pro fim com 9999)
    const orderA = a.order ?? 9999;
    const orderB = b.order ?? 9999;
    if (orderA !== orderB) return orderA - orderB;

    // 2. Por featured (destaques primeiro)
    if (a.featured !== b.featured) return a.featured ? -1 : 1;

    // 3. Por nome (alfabético)
    return (a.name ?? "").localeCompare(b.name ?? "", "pt-BR");
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
      const newVal = Math.max(min, current + (delta * step));
      return { ...prev, [productId]: newVal };
    });
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const renderIcon = (iconName) => {
    const icons = {
      'beer': <Beer className="w-4 h-4 mr-2" />,
      'wine': <Wine className="w-4 h-4 mr-2" />,
      'star': <Sparkles className="w-4 h-4 mr-2" />,  // ✅ Trocado para Sparkles (cervejas especiais)
      'snowflake': <Snowflake className="w-4 h-4 mr-2" />,
      'zap': <Zap className="w-4 h-4 mr-2" />,
      'cup-soda': <CupSoda className="w-4 h-4 mr-2" />,
      'glass-water': <GlassWater className="w-4 h-4 mr-2" />
    };
    return icons[iconName] || <Beer className="w-4 h-4 mr-2" />;
  };

  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  if (loading) {
    return (
      <section id="products" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              Nossos <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">Produtos</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto px-4">
              Oferecemos uma ampla variedade de produtos gelados para tornar seu evento inesquecível
            </p>
          </div>

          {/* Skeleton Loading */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3 sm:mb-4">
            Nossos <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">Produtos</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto px-4">
            Oferecemos uma ampla variedade de produtos gelados para tornar seu evento inesquecível
          </p>
        </div>

        {/* ✅ Category Navigation Bar - Barra única responsiva sem cortar */}
        <div className="w-full mb-8 overflow-x-auto scrollbar-hide">
          <div className="flex px-4">
            <div className="inline-flex items-center bg-gray-900/90 backdrop-blur-sm rounded-lg p-1 gap-1 mx-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`
                    flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-md font-semibold text-xs sm:text-sm transition-all duration-300 whitespace-nowrap shrink-0
                    ${selectedCategory === cat.id 
                      ? 'bg-[#F59E0B] text-black shadow-md' 
                      : 'text-gray-300 hover:text-gray-100'
                    }
                  `}
                  data-testid={`category-${cat.id}`}
                >
                  {renderIcon(cat.icon)}
                  <span className="hidden sm:inline">{cat.name}</span>
                  <span className="sm:hidden">{cat.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Free Delivery Banner */}
        <div className="bg-gradient-to-r from-green-600/20 to-green-500/10 border border-green-500/30 rounded-xl p-4 mb-8 flex items-center justify-center gap-3
          transition-all duration-300
          hover:shadow-lg hover:shadow-green-500/20
          hover:border-green-500/50">
          <Truck className="w-6 h-6 text-green-400" />
          <p className="text-green-400 font-semibold text-lg">
            Compras acima de 30 litros de Chopp recebem entrega grátis!
          </p>
        </div>

        {/* ✅ FIX: 1 coluna no mobile, 2 apenas a partir de 420px */}
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
                  hover:-translate-y-1
                  active:scale-[0.98]
                  group"
                data-testid={`product-card-${product.id}`}
                onClick={() => openProductModal(product)}
              >
                {/* Imagem com proporção equilibrada */}
                <div className="relative aspect-[8/9] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Social Tag (Prova social) */}
                  {getSocialTagDisplay(product) && (
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold text-xs px-2 py-1 flex items-center gap-1">
                        {getSocialTagDisplay(product).emoji ? (
                          <span>{getSocialTagDisplay(product).emoji}</span>
                        ) : (
                          <Sparkles className="w-3 h-3" />
                        )}
                        {getSocialTagDisplay(product).label}
                      </Badge>
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-black font-semibold text-xs px-2 py-0.5">
                      {categories.find(c => c.id === product.category)?.name || product.category}
                    </Badge>
                  </div>
                  {product.stock < 10 && product.stock > 0 && !getSocialTagDisplay(product) && (
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-red-500 text-white text-xs px-2 py-0.5">Últimas un.</Badge>
                    </div>
                  )}
                </div>
                
                {/* Conteúdo compacto */}
                <div className="p-3">
                  <h3 className="text-white text-sm font-bold mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-orange-600 group-hover:bg-clip-text transition-all line-clamp-1">
                    {product.name}
                  </h3>
                  {/* Brand */}
                  {product.brand && (
                    <p className="text-amber-500 text-xs font-semibold mb-1">
                      {product.brand}
                    </p>
                  )}
                  <p className="text-gray-400 text-xs mb-2 line-clamp-1">
                    {product.description}
                  </p>
                  
                  {/* ABV e IBU */}
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
                  
                  {/* Preço */}
                  <div className="mb-2">
                    <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent font-bold text-base">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-gray-400 text-xs">/{product.price_unit}</span>
                  </div>

                  {/* Size Selection - Only for non-Chopp products */}
                  {product.sizes.length > 1 && !isLitro && (
                    <div className="mb-2" onClick={(e) => e.stopPropagation()}>
                      <Select 
                        value={selectedSizes[product.id]} 
                        onValueChange={(value) => setSelectedSizes(prev => ({...prev, [product.id]: value}))}
                      >
                        <SelectTrigger className="h-8 text-xs bg-gray-900/50 border-amber-500/30 text-white">
                          <SelectValue placeholder="Tamanho" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-amber-500/30">
                          {product.sizes.map(size => (
                            <SelectItem key={size} value={size} className="text-white text-xs">{size}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Layout compacto - tudo na mesma linha */}
                  <div className="flex items-center justify-between gap-2 mb-2" onClick={(e) => e.stopPropagation()}>
                    {/* Controles */}
                    <div className="flex items-center gap-1.5">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 border-amber-500/30 text-amber-500 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-600 hover:text-black hover:border-transparent transition-all duration-150 active:scale-[0.90]"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(product.id, -1, isLitro);
                        }}
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
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(product.id, 1, isLitro);
                        }}
                        data-testid={`increase-qty-${product.id}`}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>

                    {/* Preço */}
                    <div className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent font-bold text-base leading-tight">
                      {formatPrice(totalPrice)}
                    </div>
                  </div>

                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    className="w-full h-8 text-xs bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-semibold shadow-lg shadow-orange-500/30
                      transition-all duration-150
                      hover:brightness-110
                      active:scale-[0.97]"
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
                className="h-12 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-black font-semibold
                  transition-all duration-150
                  hover:brightness-110
                  hover:-translate-y-0.5
                  hover:shadow-lg hover:shadow-amber-500/30
                  active:scale-[0.97]"
              >
                <Beer className="inline-block w-5 h-5 mr-2" />
                Ver Todos os Produtos
              </button>

              {/* Categorias Sugeridas */}
              <div className="mt-8">
                <p className="text-xs sm:text-sm text-white/50 mb-3">Categorias populares:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {categories.filter(c => c.id !== selectedCategory && c.id !== 'todos').slice(0, 4).map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium
                        bg-white/5 border border-amber-500/30 text-gray-300
                        hover:border-amber-500 hover:text-amber-500
                        hover:-translate-y-0.5
                        transition-all duration-150
                        active:scale-[0.95]"
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

      {/* Product Detail Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="bg-gray-900 border-amber-500/30 text-white max-w-2xl max-h-[90vh] overflow-y-auto p-0">
          {selectedProduct && (() => {
            const isLitro = selectedProduct.price_unit === 'litro';
            const quantity = quantities[selectedProduct.id] || (isLitro ? 30 : 1);
            const totalPrice = selectedProduct.price * quantity;
            
            return (
              <>
                <div className="relative">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                  {getSocialTagDisplay(selectedProduct) && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold flex items-center gap-1">
                        {getSocialTagDisplay(selectedProduct).emoji ? (
                          <span>{getSocialTagDisplay(selectedProduct).emoji}</span>
                        ) : (
                          <Sparkles className="w-4 h-4" />
                        )}
                        {getSocialTagDisplay(selectedProduct).label}
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
                
                <div className="p-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {selectedProduct.name}
                  </h2>
                  
                  {/* Brand */}
                  {selectedProduct.brand && (
                    <p className="text-amber-500 text-lg font-semibold mb-3">
                      {selectedProduct.brand}
                    </p>
                  )}
                  
                  {/* ABV e IBU */}
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

                  {/* Preço destacado */}
                  <div className="mb-4">
                    <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent font-bold text-3xl">
                      {formatPrice(selectedProduct.price)}
                    </span>
                    <span className="text-gray-400 text-lg">/{selectedProduct.price_unit}</span>
                  </div>

                  {/* Descrição completa */}
                  <div className="mb-6">
                    <h3 className="text-amber-500 font-semibold mb-2">Descrição</h3>
                    <p className="text-gray-300 leading-relaxed">
                      {selectedProduct.description}
                    </p>
                  </div>

                  {/* Informações adicionais */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-gray-400 text-sm">Tamanhos disponíveis</p>
                      <p className="text-white font-semibold">{selectedProduct.sizes.join(', ')}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-gray-400 text-sm">Disponibilidade</p>
                      <p className={`font-semibold ${selectedProduct.stock > 10 ? 'text-green-500' : selectedProduct.stock > 0 ? 'text-yellow-500' : 'text-red-500'}`}>
                        {selectedProduct.stock > 10 ? 'Em estoque' : selectedProduct.stock > 0 ? `Apenas ${selectedProduct.stock} ${isLitro ? 'L' : 'un.'} restantes` : 'Esgotado'}
                      </p>
                    </div>
                  </div>

                  {/* Size Selection */}
                  {selectedProduct.sizes.length > 1 && !isLitro && (
                    <div className="mb-4">
                      <label className="text-gray-400 text-sm block mb-2">Selecione o tamanho:</label>
                      <Select 
                        value={selectedSizes[selectedProduct.id]} 
                        onValueChange={(value) => setSelectedSizes(prev => ({...prev, [selectedProduct.id]: value}))}
                      >
                        <SelectTrigger className="bg-black/50 border-amber-500/30 text-white">
                          <SelectValue placeholder="Tamanho" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-amber-500/30">
                          {selectedProduct.sizes.map(size => (
                            <SelectItem key={size} value={size} className="text-white">{size}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Quantidade */}
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

                  {/* Total */}
                  <div className="bg-gradient-to-r from-amber-500/10 to-orange-600/10 rounded-lg p-4 mb-6 border border-amber-500/20">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-lg">Total:</span>
                      <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent font-bold text-2xl">{formatPrice(totalPrice)}</span>
                    </div>
                  </div>

                  {/* Botão de adicionar */}
                  <Button
                    onClick={() => {
                      handleAddToCart(selectedProduct);
                      setModalOpen(false);
                    }}
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
