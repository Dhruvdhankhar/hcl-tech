'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, MapPin, Phone, Mail, Edit, Trash2, Plus } from 'lucide-react';
import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import { Button, Input, Card, CardContent, Modal } from '@/components/ui';
import { addressSchema } from '@/lib/validations';
import { useAuth } from '@/hooks';
import { userAPI } from '@/lib/api';
import toast from 'react-hot-toast';
import type { Address } from '@/types';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid phone number'),
});

type ProfileFormData = z.infer<typeof profileSchema>;
type AddressFormData = z.infer<typeof addressSchema>;

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      phone: user?.phone || '',
    },
  });

  const {
    register: registerAddress,
    handleSubmit: handleAddressSubmit,
    formState: { errors: addressErrors },
    reset: resetAddressForm,
    setValue: setAddressValue,
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
  });

  const handleUpdateProfile = async (data: ProfileFormData) => {
    try {
      await userAPI.updateProfile(data);
      toast.success('Profile updated successfully');
      setIsEditingProfile(false);
      window.location.reload();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleAddAddress = async (data: AddressFormData) => {
    try {
      // Transform label to type for API compatibility
      const addressData = {
        ...data,
        type: data.label || 'Home',
      };
      
      if (editingAddress) {
        await userAPI.updateAddress(editingAddress._id, addressData);
        toast.success('Address updated successfully');
      } else {
        await userAPI.addAddress(addressData);
        toast.success('Address added successfully');
      }
      setShowAddressModal(false);
      setEditingAddress(null);
      resetAddressForm();
      // Refresh user data
      window.location.reload();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Failed to save address');
    }
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setAddressValue('label', address.type || address.label || '');
    setAddressValue('street', address.street);
    setAddressValue('city', address.city);
    setAddressValue('state', address.state);
    setAddressValue('pincode', address.pincode);
    setAddressValue('isDefault', address.isDefault || false);
    setShowAddressModal(true);
  };

  const handleDeleteAddress = async (addressId: string) => {
    if (!confirm('Are you sure you want to delete this address?')) return;

    try {
      await userAPI.deleteAddress(addressId);
      toast.success('Address deleted successfully');
      window.location.reload();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Failed to delete address');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <User className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Please login to view profile
          </h1>
          <p className="text-gray-600 mb-6">
            You need to be logged in to manage your profile
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
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-1">Manage your account and addresses</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card variant="bordered">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Personal Info</h2>
                  <button
                    onClick={() => setIsEditingProfile(!isEditingProfile)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>

                {isEditingProfile ? (
                  <form
                    onSubmit={handleProfileSubmit(handleUpdateProfile)}
                    className="space-y-4"
                  >
                    <Input
                      label="Full Name"
                      error={profileErrors.name?.message}
                      {...registerProfile('name')}
                    />
                    <Input
                      label="Phone Number"
                      error={profileErrors.phone?.message}
                      {...registerProfile('phone')}
                    />
                    <div className="flex gap-2">
                      <Button type="submit" size="sm">
                        Save
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditingProfile(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user?.name}</p>
                        <p className="text-sm text-gray-500">Customer</p>
                      </div>
                    </div>
                    <div className="space-y-3 pt-4 border-t">
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{user?.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">
                          {user?.phone || 'Not added'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Addresses */}
          <div className="lg:col-span-2">
            <Card variant="bordered">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Saved Addresses</h2>
                  <Button
                    size="sm"
                    onClick={() => {
                      setEditingAddress(null);
                      resetAddressForm();
                      setShowAddressModal(true);
                    }}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add New
                  </Button>
                </div>

                {user?.addresses && user.addresses.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {user.addresses.map((address: Address) => (
                      <div
                        key={address._id}
                        className="p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="inline-block px-2 py-0.5 text-xs font-medium bg-gray-100 rounded capitalize">
                            {address.type}
                          </span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditAddress(address)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteAddress(address._id)}
                              className="text-gray-400 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <p className="font-medium text-gray-900">
                          {address.street}
                        </p>
                        <p className="text-sm text-gray-600">
                          {address.city}, {address.state} - {address.pincode}
                        </p>
                        {address.landmark && (
                          <p className="text-sm text-gray-500 mt-1">
                            Landmark: {address.landmark}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MapPin className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500">No saved addresses</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />

      {/* Add/Edit Address Modal */}
      <Modal
        isOpen={showAddressModal}
        onClose={() => {
          setShowAddressModal(false);
          setEditingAddress(null);
          resetAddressForm();
        }}
        title={editingAddress ? 'Edit Address' : 'Add New Address'}
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
                Set as default address
              </label>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => {
                setShowAddressModal(false);
                setEditingAddress(null);
                resetAddressForm();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {editingAddress ? 'Update Address' : 'Save Address'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
