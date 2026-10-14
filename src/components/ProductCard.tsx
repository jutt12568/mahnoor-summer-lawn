import React, { useState } from 'react';
import { Heart, Eye, Plus, Check } from 'lucide-react';
import { Product } from '../types';
import { formatPKR } from '../utils/format';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onQuickAdd,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(product);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1500);
  };

  return (
    <article
      onClick={() => onQuickView(product)}
      className="group relative flex flex-col bg-white border border-stone-200/90 rounded-none overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 transform-gpu hover:-translate-y-0.5"
    >
      {/* Visual Asset Container (Lead with imagery: 65% - 75% height) */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F5F2EB]">
        
        {/* Subtle Styled CSS Fallback Skeleton if loading */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-stone-100 flex items-center justify-center text-stone-400 text-xs animate-pulse">
            <span>Loading lawn weave...</span>
          </div>
        )}

        <img
          src={product.image}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Quiet Subtle Text Tag (Section 1A Zero-Pill discipline: no candy badges) */}
        {product.tag && (
          <div className="absolute top-3 left-3 bg-stone-900/90 text-stone-100 text-[11px] tracking-widest uppercase px-2 py-1 font-medium backdrop-blur-xs">
            {product.tag}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
            isWishlisted 
              ? 'bg-rose-50 text-rose-600 shadow-sm' 
              : 'bg-white/80 text-stone-700 hover:text-stone-900 hover:bg-white backdrop-blur-xs'
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600 stroke-rose-600' : 'stroke-[1.8]'}`} />
        </button>

        {/* Hover Quick Action Drawer Bar */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-stone-950/80 via-stone-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-between gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 bg-white/95 hover:bg-white text-stone-900 text-xs font-semibold uppercase tracking-wider py-2 px-3 rounded-xs shadow-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Details</span>
          </button>

          <button
            onClick={handleQuickAddClick}
            disabled={isAddedRecently}
            className="flex-1 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-semibold uppercase tracking-wider py-2 px-3 rounded-xs shadow-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            {isAddedRecently ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Product Information Body */}
      <div className="p-4 flex flex-col flex-grow justify-between bg-white">
        <div>
          {/* Category & SKU metadata (Unboxed clean text) */}
          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-stone-500 font-medium mb-1">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{product.sku}</span>
          </div>

          {/* Product Title */}
          <h2 className="text-[15px] font-medium text-stone-900 group-hover:text-stone-700 transition-colors line-clamp-1 mb-1 font-display">
            {product.name}
          </h2>

          {/* Color & Stitch Options (Unboxed text) */}
          <p className="text-xs text-stone-500 mb-3 truncate">
            {product.colorName} · {product.stitchOptions.join(' / ')}
          </p>
        </div>

        {/* Pricing Row */}
        <div className="pt-2 border-t border-stone-100 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-[15px] font-semibold text-stone-950 font-mono tabular-nums">
              {formatPKR(product.pricePKR)}
            </span>
            {product.originalPricePKR && (
              <span className="text-xs text-stone-400 line-through font-mono tabular-nums">
                {formatPKR(product.originalPricePKR)}
              </span>
            )}
          </div>

          <span className="text-[11px] text-stone-500 font-medium">
            {product.stockCount <= 8 ? (
              <span className="text-amber-700">Only {product.stockCount} left</span>
            ) : (
              <span>In Stock</span>
            )}
          </span>
        </div>
      </div>
    </article>
  );
};
