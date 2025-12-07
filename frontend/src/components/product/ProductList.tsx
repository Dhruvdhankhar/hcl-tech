'use client';

import { SectionLoader } from '@/components/ui';
import ProductCard from './ProductCard';
import type { Product } from '@/types';

interface ProductListProps {
  products: Product[];
  isLoading?: boolean;
  title?: string;
}

export default function ProductList({
  products,
  isLoading,
  title,
}: ProductListProps) {
  if (isLoading) {
    return <SectionLoader />;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No products found</p>
      </div>
    );
  }

  return (
    <div>
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
