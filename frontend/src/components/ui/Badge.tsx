import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md';
  className?: string;
}

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
}: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}

// Veg/Non-Veg indicator
export function VegBadge({ isVeg }: { isVeg: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center w-5 h-5 rounded border-2',
        isVeg ? 'border-green-600' : 'border-red-600'
      )}
    >
      <span
        className={cn(
          'w-2.5 h-2.5 rounded-full',
          isVeg ? 'bg-green-600' : 'bg-red-600'
        )}
      />
    </span>
  );
}
