import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Truck, Tag, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';
import { formatPKR, FREE_DELIVERY_THRESHOLD, calculateShipping } from '../utils/format';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.pricePKR * item.quantity, 0);
  const shippingFee = calculateShipping(subtotal);
  const total = Math.max(0, subtotal - promoDiscount + shippingFee);
  const freeShippingDifference = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'SUMMER10' || code === 'LAWN10') {
      const disc = Math.round(subtotal * 0.1);
      setPromoDiscount(disc);
      setPromoSuccess(`10% Promo Applied (-${formatPKR(disc)})`);
      setPromoError('');
    } else if (code === 'AZADI') {
      const disc = 500;
      setPromoDiscount(disc);
      setPromoSuccess(`Azadi Special Rs. 500 Discount Applied!`);
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "SUMMER10" or "AZADI"');
      setPromoSuccess('');
      setPromoDiscount(0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl relative animate-slide-left border-l border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-stone-900" />
            <h2 className="text-base font-semibold text-stone-900 font-display uppercase tracking-wider">
              Shopping Bag ({items.reduce((sum, item) => sum + item.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Tracker Bar */}
        <div className="bg-amber-50/80 p-3.5 border-b border-amber-200/60 text-xs text-stone-800">
          <div className="flex items-center justify-between mb-1.5 font-medium">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-amber-800" />
              {freeShippingDifference === 0 ? (
                <span className="text-emerald-700 font-semibold">🎉 You unlocked FREE Nationwide Delivery!</span>
              ) : (
                <span>Add {formatPKR(freeShippingDifference)} more for FREE Delivery</span>
              )}
            </span>
            <span className="text-stone-500 font-mono text-[11px] tabular-nums">{progressPercent}%</span>
          </div>
          <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-amber-600 h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-stone-100">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
              <ShoppingBag className="w-12 h-12 stroke-[1.2] text-stone-300 mb-3" />
              <p className="text-base font-medium text-stone-800 mb-1">Your bag is empty</p>
              <p className="text-xs text-stone-500 max-w-xs mb-6">
                Explore our Summer Festive ’26 collection and add your favorite lawn suits.
              </p>
              <button
                onClick={onClose}
                className="bg-stone-900 text-white text-xs uppercase tracking-wider font-semibold py-2.5 px-6 rounded-xs hover:bg-stone-800 transition-colors"
              >
                Browse Summer Lawn
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.cartItemId} className="py-4 flex gap-3.5 first:pt-0">
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-24 object-cover object-top border border-stone-200 shrink-0 bg-stone-100"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-semibold text-stone-900 line-clamp-1">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.cartItemId)}
                        className="text-stone-400 hover:text-rose-600 transition-colors p-0.5"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-stone-500 mt-0.5">
                      <span>{item.stitchType}</span>
                      {item.size && (
                        <>
                          <span className="mx-1">·</span>
                          <span className="font-semibold text-stone-700">Size {item.size}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-50">
                    {/* Stepper */}
                    <div className="flex items-center border border-stone-300 bg-white">
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                        className="px-2 py-0.5 text-stone-600 hover:bg-stone-100 text-xs font-semibold"
                        aria-label="Decrease"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 text-xs font-mono tabular-nums font-semibold min-w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                        className="px-2 py-0.5 text-stone-600 hover:bg-stone-100 text-xs font-semibold"
                        aria-label="Increase"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs font-semibold text-stone-900 font-mono tabular-nums">
                      {formatPKR(item.pricePKR * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout Action */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-stone-200 bg-[#FAF8F5] space-y-3">
            
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Promo Code (e.g. SUMMER10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full text-xs bg-white border border-stone-300 rounded-none pl-8 pr-2 py-2 text-stone-800 placeholder-stone-400 outline-none uppercase font-mono"
                />
              </div>
              <button
                type="submit"
                className="bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-medium px-3 py-2 transition-colors uppercase"
              >
                Apply
              </button>
            </form>

            {promoError && <p className="text-[11px] text-rose-600">{promoError}</p>}
            {promoSuccess && <p className="text-[11px] text-emerald-700 font-medium">{promoSuccess}</p>}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-200">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-stone-900">{formatPKR(subtotal)}</span>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Special Discount</span>
                  <span className="font-mono tabular-nums">-{formatPKR(promoDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Nationwide Shipping</span>
                <span className="font-mono tabular-nums text-stone-900">
                  {shippingFee === 0 ? 'FREE' : formatPKR(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-950 pt-2 border-t border-stone-200">
                <span>Total Amount (PKR)</span>
                <span className="font-mono tabular-nums text-base">{formatPKR(total)}</span>
              </div>
            </div>

            {/* Cash on Delivery Notice */}
            <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
              <ShieldCheck className="w-3.5 h-3.5 text-stone-700 shrink-0" />
              <span>Pay Cash on Delivery or via JazzCash/EasyPaisa</span>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => {
                onClose();
                onCheckout();
              }}
              className="w-full bg-stone-900 hover:bg-stone-800 text-white py-3.5 px-4 text-xs font-semibold uppercase tracking-widest rounded-none shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
