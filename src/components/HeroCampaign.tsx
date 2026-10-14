import React from 'react';
import { Sparkles, ArrowRight, Wind, ShieldCheck } from 'lucide-react';
import { SuitCategory } from '../types';

interface HeroCampaignProps {
  onExploreCategory: (category: SuitCategory) => void;
  onOpenFabricGuide: () => void;
}

export const HeroCampaign: React.FC<HeroCampaignProps> = ({
  onExploreCategory,
  onOpenFabricGuide
}) => {
  return (
    <section className="relative overflow-hidden bg-stone-900 text-stone-100">
      {/* Background Image Container */}
      <div className="relative w-full min-h-[560px] lg:min-h-[640px] flex items-center">
        <img
          src="/src/assets/images/hero_summer_lawn_campaign_1791388299196.jpg"
          alt="Suzume Collections Summer Lawn Festive 2026 Campaign"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.03]"
          referrerPolicy="no-referrer"
        />

        {/* Measured Contrast Scrim */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/50 to-transparent sm:w-3/4 lg:w-3/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-black/20" />

        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 z-10 w-full">
          <div className="max-w-xl text-left">
            
            {/* Kicker - Clean unboxed text with separator */}
            <div className="flex items-center gap-2 text-amber-200/90 text-xs tracking-[0.25em] uppercase font-semibold mb-3">
              <span>Summer Festive Lawn 2026</span>
              <span aria-hidden="true">·</span>
              <span>Volume 01</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium text-white tracking-tight leading-[1.08] mb-5 [text-wrap:balance]">
              Poetry in Pure Lawn, Woven for Pakistani Summers
            </h1>

            {/* Body Prose */}
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-8 max-w-lg font-light">
              Crafted from cooling 80s combed Egyptian cotton, intricate Schiffli eyelet embroidery, and featherlight Swiss voile dupattas designed to breathe through Karachi’s coastal humidity and Lahore’s blazing sun.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onExploreCategory('festive')}
                className="bg-stone-50 text-stone-950 hover:bg-amber-100 px-6 py-3.5 text-xs uppercase tracking-widest font-semibold rounded-sm transition-all duration-200 shadow-md flex items-center gap-2 whitespace-nowrap"
              >
                <span>Shop Festive Schiffli</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onExploreCategory('unstitched')}
                className="bg-transparent border border-white/60 text-white hover:bg-white/10 px-6 py-3.5 text-xs uppercase tracking-widest font-medium rounded-sm transition-colors whitespace-nowrap"
              >
                View 3-Piece Lawn
              </button>
            </div>

            {/* Trust highlights */}
            <div className="mt-10 pt-6 border-t border-white/15 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-stone-300/90 font-light">
              <div className="flex items-center gap-2">
                <Wind className="w-3.5 h-3.5 text-amber-200" />
                <span>100% Breathable Pima Cotton</span>
              </div>
              <span className="text-stone-500">·</span>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-200" />
                <span>Cash on Delivery (COD)</span>
              </div>
              <span className="text-stone-500">·</span>
              <button 
                onClick={onOpenFabricGuide}
                className="hover:text-amber-200 underline underline-offset-4 transition-colors"
              >
                Learn About Our Lawn Weave
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
