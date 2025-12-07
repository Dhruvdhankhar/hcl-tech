'use client';

import { useEffect, useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { ProductList } from '@/components/product';
import { Button, Input, SectionLoader, Badge } from '@/components/ui';
import { useProducts } from '@/hooks';
 

const categories = [
  { id: 'all', name: 'All' },
  { id: 'veg-pizza', name: 'Veg Pizzas' },
  { id: 'non-veg-pizza', name: 'Non-Veg Pizzas' },
  { id: 'sides', name: 'Sides' },
  { id: 'beverages', name: 'Beverages' },
  { id: 'desserts', name: 'Desserts' },
];

export default function MenuPage() {
  const { products, isLoading, fetchProducts, selectedCategory, setCategory } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Product interactions are handled within ProductCard/PizzaCustomizer components

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === null || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Our Menu</h1>
          <p className="text-gray-600 mt-2">
            Choose from our delicious selection of pizzas and more
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search pizzas, sides, beverages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>

          {/* Mobile Filter Toggle */}
          <Button
            variant="outline"
            className="lg:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>

          {/* Desktop Category Filters */}
          <div className="hidden lg:flex items-center gap-2">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === (cat.id === 'all' ? null : cat.id) ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setCategory(cat.id === 'all' ? null : cat.id)}
              >
                {cat.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Mobile Category Filters */}
        {showFilters && (
          <div className="lg:hidden flex flex-wrap gap-2 mb-6 p-4 bg-white rounded-lg shadow-sm">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === (cat.id === 'all' ? null : cat.id) ? 'primary' : 'outline'}
                size="sm"
                onClick={() => {
                  setCategory(cat.id === 'all' ? null : cat.id);
                  setShowFilters(false);
                }}
              >
                {cat.name}
              </Button>
            ))}
          </div>
        )}

        {/* Active Filters */}
        {(selectedCategory !== null || searchQuery) && (
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm text-gray-500">Active filters:</span>
            {selectedCategory !== null && (
              <div className="flex items-center gap-1">
                <Badge variant="info">
                  {categories.find((c) => (selectedCategory ? c.id === selectedCategory : c.id === 'all'))?.name}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label="Clear category"
                  onClick={() => setCategory(null)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            )}
            {searchQuery && (
              <div className="flex items-center gap-1">
                <Badge variant="default">&quot;{searchQuery}&quot;</Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label="Clear search"
                  onClick={() => setSearchQuery('')}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Products */}
        {isLoading ? (
          <SectionLoader />
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500">No products found</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setCategory('all');
                setSearchQuery('');
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <ProductList products={filteredProducts} />
        )}
      </main>

      <Footer />

      {/* Customizer handled within individual ProductCard */}
    </div>
  );
}
