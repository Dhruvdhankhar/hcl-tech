'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { X, Plus, Minus } from 'lucide-react';
import { Button, VegBadge } from '@/components/ui';
import { useCart, useAuth } from '@/hooks';
import { formatPrice, cn } from '@/lib/utils';
import type { Product } from '@/types';

interface PizzaCustomizerProps {
  product: Product;
  onClose: () => void;
}

export default function PizzaCustomizer({ product, onClose }: PizzaCustomizerProps) {
  const { addToCart, addToLocalCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [selectedSize, setSelectedSize] = useState(product.sizes[0]?.name || 'medium');
  const [selectedCrust, setSelectedCrust] = useState(product.crusts[0]?.name || 'classic');
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  // Calculate total price
  const totalPrice = useMemo(() => {
    const sizePrice = product.sizes.find((s) => s.name === selectedSize)?.price || product.basePrice;
    const crustPrice = product.crusts.find((c) => c.name === selectedCrust)?.price || 0;
    const toppingsPrice = selectedToppings.reduce((total, toppingName) => {
      const topping = product.toppings.find((t) => t.name === toppingName);
      return total + (topping?.price || 0);
    }, 0);
    return (sizePrice + crustPrice + toppingsPrice) * quantity;
  }, [product, selectedSize, selectedCrust, selectedToppings, quantity]);

  const handleToggleTopping = (toppingName: string) => {
    setSelectedToppings((prev) =>
      prev.includes(toppingName)
        ? prev.filter((t) => t !== toppingName)
        : [...prev, toppingName]
    );
  };

  const handleAddToCart = async () => {
    setIsAdding(true);

    if (isAuthenticated) {
      await addToCart({
        productId: product._id,
        quantity,
        size: selectedSize,
        crust: selectedCrust,
        toppings: selectedToppings,
      });
    } else {
      // Add to local cart for guests
      addToLocalCart({
        _id: `${product._id}-${Date.now()}`,
        product,
        quantity,
        size: selectedSize,
        crust: selectedCrust,
        toppings: selectedToppings,
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

          {/* Size Selection */}
          {product.sizes.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Choose Size</h3>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size.name)}
                    className={cn(
                      'flex-1 py-3 px-4 rounded-lg border-2 transition-all',
                      selectedSize === size.name
                        ? 'border-red-600 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    )}
                  >
                    <span className="block font-medium capitalize">{size.name}</span>
                    <span className="text-sm text-gray-500">{formatPrice(size.price)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Crust Selection */}
          {product.crusts.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Choose Crust</h3>
              <div className="grid grid-cols-2 gap-3">
                {product.crusts.map((crust) => (
                  <button
                    key={crust.name}
                    onClick={() => setSelectedCrust(crust.name)}
                    className={cn(
                      'py-3 px-4 rounded-lg border-2 transition-all text-left',
                      selectedCrust === crust.name
                        ? 'border-red-600 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    )}
                  >
                    <span className="block font-medium">{crust.name}</span>
                    {crust.price > 0 && (
                      <span className="text-sm text-gray-500">+{formatPrice(crust.price)}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Toppings Selection */}
          {product.toppings.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Extra Toppings</h3>
              <div className="grid grid-cols-2 gap-3">
                {product.toppings.map((topping) => (
                  <button
                    key={topping.name}
                    onClick={() => handleToggleTopping(topping.name)}
                    className={cn(
                      'flex items-center gap-3 py-3 px-4 rounded-lg border-2 transition-all',
                      selectedToppings.includes(topping.name)
                        ? 'border-red-600 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    )}
                  >
                    <VegBadge isVeg={topping.isVeg} />
                    <div className="flex-1 text-left">
                      <span className="block font-medium">{topping.name}</span>
                      <span className="text-sm text-gray-500">+{formatPrice(topping.price)}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

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
