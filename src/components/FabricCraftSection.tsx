import React from 'react';
import { Sparkles, SunMedium, Wind, Scissors, ShieldAlert } from 'lucide-react';

interface FabricCraftSectionProps {
  onOpenFabricGuide: () => void;
}

export const FabricCraftSection: React.FC<FabricCraftSectionProps> = ({ onOpenFabricGuide }) => {
  return (
    <section className="py-16 sm:py-24 bg-[#F5F2EB] border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="text-xs uppercase tracking-[0.25em] text-stone-500 font-semibold mb-2">
            The Textile Legacy
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-stone-900 tracking-tight mb-4 [text-wrap:balance]">
            Engineered for Pakistan’s Summer Climate
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">
            Each Suzume Collections ensemble is conceived to balance high-fashion opulence with extreme breathability. We combine 80s combed Egyptian cotton with traditional subcontinental needlecraft.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white p-7 border border-stone-200/90 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-[#FAF8F5] border border-stone-200 flex items-center justify-center text-stone-800 mb-5">
                <Wind className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="text-lg font-display font-medium text-stone-900 mb-2">
                01. 80/80 Air-Permeable Lawn
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-light mb-4">
                Woven on high-speed air-jet looms using combed compact cotton. The resulting textile is so lightweight it floats against skin while retaining opacity and structural drape.
              </p>
            </div>
            <div className="text-[11px] text-stone-400 uppercase tracking-widest pt-4 border-t border-stone-100 font-medium">
              Lab-Certified Breathability
            </div>
          </div>

          <div className="bg-white p-7 border border-stone-200/90 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-[#FAF8F5] border border-stone-200 flex items-center justify-center text-stone-800 mb-5">
                <Scissors className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="text-lg font-display font-medium text-stone-900 mb-2">
                02. Schiffli & Borer Artistry
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-light mb-4">
                Intricate micro-perforations drilled precisely into the shirt front and framed with fine resham silk threadwork. Natural airflow cooling disguised as couture luxury.
              </p>
            </div>
            <div className="text-[11px] text-stone-400 uppercase tracking-widest pt-4 border-t border-stone-100 font-medium">
              Authentic Pakistani Schiffli
            </div>
          </div>

          <div className="bg-white p-7 border border-stone-200/90 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-[#FAF8F5] border border-stone-200 flex items-center justify-center text-stone-800 mb-5">
                <SunMedium className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="text-lg font-display font-medium text-stone-900 mb-2">
                03. 45°C Non-Bleed Colors
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-light mb-4">
                Reactive digital dyes penetrate deeply into the yarn core, ensuring our pastel and jewel hues do not fade or run even under harsh sun or repeated gentle wash cycles.
              </p>
            </div>
            <div className="text-[11px] text-stone-400 uppercase tracking-widest pt-4 border-t border-stone-100 font-medium">
              Colorfast Reactive Chemistry
            </div>
          </div>

        </div>

        {/* Read More button */}
        <div className="mt-10 text-center">
          <button
            onClick={onOpenFabricGuide}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-stone-900 border-b border-stone-900 pb-1 hover:text-stone-600 hover:border-stone-400 transition-colors"
          >
            <span>Explore Complete Lawn & Fabric Care Guide</span>
          </button>
        </div>

      </div>
    </section>
  );
};
