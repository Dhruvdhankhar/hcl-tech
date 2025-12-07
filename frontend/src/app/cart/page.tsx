'use client';

import Link from 'next/link';
import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { CartItem, CartSummary } from '@/components/cart';
import { Button } from '@/components/ui';
import { useCart } from '@/hooks';

export default function CartPage() {
  const { items, isLoading, clearCart, itemsCount } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
            <p className="text-gray-600 mt-1">
              {itemsCount} item{itemsCount !== 1 ? 's' : ''} in your cart
            </p>
          </div>
          {items.length > 0 && (
            <Button
              variant="outline"
              className="text-red-600 border-red-300 hover:bg-red-50"
              onClick={clearCart}
              isLoading={isLoading}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Cart
            </Button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven&apos;t added anything to your cart yet
            </p>
            <Link href="/menu">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Browse Menu
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}

              <Link
                href="/menu"
                className="inline-flex items-center text-red-600 hover:text-red-700 mt-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Link>
            </div>

            {/* Cart Summary */}
            <div>
              <CartSummary />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
