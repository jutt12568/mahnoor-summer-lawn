import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';
import { formatPKR } from '../utils/format';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl relative border-l border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
            <h3 className="text-base font-semibold text-stone-900 font-display uppercase tracking-wider">
              Saved Suits ({wishlist.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 transition-colors"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 divide-y divide-stone-100">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
              <Heart className="w-12 h-12 stroke-[1.2] text-stone-300 mb-3" />
              <p className="text-base font-medium text-stone-800 mb-1">Your wishlist is empty</p>
              <p className="text-xs text-stone-500 max-w-xs mb-6">
                Tap the heart on any summer lawn suit to save it for your Eid or summer shopping list.
              </p>
              <button
                onClick={onClose}
                className="bg-stone-900 text-white text-xs uppercase tracking-wider font-semibold py-2.5 px-6 rounded-xs hover:bg-stone-800 transition-colors"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            wishlist.map((prod) => (
              <div key={prod.id} className="py-4 flex gap-3.5 first:pt-0">
                <img
                  src={prod.image}
                  alt={prod.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-24 object-cover object-top border border-stone-200 shrink-0 bg-stone-100"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-semibold text-stone-900 line-clamp-1">
                        {prod.name}
                      </h4>
                      <button
                        onClick={() => onRemoveFromWishlist(prod.id)}
                        className="text-stone-400 hover:text-rose-600 transition-colors p-0.5"
                        aria-label="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-stone-500 mt-0.5">
                      {prod.categoryLabel} · {prod.colorName}
                    </div>

                    <div className="text-xs font-bold text-stone-950 font-mono tabular-nums mt-1">
                      {formatPKR(prod.pricePKR)}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onAddToCart(prod);
                      onRemoveFromWishlist(prod.id);
                    }}
                    className="mt-2 w-full bg-stone-900 hover:bg-stone-800 text-white text-[11px] font-semibold uppercase tracking-wider py-1.5 px-3 rounded-none flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
