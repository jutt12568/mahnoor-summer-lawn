import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Truck, Clock } from 'lucide-react';
import { SuitCategory } from '../types';

interface FooterProps {
  onSelectCategory: (category: SuitCategory) => void;
  onOpenFabricGuide: () => void;
  onOpenSizeGuide: () => void;
  onOpenGitHubSync?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenFabricGuide,
  onOpenSizeGuide,
  onOpenGitHubSync
}) => {
  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          
          {/* Column 1: Brand & Philosophy */}
          <div>
            <div className="text-xl sm:text-2xl font-display font-semibold tracking-[0.16em] text-white uppercase mb-4">
              SUZUME COLLECTIONS
            </div>
            <p className="text-xs text-stone-400 leading-relaxed font-light mb-5">
              Refined summer lawn couture for the discerning Pakistani woman. Blending traditional subcontinental embroidery with ultra-fine breathable 80s combed cotton.
            </p>
            <div className="space-y-1.5 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-300" />
                <span>Flagship Studio: MM Alam Road, Gulberg III, Lahore</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-300" />
                <span>Mon – Sat: 11:00 AM – 8:00 PM PKT</span>
              </div>
            </div>
          </div>

          {/* Column 2: Collections Navigation */}
          <div>
            <div className="text-xs uppercase tracking-widest text-stone-200 font-semibold mb-4">
              Summer Collections
            </div>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onSelectCategory('festive')}
                  className="hover:text-white transition-colors"
                >
                  Luxury Schiffli Lawn '26
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('unstitched')}
                  className="hover:text-white transition-colors"
                >
                  Unstitched 3-Piece Lawn
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('pret')}
                  className="hover:text-white transition-colors"
                >
                  Ready-To-Wear Kurtis & Suits
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('daily')}
                  className="hover:text-white transition-colors"
                >
                  Daily Breeze 2-Piece Lawn
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenFabricGuide}
                  className="hover:text-white transition-colors"
                >
                  Textile Care & Shrinkage Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care Pakistan */}
          <div>
            <div className="text-xs uppercase tracking-widest text-stone-200 font-semibold mb-4">
              Customer Support & Delivery
            </div>
            <ul className="space-y-2 text-xs text-stone-400">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp: +92 (300) 847-2911</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-stone-400" />
                <span>orders@suzumecollections.pk</span>
              </li>
              <li>
                <button onClick={onOpenSizeGuide} className="hover:text-white transition-colors">
                  Prêt Sizing Chart & Measurements
                </button>
              </li>
              <li>
                <span className="text-stone-300 font-medium">Nationwide Delivery:</span> 2-4 days via TCS & Leopards
              </li>
              <li>
                <span className="text-stone-300 font-medium">Payment:</span> Doorstep Cash on Delivery (COD) / JazzCash
              </li>
            </ul>
          </div>

          {/* Column 4: Trust & Guarantees */}
          <div>
            <div className="text-xs uppercase tracking-widest text-stone-200 font-semibold mb-4">
              The Suzume Assurance
            </div>
            <div className="space-y-3 text-xs text-stone-400">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-stone-200 font-medium">7-Day Hassle-Free Returns</span>
                  <p className="text-[11px] text-stone-500 mt-0.5">Defective or unstitched change-of-mind exchanges across Pakistan.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <div>
                  <span className="text-stone-200 font-medium">Free Shipping Over Rs. 3,999</span>
                  <p className="text-[11px] text-stone-500 mt-0.5">Complimentary express shipping across all Pakistani cities.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment icons */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span>© 2026 Suzume Collections Pakistan. All rights reserved.</span>
            {onOpenGitHubSync && (
              <button
                onClick={onOpenGitHubSync}
                className="text-stone-400 hover:text-white transition-colors underline underline-offset-2 flex items-center gap-1.5"
              >
                <span>GitHub: jutt12568/mahnoor-summer-lawn</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Cash on Delivery</span>
            <span>·</span>
            <span>JazzCash</span>
            <span>·</span>
            <span>EasyPaisa</span>
            <span>·</span>
            <span>Raast IBFT</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
