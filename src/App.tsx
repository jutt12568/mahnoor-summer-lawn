/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  PRODUCTS 
} from './data/products';
import { 
  Product, 
  SuitCategory, 
  CartItem, 
  StitchType, 
  ClothingSize, 
  PlacedOrder 
} from './types';
import { AnnouncementBar } from './components/AnnouncementBar';
import { TopBar } from './components/TopBar';
import { HeroCampaign } from './components/HeroCampaign';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { FabricGuideModal } from './components/FabricGuideModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { FabricCraftSection } from './components/FabricCraftSection';
import { CustomerReviews } from './components/CustomerReviews';
import { Footer } from './components/Footer';
import { GitHubSyncModal } from './components/GitHubSyncModal';
import { SlidersHorizontal, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Navigation & Category Filtering State
  const [activeCategory, setActiveCategory] = useState<SuitCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'bestsellers'>('featured');

  // Modals & Drawers State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isFabricGuideOpen, setIsFabricGuideOpen] = useState(false);
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);

  // Notification Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Cart State (Persisted in localStorage)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('suzume_cart') || localStorage.getItem('mahnoor_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State (Persisted in localStorage)
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('suzume_wishlist') || localStorage.getItem('mahnoor_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('suzume_cart', JSON.stringify(cartItems));
    } catch {
      // storage quota fallback
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('suzume_wishlist', JSON.stringify(wishlistIds));
    } catch {
      // storage quota fallback
    }
  }, [wishlistIds]);

  // Wishlist products
  const wishlistProducts = useMemo(() => {
    return PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  }, [wishlistIds]);

  const toggleWishlist = (product: Product) => {
    if (wishlistIds.includes(product.id)) {
      setWishlistIds((prev) => prev.filter((id) => id !== product.id));
      showToast(`Removed from wishlist: ${product.name}`);
    } else {
      setWishlistIds((prev) => [...prev, product.id]);
      showToast(`Added to wishlist: ${product.name}`);
    }
  };

  // Add to Bag Handlers
  const handleAddToCart = (
    product: Product, 
    stitchType: StitchType = 'Unstitched', 
    size?: ClothingSize, 
    quantity: number = 1
  ) => {
    const stitchSurcharge = stitchType === 'Stitched' && product.stitchOptions.includes('Unstitched') ? 1500 : 0;
    const finalPrice = product.pricePKR + stitchSurcharge;
    const cartItemId = `${product.id}-${stitchType}-${size || 'free'}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          productId: product.id,
          name: product.name,
          image: product.image,
          pricePKR: finalPrice,
          stitchType,
          size,
          quantity,
          sku: product.sku
        }
      ];
    });

    showToast(`Added to Bag: ${product.name} (${stitchType})`);
  };

  const handleBuyNow = (
    product: Product, 
    stitchType: StitchType = 'Unstitched', 
    size?: ClothingSize, 
    quantity: number = 1
  ) => {
    handleAddToCart(product, stitchType, size, quantity);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleUpdateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      setCartItems((prev) => prev.filter((it) => it.cartItemId !== cartItemId));
    } else {
      setCartItems((prev) =>
        prev.map((it) =>
          it.cartItemId === cartItemId ? { ...it, quantity: newQty } : it
        )
      );
    }
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((it) => it.cartItemId !== cartItemId));
  };

  const handleOrderSuccess = (order: PlacedOrder) => {
    setCartItems([]);
    showToast(`Order #${order.orderId} placed successfully!`);
  };

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.fabric.technique.toLowerCase().includes(query) ||
        p.colorName.toLowerCase().includes(query) ||
        p.sku.toLowerCase().includes(query) ||
        p.categoryLabel.toLowerCase().includes(query)
      );
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.pricePKR - b.pricePKR);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.pricePKR - a.pricePKR);
    } else if (sortBy === 'bestsellers') {
      result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-stone-900 selection:text-white">
      
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Top Bar Contract */}
      <TopBar
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setSearchQuery('');
        }}
        onOpenFabricGuide={() => setIsFabricGuideOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenGitHubSync={() => setIsGitHubModalOpen(true)}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-950 text-white text-xs px-4 py-3 rounded-none shadow-xl flex items-center gap-2 border border-stone-800 animate-slide-up">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-grow">
        
        {/* 3. Hero Campaign (Visible when in all or default view, or anchor for collection) */}
        <HeroCampaign
          onExploreCategory={(cat) => {
            setActiveCategory(cat);
            const el = document.getElementById('collection-grid');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenFabricGuide={() => setIsFabricGuideOpen(true)}
        />

        {/* 4. Featured Summer Collection Grid Section */}
        <section id="collection-grid" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header & Filter Controls Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone-500 font-semibold mb-1">
                <span>Catalogue 2026</span>
                <span aria-hidden="true">·</span>
                <span>Pakistan Nationwide Edition</span>
              </div>
              <h2 className="text-3xl font-display font-medium text-stone-900">
                {activeCategory === 'all' && 'The Summer Lawn Collection'}
                {activeCategory === 'unstitched' && 'Unstitched 3-Piece Lawn'}
                {activeCategory === 'pret' && 'Ready-To-Wear Prêt Kurtis'}
                {activeCategory === 'festive' && 'Luxury Schiffli & Festive Lawn'}
                {activeCategory === 'daily' && 'Daily Breeze 2-Piece Lawn'}
              </h2>
            </div>

            {/* Filter Tabs & Sorting Select */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Interactive Segmented Filter Controls */}
              <div className="flex items-center bg-stone-100 p-1 rounded-none border border-stone-200 text-xs font-medium">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-3 py-1.5 transition-colors whitespace-nowrap ${
                    activeCategory === 'all' ? 'bg-white text-stone-950 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  All ({PRODUCTS.length})
                </button>
                <button
                  onClick={() => setActiveCategory('unstitched')}
                  className={`px-3 py-1.5 transition-colors whitespace-nowrap ${
                    activeCategory === 'unstitched' ? 'bg-white text-stone-950 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Unstitched 3PC
                </button>
                <button
                  onClick={() => setActiveCategory('pret')}
                  className={`px-3 py-1.5 transition-colors whitespace-nowrap ${
                    activeCategory === 'pret' ? 'bg-white text-stone-950 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Prêt
                </button>
                <button
                  onClick={() => setActiveCategory('festive')}
                  className={`px-3 py-1.5 transition-colors whitespace-nowrap ${
                    activeCategory === 'festive' ? 'bg-white text-stone-950 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Festive Schiffli
                </button>
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-1.5 text-xs text-stone-600">
                <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  aria-label="Sort collection by"
                  className="bg-white border border-stone-200 px-2.5 py-1.5 text-xs text-stone-800 outline-none cursor-pointer"
                >
                  <option value="featured">Featured Order</option>
                  <option value="bestsellers">Bestsellers First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Search Result Feedback */}
          {searchQuery && (
            <div className="mb-6 flex items-center justify-between bg-amber-50/70 border border-amber-200/60 p-3 text-xs text-stone-700">
              <span>
                Showing results for query: <strong className="text-stone-900">"{searchQuery}"</strong> ({filteredProducts.length} items found)
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-stone-500 hover:text-stone-900 underline text-xs"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* 3-Column Desktop Product Grid with Generous Whitespace */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white border border-stone-200 p-8">
              <p className="text-base font-medium text-stone-900 mb-1">No matching summer suits found</p>
              <p className="text-xs text-stone-500 mb-4">Try clearing your search terms or view our all-suits summer catalogue.</p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="bg-stone-900 text-white text-xs uppercase tracking-wider px-5 py-2 hover:bg-stone-800 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setSelectedProduct(p)}
                  onQuickAdd={(p) => handleAddToCart(p, p.stitchOptions[0] || 'Unstitched')}
                  isWishlisted={wishlistIds.includes(product.id)}
                  onToggleWishlist={toggleWishlist}
                />
              ))}
            </div>
          )}

        </section>

        {/* 5. Fabric & Craftsmanship Section */}
        <FabricCraftSection onOpenFabricGuide={() => setIsFabricGuideOpen(true)} />

        {/* 6. Customer Testimonials Section */}
        <CustomerReviews />

      </main>

      {/* 7. Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          window.scrollTo({ top: 600, behavior: 'smooth' });
        }}
        onOpenFabricGuide={() => setIsFabricGuideOpen(true)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenGitHubSync={() => setIsGitHubModalOpen(true)}
      />

      {/* Interactive Overlays & Modals */}
      
      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={(p) => toggleWishlist(p)}
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlistProducts}
        onRemoveFromWishlist={(id) => setWishlistIds((prev) => prev.filter((i) => i !== id))}
        onAddToCart={(p) => handleAddToCart(p, p.stitchOptions[0] || 'Unstitched')}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        discount={0}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      {/* Fabric Guide Modal */}
      <FabricGuideModal
        isOpen={isFabricGuideOpen}
        onClose={() => setIsFabricGuideOpen(false)}
      />

      {/* GitHub Repository Sync Modal */}
      <GitHubSyncModal
        isOpen={isGitHubModalOpen}
        onClose={() => setIsGitHubModalOpen(false)}
      />

    </div>
  );
}
