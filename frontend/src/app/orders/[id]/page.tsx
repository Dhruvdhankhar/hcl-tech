'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, MapPin, Clock, Package } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { OrderTracker } from '@/components/order';
import { Card, CardContent, SectionLoader, Badge } from '@/components/ui';
import { ordersAPI } from '@/lib/api';
import { formatPrice, formatDate, getOrderStatusColor, getOrderStatusText } from '@/lib/utils';
import toast from 'react-hot-toast';
import type { Order } from '@/types';

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params.id as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await ordersAPI.getById(orderId);
        setOrder(response.data.data);
      } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } };
        toast.error(err.response?.data?.message || 'Failed to load order');
      } finally {
        setIsLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <SectionLoader />
        </main>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order not found</h1>
          <p className="text-gray-600 mb-6">
            The order you&apos;re looking for doesn&apos;t exist
          </p>
          <Link href="/orders">
            <button className="text-red-600 hover:underline">View all orders</button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <Link
            href="/orders"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Orders
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Order #{order.orderNumber}
              </h1>
              <p className="text-gray-500">
                Placed on {formatDate(order.createdAt)}
              </p>
            </div>
            <Badge className={getOrderStatusColor(order.orderStatus)}>
              {getOrderStatusText(order.orderStatus)}
            </Badge>
          </div>
        </div>

        {/* Order Tracker */}
        <Card variant="bordered" className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Order Status</h2>
            <OrderTracker status={order.orderStatus} />
            {order.estimatedDelivery && order.orderStatus !== 'delivered' && (
              <div className="mt-4 flex items-center justify-center gap-2 text-green-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm">
                  Estimated delivery by {formatDate(order.estimatedDelivery)}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <Card variant="bordered">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Order Items</h2>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-4 py-4 border-b border-gray-100 last:border-0"
                    >
                      <div className="w-16 h-16 bg-gray-100 rounded-lg shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-start gap-2">
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {item.name || 'Product'}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between mt-2">
                          <span className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </span>
                          <span className="font-medium">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Delivery */}
          <div className="space-y-6">
            {/* Delivery Address */}
            <Card variant="bordered">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Delivery Address</h2>
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {order.deliveryAddress?.street}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.deliveryAddress?.city}, {order.deliveryAddress?.state}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.deliveryAddress?.pincode}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Summary */}
            <Card variant="bordered">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Payment Summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{formatPrice(order.subtotal)}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-{formatPrice(order.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery</span>
                    <span>
                      {order.deliveryCharge === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        formatPrice(order.deliveryCharge)
                      )}
                    </span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-semibold text-base">
                    <span>Total</span>
                    <span>{formatPrice(order.totalAmount)}</span>
                  </div>
                  <div className="pt-2">
                    <span className="text-gray-500">Paid via: </span>
                    <span className="capitalize font-medium">
                      {order.paymentMethod === 'cod'
                        ? 'Cash on Delivery'
                        : 'Online Payment'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
