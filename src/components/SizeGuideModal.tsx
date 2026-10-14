import React from 'react';
import { X, Ruler, Info } from 'lucide-react';
import { SIZE_CHART } from '../data/products';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-none shadow-2xl border border-stone-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-stone-800" />
            <h3 className="text-base font-semibold text-stone-900 font-display uppercase tracking-wider">
              Pakistani Ready-To-Wear (Prêt) Size Guide
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-900 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <p className="text-xs text-stone-600 leading-relaxed">
            All measurements below are in <strong className="text-stone-900">inches</strong>. Our summer kurtis and stitched suits are tailored with a classic relaxed Pakistani lawn silhouette that allows comfortable airflow in high summer heat.
          </p>

          <div className="overflow-x-auto border border-stone-200">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-stone-100 text-stone-800 font-semibold uppercase tracking-wider text-[11px] border-b border-stone-200">
                  <th className="py-2.5 px-3">Size</th>
                  <th className="py-2.5 px-3">Chest</th>
                  <th className="py-2.5 px-3">Waist</th>
                  <th className="py-2.5 px-3">Hip</th>
                  <th className="py-2.5 px-3">Length</th>
                  <th className="py-2.5 px-3">Shoulder</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {SIZE_CHART.map((row) => (
                  <tr key={row.size} className="hover:bg-stone-50/80">
                    <td className="py-2.5 px-3 font-bold text-stone-900">{row.size}</td>
                    <td className="py-2.5 px-3 font-mono tabular-nums">{row.chest}</td>
                    <td className="py-2.5 px-3 font-mono tabular-nums">{row.waist}</td>
                    <td className="py-2.5 px-3 font-mono tabular-nums">{row.hip}</td>
                    <td className="py-2.5 px-3 font-mono tabular-nums">{row.length}</td>
                    <td className="py-2.5 px-3 font-mono tabular-nums">{row.shoulder}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-[#FAF8F5] p-3.5 border border-stone-200 flex items-start gap-2.5 text-xs text-stone-600">
            <Info className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-stone-800">Unstitched Suits:</span> Unstitched 3-piece sets come with generous fabric yardage (Shirt: 3.0 meters, Dupatta: 2.5 meters, Trouser: 2.25 meters), accommodating custom stitching up to size 3XL or flared anarkali cuts.
            </div>
          </div>
        </div>

        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-stone-900 text-white text-xs uppercase tracking-wider px-5 py-2 hover:bg-stone-800 transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
