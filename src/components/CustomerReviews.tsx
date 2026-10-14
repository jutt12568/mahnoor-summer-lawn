import React from 'react';
import { Star, CheckCircle, MapPin } from 'lucide-react';
import { REVIEWS } from '../data/products';

export const CustomerReviews: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-stone-200">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-stone-500 font-semibold mb-1">
              Real Pakistani Client Experiences
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-medium text-stone-900">
              Loved Across Karachi, Lahore & Islamabad
            </h2>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs text-stone-600">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
              ))}
            </div>
            <span className="font-semibold text-stone-900">4.9 / 5.0</span>
            <span className="text-stone-400">·</span>
            <span>Over 12,400+ Summer Suits Delivered</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <div key={rev.id} className="bg-white p-6 border border-stone-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400 font-mono">{rev.date}</span>
                </div>

                <p className="text-xs sm:text-[13px] text-stone-700 leading-relaxed font-light mb-4 italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-stone-900 flex items-center gap-1.5">
                      <span>{rev.author}</span>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 inline" />
                    </div>
                    <div className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-stone-400" />
                      <span>{rev.city}</span>
                    </div>
                  </div>
                  <div className="text-[10px] text-stone-400 max-w-[120px] text-right truncate">
                    {rev.productName}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
