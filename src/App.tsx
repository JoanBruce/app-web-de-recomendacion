import React, { useState } from 'react';
import { ProductCard } from './components/ProductCard';
import { CategoryFilter } from './components/CategoryFilter';
import { useRecommendations } from './hooks/useRecommendations';
import { categories, products } from './data/products';
import { Sparkles } from 'lucide-react';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { recommendations, mostInteractedProducts, handleProductClick, handleMouseEnter, resetInteractionCounts, clearHoverTimer } = useRecommendations(products);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">SmartShop</h1>
            <nav className="flex gap-4">
              <button className="text-gray-600 hover:text-gray-900">Sign In</button>
              <button className="text-gray-600 hover:text-gray-900">Cart (0)</button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {mostInteractedProducts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Most Interacted Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {mostInteractedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onMouseEnter={() => handleMouseEnter(product.id)}
                  onMouseLeave={() => clearHoverTimer(product.id)}
                  onClick={() => handleProductClick(product.id)}
                />
              ))}
            </div>
          </section>
        )}

        <button onClick={resetInteractionCounts} className="mt-4 p-2 bg-red-500 text-white rounded">
          Resetear Contadores
        </button>

        {recommendations.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="text-yellow-500" size={24} />
              <h2 className="text-xl font-semibold text-gray-900">
                Products You Might Like
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendations.map((product) => (
                <ProductCard
                  key={`rec-${product.id}`}
                  product={product}
                  onMouseEnter={() => handleMouseEnter(product.id)}
                  onMouseLeave={() => clearHoverTimer(product.id)}
                  onClick={() => handleProductClick(product.id)}
                />
              ))}
            </div>
          </section>
        )}

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onMouseEnter={() => handleMouseEnter(product.id)}
              onMouseLeave={() => clearHoverTimer(product.id)}
              onClick={() => handleProductClick(product.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
