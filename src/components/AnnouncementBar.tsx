import React, { useState } from 'react';
import { Truck, ShieldCheck, X } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <aside aria-label="Store announcement" className="bg-[#1C1917] text-[#EDE8E1] text-[12px] py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden sm:flex items-center gap-2 text-stone-400">
          <Truck className="w-3.5 h-3.5 text-amber-300 shrink-0" />
          <span>Nationwide TCS & Leopards Courier</span>
        </div>

        <div className="flex-1 text-center font-medium tracking-wide">
          <span>SUMMER LAWN ’26 EDIT</span>
          <span className="mx-2 text-stone-500">·</span>
          <span>Free Nationwide Delivery on orders over Rs. 3,999</span>
          <span className="mx-2 text-stone-500">·</span>
          <span className="text-amber-200">Cash on Delivery Available</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 text-stone-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>7-Day Return & Exchange</span>
          </div>
          <button
            onClick={() => setVisible(false)}
            className="text-stone-400 hover:text-stone-200 p-0.5 rounded transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
