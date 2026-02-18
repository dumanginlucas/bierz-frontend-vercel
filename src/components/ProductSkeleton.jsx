import React from 'react';
import { Card } from './ui/card';

export function ProductSkeleton() {
  return (
    <Card className="bg-white/5 border-amber-500/20 overflow-hidden animate-pulse">
      {/* Imagem Skeleton */}
      <div className="relative aspect-[8/9] bg-gradient-to-br from-gray-800 to-gray-700" />
      
      {/* Conteúdo Skeleton */}
      <div className="p-3 space-y-2">
        {/* Título */}
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        
        {/* Brand */}
        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
        
        {/* Descrição */}
        <div className="h-3 bg-gray-700 rounded w-full"></div>
        
        {/* Badges ABV/IBU */}
        <div className="flex gap-2">
          <div className="h-5 bg-gray-700 rounded w-16"></div>
          <div className="h-5 bg-gray-700 rounded w-16"></div>
        </div>
        
        {/* Preço */}
        <div className="h-5 bg-gray-700 rounded w-24"></div>
        
        {/* Controles de quantidade */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <div className="h-7 w-7 bg-gray-700 rounded"></div>
            <div className="h-7 w-10 bg-gray-700 rounded"></div>
            <div className="h-7 w-7 bg-gray-700 rounded"></div>
          </div>
          <div className="h-5 bg-gray-700 rounded w-16"></div>
        </div>
        
        {/* Botão adicionar */}
        <div className="h-8 bg-gray-700 rounded w-full"></div>
      </div>
    </Card>
  );
}

export default ProductSkeleton;
