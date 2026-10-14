import React from 'react';
import { X, Sparkles, Droplets, Sun, Wind, Scissors } from 'lucide-react';

interface FabricGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FabricGuideModal: React.FC<FabricGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div 
        className="relative bg-white w-full max-w-3xl rounded-none shadow-2xl border border-stone-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF8F5]">
          <div>
            <h3 className="text-base font-semibold text-stone-900 font-display uppercase tracking-wider">
              The Science of Pakistani Summer Lawn
            </h3>
            <p className="text-xs text-stone-500">
              Understanding thread counts, air permeability, and care for 40°C+ summer climate
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-900 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Section 1: The Weave */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
              <Wind className="w-4 h-4 text-stone-600" />
              <span>Superfine 80s Combed Compact Lawn</span>
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Pakistani lawn is globally renowned because it is spun using extra-long staple Pima & Egyptian cotton yarns combed to an 80/80 count. This creates an ultra-tight yet feather-light weave that traps zero heat while offering non-see-through coverage.
            </p>
          </div>

          {/* Section 2: Schiffli and Borer Embroidery */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
              <Scissors className="w-4 h-4 text-stone-600" />
              <span>Schiffli Borer & Chikankari Craft</span>
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Our luxury festive range utilizes laser-guided Schiffli machines to drill micro-eyelets (borer cutwork) directly into the lawn cloth, bordered with lustrous silk resham threads. This provides natural mechanical ventilation across the chest and sleeves.
            </p>
          </div>

          {/* Section 3: Dupatta Anatomy */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            <div className="bg-stone-50 p-3.5 border border-stone-200">
              <div className="font-semibold text-stone-900 text-xs mb-1">Swiss Voile Dupatta</div>
              <p className="text-[11px] text-stone-600">
                100% fine cotton voile, cloud-light, non-slip drape perfect for active summer days.
              </p>
            </div>
            <div className="bg-stone-50 p-3.5 border border-stone-200">
              <div className="font-semibold text-stone-900 text-xs mb-1">Pure Silk Dupatta</div>
              <p className="text-[11px] text-stone-600">
                Lustrous medium silk with rich color saturation and elegant fluid fall for evening gatherings.
              </p>
            </div>
            <div className="bg-stone-50 p-3.5 border border-stone-200">
              <div className="font-semibold text-stone-900 text-xs mb-1">Organza Schiffli Border</div>
              <p className="text-[11px] text-stone-600">
                Crisp sheer organza scalloped with zari and tilla threadwork for formal Eid celebrations.
              </p>
            </div>
          </div>

          {/* Section 4: Shrinkage and Washing Protocol */}
          <div className="bg-amber-50/70 p-4 border border-amber-200/80 space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-amber-700" />
              <span>Essential Pre-Stitching & Washing Care in Pakistan</span>
            </h4>
            <ul className="text-xs text-stone-700 space-y-1.5 list-disc pl-4">
              <li>
                <strong>Pre-Soak Rule:</strong> Always soak unstitched lawn in lukewarm water for 15 minutes before handing it to your darzi (tailor) to account for natural 1-2% cotton shrinkage.
              </li>
              <li>
                <strong>Gentle Handwash:</strong> Wash in cold water using a mild liquid detergent. Do not bleach or use heavy optical brighteners.
              </li>
              <li>
                <strong>Shade Drying:</strong> Dry your lawn garments inside out in shaded areas. Avoid harsh direct midday Pakistani sun to preserve vibrancy for multiple seasons.
              </li>
              <li>
                <strong>Warm Iron:</strong> Iron while slightly damp on medium-cotton heat setting, especially over embroidered patches.
              </li>
            </ul>
          </div>

        </div>

        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-stone-900 text-white text-xs uppercase tracking-wider px-5 py-2 hover:bg-stone-800 transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
