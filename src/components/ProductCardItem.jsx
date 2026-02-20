import React from 'react';
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
import { Minus, Plus, ShoppingCart, Sparkles } from 'lucide-react';
import { getSocialTagLabel } from '../lib/socialTags';

const ProductCardItem = React.memo(function ProductCardItem({
  product,
  categoryLabel,
  quantity,
  selectedSize,
  onChangeSize,
  onUpdateQty,
  onOpenLitrosPicker,
  onOpenProductModal,
  onAddToCart,
  isAdded,
  formatPrice,
}) {
  const isLitro = product.price_unit === 'litro';
  const totalPrice = product.price * quantity;

  const socialLabel = getSocialTagLabel(product?.social_tag) || (product?.social_tag ? String(product.social_tag).replace(/_/g, ' ').trim() : null);

  return (
    <Card
      className="bg-white/5 border-amber-500/20 hover:border-amber-500 overflow-hidden cursor-pointer
        transition-all duration-200 ease-out
        hover:shadow-xl hover:shadow-amber-500/10
        hover:-translate-y-1
        active:scale-[0.98]
        group"
      data-testid={`product-card-${product.id}`}
      onClick={() => onOpenProductModal(product)}
    >
      <div className="relative aspect-[8/9] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {socialLabel ? (
          <div className="absolute top-2 left-2">
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold text-xs px-2 py-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {socialLabel}
            </Badge>
          </div>
        ) : product.featured ? (
          <div className="absolute top-2 left-2">
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold text-xs px-2 py-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Destaque
            </Badge>
          </div>
        ) : null}
        <div className="absolute top-2 right-2">
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-black font-semibold text-xs px-2 py-0.5">
            {categoryLabel}
          </Badge>
        </div>
        {product.stock < 10 && product.stock > 0 && !product.featured && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-red-500 text-white text-xs px-2 py-0.5">Últimas un.</Badge>
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="text-white text-sm font-bold mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-orange-600 group-hover:bg-clip-text transition-all line-clamp-1">
          {product.name}
        </h3>

        {product.brand && <p className="text-amber-500 text-xs font-semibold mb-1">{product.brand}</p>}

        {/* Descrição escondida no mobile */}
        <p className="hidden sm:block text-gray-400 text-xs mb-2 line-clamp-1">{product.description}</p>

        {(product.abv || product.ibu) && (
          <div className="flex items-center gap-2 mb-2">
            {product.abv && (
              <Badge variant="outline" className="border-amber-500/50 text-amber-500 px-1 py-0 text-[10px] sm:text-xs">
                {product.abv}% ABV
              </Badge>
            )}
            {product.ibu && (
              <Badge variant="outline" className="border-amber-500/50 text-amber-500 px-1 py-0 text-[10px] sm:text-xs">
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
            <Select value={selectedSize} onValueChange={(value) => onChangeSize(product.id, value)}>
              <SelectTrigger className="h-8 text-xs bg-gray-900/50 border-amber-500/30 text-white">
                <SelectValue placeholder="Tamanho" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-amber-500/30">
                {product.sizes.map((size) => (
                  <SelectItem key={size} value={size} className="text-white text-xs">
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex items-center justify-between gap-2 mb-2" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6 border-amber-500/30 text-amber-500 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-600 hover:text-black hover:border-transparent transition-all duration-150 active:scale-[0.90]"
              onClick={(e) => {
                e.stopPropagation();
                onUpdateQty(product.id, -1, isLitro);
              }}
            >
              <Minus className="w-3 h-3" />
            </Button>

            <button
              type="button"
              className="text-white text-sm font-bold min-w-[2rem] text-center"
              onClick={(e) => {
                e.stopPropagation();
                if (isLitro) onOpenLitrosPicker(product);
              }}
              aria-label={isLitro ? 'Selecionar litros' : 'Quantidade'}
            >
              {quantity}
              {isLitro ? 'L' : ''}
            </button>

            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6 border-amber-500/30 text-amber-500 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-600 hover:text-black hover:border-transparent transition-all duration-150 active:scale-[0.90]"
              onClick={(e) => {
                e.stopPropagation();
                onUpdateQty(product.id, 1, isLitro);
              }}
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>

          <div className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent font-bold text-base leading-tight">
            {formatPrice(totalPrice)}
          </div>
        </div>

        <Button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className={`w-full h-8 text-xs text-black font-semibold shadow-lg transition-all duration-150 hover:brightness-110 active:scale-[0.97] ${
            isAdded
              ? 'bg-green-500 hover:bg-green-600 shadow-green-500/30'
              : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-orange-500/30'
          }`}
          disabled={product.stock === 0}
          data-testid={`add-to-cart-${product.id}`}
        >
          <ShoppingCart className="w-3 h-3 mr-1" />
          {product.stock === 0 ? 'Esgotado' : isAdded ? 'Adicionado' : 'Adicionar'}
        </Button>
      </div>
    </Card>
  );
});

export default ProductCardItem;
