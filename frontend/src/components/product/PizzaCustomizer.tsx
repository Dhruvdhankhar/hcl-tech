'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { X, Plus, Minus } from 'lucide-react';
import { Button, VegBadge } from '@/components/ui';
import { useCart, useAuth } from '@/hooks';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types';

interface PizzaCustomizerProps {
  product: Product;
  onClose: () => void;
}

export default function PizzaCustomizer({ product, onClose }: PizzaCustomizerProps) {
  const { addToCart, addToLocalCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  // Calculate total price
  const totalPrice = useMemo(() => {
    return product.basePrice * quantity;
  }, [product.basePrice, quantity]);

  const handleAddToCart = async () => {
    setIsAdding(true);

    if (isAuthenticated) {
      await addToCart({
        productId: product._id,
        quantity,
      });
    } else {
      // Add to local cart for guests
      addToLocalCart({
        _id: `${product._id}-${Date.now()}`,
        product,
        quantity,
        itemTotal: totalPrice,
      });
    }

    setIsAdding(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 z-10"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Product Image */}
        <div className="relative h-48 bg-gray-100">
          <Image
            src={product.image || '/images/placeholder-pizza.jpg'}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-6">
          {/* Product Info */}
          <div className="flex items-start gap-3 mb-6">
            <VegBadge isVeg={product.isVeg} />
            <div>
              <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
              <p className="text-sm text-gray-500 mt-1">{product.description}</p>
            </div>
          </div>

          {/* Product Description */}
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Quantity & Add to Cart */}
          <div className="flex items-center gap-4 pt-4 border-t">
            {/* Quantity */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add Button */}
            <Button
              className="flex-1"
              onClick={handleAddToCart}
              isLoading={isAdding}
            >
              Add to Cart - {formatPrice(totalPrice)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
