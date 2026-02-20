import React from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Beer, Plus } from 'lucide-react';

// Tap List compacta e rápida (mobile-first)
// - cards horizontais
// - infos essenciais (nome, marca, ABV/IBU, R$/L)
// - quick add 30L/50L
export default function TapListChopp({ products = [], onOpen, onQuickAddLitros }) {
  if (!products?.length) return null;

  return (
    <div className="rounded-2xl border border-amber-500/20 bg-white/5 backdrop-blur-sm p-4">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Beer className="w-5 h-5 text-amber-400" />
          <h3 className="text-white font-bold text-lg">Tap List (Chopp)</h3>
        </div>
        <span className="text-white/60 text-xs sm:text-sm">toque para detalhes</span>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {products.map((p) => (
          <div
            key={p.id}
            className="min-w-[240px] max-w-[240px] rounded-xl border border-amber-500/15 bg-black/20 hover:bg-black/25 transition cursor-pointer"
            onClick={() => onOpen?.(p)}
            role="button"
            tabIndex={0}
          >
            <div className="flex gap-3 p-3">
              <div className="h-16 w-16 rounded-lg overflow-hidden bg-black/30 shrink-0">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-white font-bold leading-tight truncate">{p.name}</div>
                <div className="text-amber-400 font-semibold text-sm truncate">{p.brand}</div>

                <div className="mt-2 flex items-center gap-2 flex-wrap">
                  {p.abv ? (
                    <Badge className="bg-black/40 border-amber-500/20 text-amber-300 text-xs">{p.abv}% ABV</Badge>
                  ) : null}
                  {p.ibu ? (
                    <Badge className="bg-black/40 border-amber-500/20 text-amber-300 text-xs">{p.ibu} IBU</Badge>
                  ) : null}
                </div>

                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-amber-500 font-extrabold text-lg">R$ {Number(p.price).toFixed(2).replace('.', ',')}</span>
                  <span className="text-white/60 text-sm">/litro</span>
                </div>
              </div>
            </div>

            <div className="px-3 pb-3 flex gap-2">
              <Button
                type="button"
                size="sm"
                className="flex-1 bg-[#F59E0B] text-black font-bold hover:bg-[#F97316]"
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickAddLitros?.(p, 30);
                }}
              >
                <Plus className="w-4 h-4 mr-1" /> 30L
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="flex-1 border-amber-500/30 text-amber-200 hover:bg-amber-500/10"
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickAddLitros?.(p, 50);
                }}
              >
                <Plus className="w-4 h-4 mr-1" /> 50L
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 text-[11px] text-white/50">
        * Mínimo 20L. Ajuste fino de litros dentro do produto.
      </div>
    </div>
  );
}
