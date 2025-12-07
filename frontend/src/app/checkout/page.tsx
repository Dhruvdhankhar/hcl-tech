'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin, CreditCard, Wallet, Plus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import { CartSummary } from '@/components/cart';
import { Button, Input, Card, CardContent, Modal } from '@/components/ui';
import { addressSchema } from '@/lib/validations';
import { useCart, useAuth } from '@/hooks';
import { ordersAPI, userAPI } from '@/lib/api';
import toast from 'react-hot-toast';
import type { z } from 'zod';
import type { Address } from '@/types';

type AddressFormData = z.infer<typeof addressSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { items, clearCart } = useCart();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(
    user?.addresses?.[0] || null
  );
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const {
    register: registerAddress,
    handleSubmit: handleAddressSubmit,
    formState: { errors: addressErrors },
    reset: resetAddressForm,
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
  });

  const handleAddAddress = async (data: AddressFormData) => {
    try {
      // Transform label to type for API compatibility
      const addressData = {
        ...data,
        type: data.label || 'Home',
      };
      const response = await userAPI.addAddress(addressData);
      const newAddress = response.data.data;
      setSelectedAddress(newAddress);
      setShowAddressModal(false);
      resetAddressForm();
      toast.success('Address added successfully');
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Failed to add address');
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error('Please select a delivery address');
      return;
    }

    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsPlacingOrder(true);
    try {
      const orderData = {
        addressId: selectedAddress._id,
        paymentMethod,
      };

      const response = await ordersAPI.create(orderData);
      const order = response.data.data;

      if (paymentMethod === 'online') {
        // Redirect to payment gateway
        // For now, simulate payment success
        toast.success('Redirecting to payment...');
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }

      clearCart();
      toast.success('Order placed successfully!');
      router.push(`/orders/${order._id}`);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Please login to continue
          </h1>
          <p className="text-gray-600 mb-6">
            You need to be logged in to place an order
          </p>
          <Link href="/login">
            <Button>Login to Continue</Button>
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
            href="/cart"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <Card variant="bordered">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-red-600" />
                    <h2 className="text-lg font-semibold">Delivery Address</h2>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAddressModal(true)}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add New
                  </Button>
                </div>

                {user?.addresses && user.addresses.length > 0 ? (
                  <div className="space-y-3">
                    {user.addresses.map((address: Address) => (
                      <label
                        key={address._id}
                        className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          selectedAddress?._id === address._id
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="address"
                          className="hidden"
                          checked={selectedAddress?._id === address._id}
                          onChange={() => setSelectedAddress(address)}
                        />
                        <div className="flex justify-between">
                          <div>
                            <span className="inline-block px-2 py-0.5 text-xs font-medium bg-gray-100 rounded mb-2 capitalize">
                              {address.type}
                            </span>
                            <p className="font-medium text-gray-900">
                              {address.street}
                            </p>
                            <p className="text-sm text-gray-600">
                              {address.city}, {address.state} - {address.pincode}
                            </p>
                            {address.landmark && (
                              <p className="text-sm text-gray-500">
                                Landmark: {address.landmark}
                              </p>
                            )}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MapPin className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500 mb-4">No saved addresses</p>
                    <Button
                      variant="outline"
                      onClick={() => setShowAddressModal(true)}
                    >
                      Add Address
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card variant="bordered">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="w-5 h-5 text-red-600" />
                  <h2 className="text-lg font-semibold">Payment Method</h2>
                </div>

                <div className="space-y-3">
                  <label
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === 'cod'
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      className="hidden"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                    />
                    <Wallet className="w-5 h-5 mr-3 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">Cash on Delivery</p>
                      <p className="text-sm text-gray-500">
                        Pay when your order arrives
                      </p>
                    </div>
                  </label>

                  <label
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === 'online'
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      className="hidden"
                      checked={paymentMethod === 'online'}
                      onChange={() => setPaymentMethod('online')}
                    />
                    <CreditCard className="w-5 h-5 mr-3 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">Pay Online</p>
                      <p className="text-sm text-gray-500">
                        Credit/Debit Card, UPI, Net Banking
                      </p>
                    </div>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Place Order Button (Mobile) */}
            <div className="lg:hidden">
              <Button
                className="w-full"
                size="lg"
                onClick={handlePlaceOrder}
                isLoading={isPlacingOrder}
                disabled={!selectedAddress || items.length === 0}
              >
                Place Order
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <CartSummary showCheckoutButton={false} />
            <Button
              className="w-full mt-4 hidden lg:flex"
              size="lg"
              onClick={handlePlaceOrder}
              isLoading={isPlacingOrder}
              disabled={!selectedAddress || items.length === 0}
            >
              Place Order
            </Button>
          </div>
        </div>
      </main>

      <Footer />

      {/* Add Address Modal */}
      <Modal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        title="Add New Address"
      >
        <form onSubmit={handleAddressSubmit(handleAddAddress)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Input
                label="Address Label"
                placeholder="Home, Work, etc."
                error={addressErrors.label?.message}
                {...registerAddress('label')}
              />
            </div>
            <div className="col-span-2">
              <Input
                label="Street Address"
                placeholder="House No, Street, Area"
                error={addressErrors.street?.message}
                {...registerAddress('street')}
              />
            </div>
            <Input
              label="City"
              placeholder="City"
              error={addressErrors.city?.message}
              {...registerAddress('city')}
            />
            <Input
              label="State"
              placeholder="State"
              error={addressErrors.state?.message}
              {...registerAddress('state')}
            />
            <Input
              label="PIN Code"
              placeholder="6-digit PIN"
              error={addressErrors.pincode?.message}
              {...registerAddress('pincode')}
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isDefault"
                className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                {...registerAddress('isDefault')}
              />
              <label htmlFor="isDefault" className="text-sm text-gray-600">
                Set as default
              </label>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setShowAddressModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Save Address
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
