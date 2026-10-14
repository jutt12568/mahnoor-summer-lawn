import React from 'react';
import { Search, Heart, ShoppingBag } from 'lucide-react';
import { SuitCategory } from '../types';

interface TopBarProps {
  activeCategory: SuitCategory;
  onSelectCategory: (cat: SuitCategory) => void;
  onOpenFabricGuide: () => void;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
  onOpenGitHubSync: () => void;
  cartCount: number;
  wishlistCount: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenFabricGuide,
  onOpenWishlist,
  onOpenCart,
  onOpenGitHubSync,
  cartCount,
  wishlistCount,
  searchQuery,
  onSearchChange,
  isSearchOpen,
  setIsSearchOpen
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Brand title wordmark (single text element) */}
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            onSelectCategory('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-xl sm:text-2xl font-display font-semibold tracking-[0.16em] text-stone-900 uppercase hover:text-stone-700 transition-colors shrink-0"
        >
          SUZUME COLLECTIONS
        </a>

        {/* Zone 2: 4–6 nav links, 1–2 word labels, single-line */}
        <nav className="hidden lg:flex items-center gap-7 text-[13px] tracking-wider uppercase font-medium text-stone-600">
          <button
            onClick={() => onSelectCategory('all')}
            className={`transition-colors pb-1 border-b-2 whitespace-nowrap ${
              activeCategory === 'all'
                ? 'border-stone-900 text-stone-900 font-semibold'
                : 'border-transparent hover:text-stone-900 hover:border-stone-400'
            }`}
          >
            Summer Lawn
          </button>
          <button
            onClick={() => onSelectCategory('unstitched')}
            className={`transition-colors pb-1 border-b-2 whitespace-nowrap ${
              activeCategory === 'unstitched'
                ? 'border-stone-900 text-stone-900 font-semibold'
                : 'border-transparent hover:text-stone-900 hover:border-stone-400'
            }`}
          >
            Unstitched 3PC
          </button>
          <button
            onClick={() => onSelectCategory('pret')}
            className={`transition-colors pb-1 border-b-2 whitespace-nowrap ${
              activeCategory === 'pret'
                ? 'border-stone-900 text-stone-900 font-semibold'
                : 'border-transparent hover:text-stone-900 hover:border-stone-400'
            }`}
          >
            Ready-To-Wear
          </button>
          <button
            onClick={() => onSelectCategory('festive')}
            className={`transition-colors pb-1 border-b-2 whitespace-nowrap ${
              activeCategory === 'festive'
                ? 'border-stone-900 text-stone-900 font-semibold'
                : 'border-transparent hover:text-stone-900 hover:border-stone-400'
            }`}
          >
            Luxury Schiffli
          </button>
          <button
            onClick={() => onSelectCategory('daily')}
            className={`transition-colors pb-1 border-b-2 whitespace-nowrap ${
              activeCategory === 'daily'
                ? 'border-stone-900 text-stone-900 font-semibold'
                : 'border-transparent hover:text-stone-900 hover:border-stone-400'
            }`}
          >
            Daily Breeze
          </button>
          <button
            onClick={onOpenFabricGuide}
            className="text-stone-500 hover:text-stone-900 transition-colors pb-1 border-b-2 border-transparent hover:border-stone-400 whitespace-nowrap"
          >
            Lawn Guide
          </button>
        </nav>

        {/* Zone 3: 1–2 primary actions (Search, Wishlist, Bag) */}
        <div className="flex items-center gap-4 sm:gap-5">
          {/* Quick Search toggle */}
          <div className="relative">
            {isSearchOpen ? (
              <div className="flex items-center bg-white border border-stone-300 rounded-full px-3 py-1.5 shadow-sm">
                <Search className="w-4 h-4 text-stone-400 shrink-0 mr-2" />
                <input
                  type="text"
                  placeholder="Search lawn, schiffli, pret..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  autoFocus
                  className="w-36 sm:w-48 text-xs bg-transparent border-none outline-none text-stone-800 placeholder-stone-400"
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    onSearchChange('');
                  }}
                  className="text-stone-400 hover:text-stone-600 text-xs ml-1"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-stone-700 hover:text-stone-900 transition-colors"
                aria-label="Search collection"
              >
                <Search className="w-5 h-5 stroke-[1.75]" />
              </button>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="p-2 text-stone-700 hover:text-stone-900 relative transition-colors"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5 stroke-[1.75]" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-stone-900 text-white text-[10px] font-medium flex items-center justify-center tabular-nums">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* GitHub Sync Status Button */}
          <button
            onClick={onOpenGitHubSync}
            className="p-2 text-stone-700 hover:text-stone-900 transition-colors relative"
            aria-label="GitHub Repository"
            title="GitHub: Connected to @jutt12568"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500" />
          </button>

          {/* Shopping Bag CTA */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-stone-900 text-stone-50 hover:bg-stone-800 px-4 py-2 rounded-sm text-xs font-medium tracking-wide uppercase transition-colors"
            aria-label="Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
            <span className="hidden sm:inline">Bag</span>
            <span className="tabular-nums font-semibold bg-stone-800 px-1.5 py-0.5 rounded text-[11px] text-amber-200">
              {cartCount}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
};
