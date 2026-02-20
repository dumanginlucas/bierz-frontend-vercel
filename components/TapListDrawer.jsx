import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Beer } from 'lucide-react';
import TapListChopp from './TapListChopp';

// Opção B: botão flutuante no mobile abre um bottom-sheet com a Tap List
export default function TapListDrawer({ open, onOpenChange, products, onOpen, onQuickAddLitros }) {
  if (!products?.length) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => onOpenChange?.(true)}
        className="sm:hidden fixed left-4 bottom-20 z-40 inline-flex items-center gap-2 rounded-full bg-[#F59E0B] text-black font-extrabold px-4 py-3 shadow-lg active:scale-[0.98] transition"
      >
        <Beer className="w-5 h-5" />
        Tap List
      </button>

      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80" />
          <Dialog.Content
            className="fixed z-50 left-1/2 bottom-0 w-full max-w-lg -translate-x-1/2 rounded-t-2xl border border-amber-500/20 bg-gradient-to-b from-[#0B1220] to-[#060A12] shadow-2xl"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <div className="flex items-center gap-2 text-white font-bold">
                <Beer className="w-5 h-5 text-amber-400" />
                Tap List (Chopp)
              </div>
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="h-10 w-10 rounded-full border border-amber-500/40 text-white/90 flex items-center justify-center bg-black/30 active:scale-95 transition"
                  aria-label="Fechar"
                >
                  <X className="w-5 h-5" />
                </button>
              </Dialog.Close>
            </div>

            <div className="max-h-[70vh] overflow-y-auto p-4">
              {/* Reuso da mesma TapList (visual consistente) */}
              <TapListChopp
                products={products}
                onOpen={(p) => {
                  onOpen?.(p);
                  onOpenChange?.(false);
                }}
                onQuickAddLitros={(p, litros) => {
                  onQuickAddLitros?.(p, litros);
                }}
              />
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
