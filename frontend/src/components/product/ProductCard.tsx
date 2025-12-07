'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Card, CardContent, Button, VegBadge } from '@/components/ui';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types';
import PizzaCustomizer from './PizzaCustomizer';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [showCustomizer, setShowCustomizer] = useState(false);

  const basePrice = product.basePrice;

  return (
    <>
      <Card variant="bordered" className="overflow-hidden hover:shadow-lg transition-shadow">
        {/* Image */}
        <div className="relative h-48 bg-gray-100">
          <Image
            src={product.image || '/images/placeholder-pizza.jpg'}
            alt={product.name}
            fill
            className="object-cover"
          />
          <div className="absolute top-3 left-3">
            <VegBadge isVeg={product.isVeg} />
          </div>
          {!product.isAvailable && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold">Currently Unavailable</span>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          {/* Info */}
          <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">
            {product.description}
          </p>

          {/* Price and Action */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(basePrice)}
              </span>
              {product.category === 'pizza' && (
                <span className="text-xs text-gray-500 ml-1">onwards</span>
              )}
            </div>
            <Button
              size="sm"
              onClick={() => setShowCustomizer(true)}
              disabled={!product.isAvailable}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Customizer Modal */}
      {showCustomizer && (
        <PizzaCustomizer
          product={product}
          onClose={() => setShowCustomizer(false)}
        />
      )}
    </>
  );
}
