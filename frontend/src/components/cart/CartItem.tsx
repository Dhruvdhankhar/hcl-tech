'use client';

import Image from 'next/image';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { Card, VegBadge } from '@/components/ui';
import { useCart } from '@/hooks';
import { formatPrice } from '@/lib/utils';
import type { CartItem as CartItemType } from '@/types';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart, isLoading } = useCart();

  return (
    <Card variant="bordered" className="p-4">
      <div className="flex gap-4">
        {/* Image */}
        <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 shrink-0">
          <Image
            src={item.product.image || '/images/placeholder-pizza.jpg'}
            alt={item.product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2">
            <VegBadge isVeg={item.product.isVeg} />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 truncate">
                {item.product.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {item.product.description}
              </p>
            </div>
          </div>

          {/* Price & Quantity */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                disabled={isLoading}
                className="p-1.5 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                disabled={isLoading}
                className="p-1.5 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-bold text-gray-900">
                {formatPrice(item.itemTotal)}
              </span>
              <button
                onClick={() => removeFromCart(item._id)}
                disabled={isLoading}
                className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
