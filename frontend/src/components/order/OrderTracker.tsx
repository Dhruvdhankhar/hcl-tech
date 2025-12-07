'use client';

import { CheckCircle, Circle, Truck, ChefHat, ClipboardCheck, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OrderTrackerProps {
  status: string;
}

const steps = [
  { key: 'placed', label: 'Order Placed', icon: ClipboardCheck },
  { key: 'confirmed', label: 'Confirmed', icon: CheckCircle },
  { key: 'preparing', label: 'Preparing', icon: ChefHat },
  { key: 'out_for_delivery', label: 'Out for Delivery', icon: Truck },
  { key: 'delivered', label: 'Delivered', icon: Package },
];

export default function OrderTracker({ status }: OrderTrackerProps) {
  const currentIndex = steps.findIndex((step) => step.key === status);
  const isCancelled = status === 'cancelled';

  if (isCancelled) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
        <p className="text-red-700 font-semibold">Order Cancelled</p>
        <p className="text-sm text-red-600 mt-1">
          This order has been cancelled. If you have any questions, please contact support.
        </p>
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;
          const Icon = step.icon;

          return (
            <div
              key={step.key}
              className={cn(
                'flex flex-col items-center relative',
                index < steps.length - 1 && 'flex-1'
              )}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'absolute top-5 left-1/2 w-full h-0.5',
                    index < currentIndex ? 'bg-green-500' : 'bg-gray-200'
                  )}
                />
              )}

              {/* Icon */}
              <div
                className={cn(
                  'relative z-10 w-10 h-10 rounded-full flex items-center justify-center',
                  isCompleted
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-400'
                )}
              >
                {isCompleted ? (
                  <Icon className="w-5 h-5" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </div>

              {/* Label */}
              <span
                className={cn(
                  'mt-2 text-xs text-center',
                  isCurrent ? 'text-green-600 font-semibold' : 'text-gray-500'
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
