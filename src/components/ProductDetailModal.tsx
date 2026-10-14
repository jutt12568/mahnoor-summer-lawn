import React, { useState } from 'react';
import { X, Check, ShieldCheck, Ruler, Truck, RefreshCw, Scissors, Heart } from 'lucide-react';
import { Product, StitchType, ClothingSize } from '../types';
import { formatPKR } from '../utils/format';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, stitchType: StitchType, size?: ClothingSize, quantity?: number) => void;
  onBuyNow: (product: Product, stitchType: StitchType, size?: ClothingSize, quantity?: number) => void;
  onOpenSizeGuide: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onOpenSizeGuide,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const [selectedStitch, setSelectedStitch] = useState<StitchType>(
    product.stitchOptions[0] || 'Unstitched'
  );
  const [selectedSize, setSelectedSize] = useState<ClothingSize>(
    product.availableSizes[0] || 'M'
  );
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Stitched surcharge is standard Rs. 1,500 in Pakistan for tailor finishing with laces and inner slips
  const stitchSurcharge = selectedStitch === 'Stitched' && product.stitchOptions.includes('Unstitched') ? 1500 : 0;
  const unitPrice = product.pricePKR + stitchSurcharge;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    onAddToCart(product, selectedStitch, selectedStitch === 'Stitched' ? selectedSize : undefined, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleBuy = () => {
    onBuyNow(product, selectedStitch, selectedStitch === 'Stitched' ? selectedSize : undefined, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div 
        className="relative bg-white w-full max-w-5xl rounded-none shadow-2xl overflow-hidden border border-stone-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-stone-500 hover:text-stone-900 bg-white/90 rounded-full hover:bg-stone-100 transition-colors shadow-sm"
          aria-label="Close product view"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto md:overflow-hidden">
          
          {/* Gallery View (Left side, 6 cols) */}
          <div className="md:col-span-6 bg-[#F7F4EE] relative min-h-[380px] md:min-h-[580px] flex items-center justify-center overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top max-h-[600px]"
            />

            {/* Subtle Tag */}
            {product.tag && (
              <div className="absolute top-4 left-4 bg-stone-900 text-stone-100 text-[11px] tracking-widest uppercase px-2.5 py-1 font-medium">
                {product.tag}
              </div>
            )}

            <button
              onClick={() => onToggleWishlist(product)}
              className={`absolute bottom-4 left-4 p-2.5 rounded-full transition-colors ${
                isWishlisted 
                  ? 'bg-rose-50 text-rose-600 shadow-sm' 
                  : 'bg-white/90 text-stone-700 hover:text-stone-900'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600 stroke-rose-600' : ''}`} />
            </button>
          </div>

          {/* Contiguous Purchase Module (Right side, 6 cols) */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[600px]">
            <div>
              
              {/* Category & Collection */}
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-medium mb-1.5">
                <span>{product.collection}</span>
                <span aria-hidden="true">·</span>
                <span>{product.sku}</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-display font-medium text-stone-900 mb-2 leading-tight">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl font-bold font-mono text-stone-950 tabular-nums">
                  {formatPKR(unitPrice)}
                </span>
                {product.originalPricePKR && (
                  <span className="text-sm font-mono text-stone-400 line-through tabular-nums">
                    {formatPKR(product.originalPricePKR + stitchSurcharge)}
                  </span>
                )}
                <span className="text-xs text-stone-500">
                  (Inclusive of all Pakistan GST taxes)
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6 font-light">
                {product.description}
              </p>

              {/* Stitching Selection */}
              <div className="mb-5 pb-5 border-b border-stone-200">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                    <Scissors className="w-3.5 h-3.5 text-stone-500" />
                    <span>Select Stitching Style</span>
                  </label>
                  {stitchSurcharge > 0 && (
                    <span className="text-[11px] text-amber-800 font-medium">
                      +Rs. 1,500 Tailor Finished
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {product.stitchOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSelectedStitch(opt)}
                      className={`py-2 px-3 text-xs font-medium border text-center transition-all ${
                        selectedStitch === opt
                          ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                          : 'border-stone-200 text-stone-700 bg-white hover:border-stone-400'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* If Stitched: Size Selection */}
              {selectedStitch === 'Stitched' && (
                <div className="mb-5 pb-5 border-b border-stone-200">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                      Standard Prêt Size
                    </label>
                    <button
                      onClick={onOpenSizeGuide}
                      className="text-[11px] text-stone-600 hover:text-stone-950 underline flex items-center gap-1"
                    >
                      <Ruler className="w-3 h-3" />
                      <span>View Pakistan Size Chart</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {product.availableSizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`w-10 h-10 text-xs font-medium border flex items-center justify-center transition-all ${
                          selectedSize === sz
                            ? 'border-stone-900 bg-stone-900 text-white font-bold'
                            : 'border-stone-200 text-stone-700 bg-white hover:border-stone-400'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Fabric Specs Breakdown */}
              <div className="bg-[#FAF8F5] p-3.5 border border-stone-200/80 mb-5 text-[12px] text-stone-700 space-y-1.5">
                <div className="font-semibold text-stone-900 uppercase text-[11px] tracking-wider mb-1">
                  Authentic Lawn Fabric Breakdown
                </div>
                <div className="grid grid-cols-1 gap-1">
                  <div><span className="font-medium text-stone-900">Shirt:</span> {product.fabric.shirt}</div>
                  <div><span className="font-medium text-stone-900">Dupatta:</span> {product.fabric.dupatta}</div>
                  <div><span className="font-medium text-stone-900">Trouser:</span> {product.fabric.trouser}</div>
                  <div><span className="font-medium text-stone-900">Weave:</span> {product.fabric.lawnCount}</div>
                </div>
              </div>

              {/* Quantity Stepper & Actions */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center border border-stone-300 bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-stone-600 hover:bg-stone-100 text-sm font-semibold"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-mono tabular-nums font-semibold min-w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-stone-600 hover:bg-stone-100 text-sm font-semibold"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="flex-1 bg-stone-900 hover:bg-stone-800 text-white py-3 px-4 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <span>Add to Bag · {formatPKR(totalPrice)}</span>
                  )}
                </button>

                <button
                  onClick={handleBuy}
                  className="bg-stone-100 hover:bg-stone-200 text-stone-900 border border-stone-300 py-3 px-4 text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Quick COD
                </button>
              </div>

            </div>

            {/* Trust badges footer */}
            <div className="pt-4 border-t border-stone-200 grid grid-cols-3 gap-2 text-center text-[11px] text-stone-600 font-light">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-stone-700" />
                <span>2-4 Days Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-stone-700" />
                <span>Cash on Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RefreshCw className="w-4 h-4 text-stone-700" />
                <span>7-Day Exchanges</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
