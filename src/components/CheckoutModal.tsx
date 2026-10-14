import React, { useState } from 'react';
import { X, CheckCircle, Truck, ShieldCheck, MapPin, Phone, User, Mail, CreditCard, Building2, Smartphone } from 'lucide-react';
import { CartItem, CheckoutFormData, PlacedOrder } from '../types';
import { PAKISTANI_CITIES } from '../data/products';
import { formatPKR, calculateShipping } from '../utils/format';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discount: number;
  onOrderSuccess: (order: PlacedOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discount,
  onOrderSuccess
}) => {
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    phone: '',
    email: '',
    city: 'Lahore',
    address: '',
    postalCode: '',
    paymentMethod: 'cod',
    orderNotes: ''
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<PlacedOrder | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.pricePKR * item.quantity, 0);
  const deliveryCharges = calculateShipping(subtotal);
  const total = Math.max(0, subtotal - discount + deliveryCharges);

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Please enter your full name';
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required for courier delivery';
    } else if (!/^((\+92)|(0092)|(03))?[0-9]{9,10}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      errors.phone = 'Please enter a valid Pakistani number (e.g. 0300 1234567)';
    }
    if (!formData.address.trim()) errors.address = 'Complete delivery street address is required';
    if (!formData.city.trim()) errors.city = 'Please select your delivery city';
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const orderId = `MN-${Math.floor(100000 + Math.random() * 900000)}`;
      const trackingNumber = `TCS-PK-${Math.floor(10000000 + Math.random() * 90000000)}`;
      const newOrder: PlacedOrder = {
        orderId,
        trackingNumber,
        courier: formData.city.toLowerCase() === 'karachi' ? 'Call Courier / TCS' : 'TCS Express Pakistan',
        items: [...items],
        subtotal,
        discount,
        deliveryCharges,
        total,
        customer: { ...formData },
        date: new Date().toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' }),
        estimatedDelivery: '2 to 4 Business Days'
      };

      setConfirmedOrder(newOrder);
      setIsSubmitting(false);
      onOrderSuccess(newOrder);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div 
        className="relative bg-white w-full max-w-3xl rounded-none shadow-2xl border border-stone-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF8F5]">
          <div>
            <h2 className="text-lg font-semibold text-stone-900 font-display uppercase tracking-wider">
              {confirmedOrder ? 'Order Confirmation' : 'Pakistan Nationwide Checkout'}
            </h2>
            <p className="text-xs text-stone-500">
              {confirmedOrder ? 'Thank you for choosing Suzume Collections Summer Couture' : 'Fast TCS Courier Dispatch & Doorstep Cash on Delivery'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Post-Order Confirmation State */}
        {confirmedOrder ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center max-w-md mx-auto">
              <CheckCircle className="w-14 h-14 text-emerald-600 mx-auto mb-3" />
              <h3 className="text-2xl font-display font-medium text-stone-900 mb-1">
                Order #{confirmedOrder.orderId} Confirmed
              </h3>
              <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                We have received your order. Our team in Lahore is preparing your parcel for prompt dispatch. You will receive an SMS and WhatsApp confirmation on <span className="font-semibold text-stone-800">{confirmedOrder.customer.phone}</span>.
              </p>
              
              <div className="bg-stone-50 border border-stone-200 p-3.5 text-xs text-stone-700 space-y-1 text-left mb-6">
                <div className="flex justify-between">
                  <span className="text-stone-500">Tracking Number:</span>
                  <span className="font-mono font-semibold text-stone-900">{confirmedOrder.trackingNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Courier Partner:</span>
                  <span className="font-medium text-stone-900">{confirmedOrder.courier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Estimated Delivery:</span>
                  <span className="font-medium text-emerald-700">{confirmedOrder.estimatedDelivery}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-stone-200">
                  <span className="text-stone-500">Payment Due on Delivery:</span>
                  <span className="font-mono font-bold text-stone-900">{formatPKR(confirmedOrder.total)}</span>
                </div>
              </div>
            </div>

            {/* Itemized Receipt Summary */}
            <div className="border-t border-stone-200 pt-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800 mb-3">
                Purchased Lawn Suits
              </h4>
              <div className="divide-y divide-stone-100 max-h-48 overflow-y-auto">
                {confirmedOrder.items.map((it) => (
                  <div key={it.cartItemId} className="py-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img src={it.image} alt={it.name} className="w-10 h-12 object-cover border border-stone-200" />
                      <div>
                        <div className="font-medium text-stone-900">{it.name}</div>
                        <div className="text-stone-500 text-[11px]">{it.stitchType} {it.size ? `· Size ${it.size}` : ''} × {it.quantity}</div>
                      </div>
                    </div>
                    <span className="font-mono tabular-nums font-semibold text-stone-900">
                      {formatPKR(it.pricePKR * it.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <button
                onClick={onClose}
                className="bg-stone-900 hover:bg-stone-800 text-white py-2.5 px-8 text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Left Column: Customer and Delivery Address (7 cols) */}
              <div className="md:col-span-7 space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-900 flex items-center gap-1.5 pb-2 border-b border-stone-100">
                  <User className="w-4 h-4 text-stone-500" />
                  <span>Customer & Shipping Details</span>
                </h3>

                {/* Full Name */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-medium text-stone-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Zainab Tariq"
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 focus:bg-white focus:border-stone-900 outline-none"
                  />
                  {formErrors.fullName && <p className="text-[11px] text-rose-600 mt-1">{formErrors.fullName}</p>}
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-medium text-stone-700 mb-1 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-stone-500" />
                      <span>Phone / WhatsApp *</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0300 1234567"
                      className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 focus:bg-white focus:border-stone-900 outline-none font-mono"
                    />
                    {formErrors.phone && <p className="text-[11px] text-rose-600 mt-1">{formErrors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-medium text-stone-700 mb-1 flex items-center gap-1">
                      <Mail className="w-3 h-3 text-stone-500" />
                      <span>Email (Optional)</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="zainab@example.com"
                      className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 focus:bg-white focus:border-stone-900 outline-none"
                    />
                  </div>
                </div>

                {/* City & Postal Code */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-medium text-stone-700 mb-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-stone-500" />
                      <span>City in Pakistan *</span>
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 focus:bg-white focus:border-stone-900 outline-none"
                    >
                      {PAKISTANI_CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-medium text-stone-700 mb-1">
                      Postal Code / Area
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      placeholder="e.g. 54000 / Gulberg III"
                      className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 focus:bg-white focus:border-stone-900 outline-none"
                    />
                  </div>
                </div>

                {/* Street Address */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-medium text-stone-700 mb-1">
                    Complete Street Address (House/Apartment #, Street, Phase) *
                  </label>
                  <textarea
                    rows={2}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="House 42, Street 7, Block B, DHA Phase 6"
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 focus:bg-white focus:border-stone-900 outline-none resize-none"
                  />
                  {formErrors.address && <p className="text-[11px] text-rose-600 mt-1">{formErrors.address}</p>}
                </div>

                {/* Special Instructions */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-medium text-stone-700 mb-1">
                    Order Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.orderNotes}
                    onChange={(e) => setFormData({ ...formData, orderNotes: e.target.value })}
                    placeholder="e.g. Call before delivery, leave with guard"
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 focus:bg-white focus:border-stone-900 outline-none"
                  />
                </div>
              </div>

              {/* Right Column: Payment & Summary (5 cols) */}
              <div className="md:col-span-5 space-y-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-900 pb-2 border-b border-stone-100 mb-3">
                    Select Payment Method
                  </h3>

                  <div className="space-y-2">
                    <label className={`block border p-3 cursor-pointer transition-all ${
                      formData.paymentMethod === 'cod' ? 'border-stone-900 bg-stone-50' : 'border-stone-200 hover:border-stone-300'
                    }`}>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="payment"
                          checked={formData.paymentMethod === 'cod'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                          className="accent-stone-900"
                        />
                        <div className="flex-1">
                          <div className="text-xs font-semibold text-stone-900 flex items-center justify-between">
                            <span>Cash on Delivery (COD)</span>
                            <span className="text-[10px] bg-stone-200 px-1.5 py-0.5 rounded text-stone-800">Most Popular</span>
                          </div>
                          <p className="text-[11px] text-stone-500 mt-0.5">Pay in cash to the rider upon parcel delivery</p>
                        </div>
                      </div>
                    </label>

                    <label className={`block border p-3 cursor-pointer transition-all ${
                      formData.paymentMethod === 'jazzcash' ? 'border-stone-900 bg-stone-50' : 'border-stone-200 hover:border-stone-300'
                    }`}>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="payment"
                          checked={formData.paymentMethod === 'jazzcash'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'jazzcash' })}
                          className="accent-stone-900"
                        />
                        <div className="flex-1">
                          <div className="text-xs font-semibold text-stone-900 flex items-center gap-1.5">
                            <Smartphone className="w-3.5 h-3.5 text-stone-700" />
                            <span>JazzCash Mobile Account</span>
                          </div>
                          <p className="text-[11px] text-stone-500 mt-0.5">Prompt notification sent to your JazzCash wallet</p>
                        </div>
                      </div>
                    </label>

                    <label className={`block border p-3 cursor-pointer transition-all ${
                      formData.paymentMethod === 'easypaisa' ? 'border-stone-900 bg-stone-50' : 'border-stone-200 hover:border-stone-300'
                    }`}>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="payment"
                          checked={formData.paymentMethod === 'easypaisa'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'easypaisa' })}
                          className="accent-stone-900"
                        />
                        <div className="flex-1">
                          <div className="text-xs font-semibold text-stone-900 flex items-center gap-1.5">
                            <Smartphone className="w-3.5 h-3.5 text-stone-700" />
                            <span>EasyPaisa Wallet</span>
                          </div>
                          <p className="text-[11px] text-stone-500 mt-0.5">Instant OTP verification via EasyPaisa App</p>
                        </div>
                      </div>
                    </label>

                    <label className={`block border p-3 cursor-pointer transition-all ${
                      formData.paymentMethod === 'bank_transfer' ? 'border-stone-900 bg-stone-50' : 'border-stone-200 hover:border-stone-300'
                    }`}>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="payment"
                          checked={formData.paymentMethod === 'bank_transfer'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'bank_transfer' })}
                          className="accent-stone-900"
                        />
                        <div className="flex-1">
                          <div className="text-xs font-semibold text-stone-900 flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-stone-700" />
                            <span>Raast / Online Bank Transfer</span>
                          </div>
                          <p className="text-[11px] text-stone-500 mt-0.5">Direct IBFT to Suzume Collections Habib Bank Limited (HBL) Account</p>
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* Summary Breakdown */}
                  <div className="mt-4 bg-[#FAF8F5] p-3.5 border border-stone-200 text-xs space-y-2">
                    <div className="flex justify-between text-stone-600">
                      <span>Items Subtotal ({items.length})</span>
                      <span className="font-mono tabular-nums text-stone-900">{formatPKR(subtotal)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-700 font-medium">
                        <span>Discount</span>
                        <span className="font-mono tabular-nums">-{formatPKR(discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-stone-600">
                      <span>Nationwide TCS Shipping</span>
                      <span className="font-mono tabular-nums text-stone-900">
                        {deliveryCharges === 0 ? 'FREE' : formatPKR(deliveryCharges)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-bold text-stone-950">
                      <span>Grand Total</span>
                      <span className="font-mono tabular-nums text-base">{formatPKR(total)}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 text-white py-3.5 px-4 text-xs font-semibold uppercase tracking-widest rounded-none shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Placing Order with Courier...</span>
                    ) : (
                      <span>Confirm Order ({formatPKR(total)})</span>
                    )}
                  </button>
                  <p className="text-[10px] text-center text-stone-500 mt-2">
                    By placing order, you agree to our 7-Day Exchange Policy across Pakistan.
                  </p>
                </div>

              </div>

            </div>
          </form>
        )}

      </div>
    </div>
  );
};
