'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, Button, Input } from '@/components/ui';
import { useCart } from '@/hooks';
import { formatPrice } from '@/lib/utils';
import { couponsAPI } from '@/lib/api';
import toast from 'react-hot-toast';

interface CartSummaryProps {
  showCheckoutButton?: boolean;
}

export default function CartSummary({ showCheckoutButton = true }: CartSummaryProps) {
  const { total, itemsCount } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const deliveryCharge = total >= 500 ? 0 : 49;
  const finalTotal = total - discount + deliveryCharge;

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    setIsValidating(true);
    try {
      const response = await couponsAPI.validate(couponCode.toUpperCase());
      const coupon = response.data.data;

      let discountAmount = 0;
      if (coupon.discountType === 'percentage') {
        discountAmount = Math.min(
          (total * coupon.discountValue) / 100,
          coupon.maxDiscount
        );
      } else {
        discountAmount = coupon.discountValue;
      }

      if (total < coupon.minOrderAmount) {
        toast.error(`Minimum order amount is ${formatPrice(coupon.minOrderAmount)}`);
        return;
      }

      setDiscount(discountAmount);
      setAppliedCoupon(couponCode.toUpperCase());
      toast.success(`Coupon applied! You save ${formatPrice(discountAmount)}`);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Invalid coupon code');
    } finally {
      setIsValidating(false);
    }
  };

  const handleRemoveCoupon = () => {
    setDiscount(0);
    setAppliedCoupon(null);
    setCouponCode('');
  };

  return (
    <Card variant="bordered" className="sticky top-24">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>

        {/* Coupon */}
        {!appliedCoupon ? (
          <div className="mb-6">
            <div className="flex gap-2">
              <Input
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                className="flex-1"
              />
              <Button
                variant="outline"
                onClick={handleApplyCoupon}
                isLoading={isValidating}
                disabled={!couponCode.trim()}
              >
                Apply
              </Button>
            </div>
          </div>
        ) : (
          <div className="mb-6 flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div>
              <span className="text-sm font-medium text-green-800">{appliedCoupon}</span>
              <span className="text-sm text-green-600 ml-2">applied</span>
            </div>
            <button
              onClick={handleRemoveCoupon}
              className="text-sm text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        )}

        {/* Price Breakdown */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal ({itemsCount} items)</span>
            <span className="font-medium">{formatPrice(total)}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-{formatPrice(discount)}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-gray-600">Delivery Charge</span>
            <span className="font-medium">
              {deliveryCharge === 0 ? (
                <span className="text-green-600">FREE</span>
              ) : (
                formatPrice(deliveryCharge)
              )}
            </span>
          </div>

          {total < 500 && (
            <p className="text-xs text-gray-500">
              Add {formatPrice(500 - total)} more for free delivery
            </p>
          )}

          <hr className="my-3" />

          <div className="flex justify-between text-base">
            <span className="font-semibold">Total</span>
            <span className="font-bold text-gray-900">{formatPrice(finalTotal)}</span>
          </div>
        </div>

        {/* Checkout Button */}
        {showCheckoutButton && (
          <Link href="/checkout" className="block mt-6">
            <Button className="w-full" size="lg" disabled={itemsCount === 0}>
              Proceed to Checkout
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
