import Link from 'next/link';
import { Card, CardContent, Badge } from '@/components/ui';
import { formatPrice, formatDate, getOrderStatusColor, getOrderStatusText } from '@/lib/utils';
import type { Order } from '@/types';
import { Package, ChevronRight } from 'lucide-react';

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <Link href={`/orders/${order._id}`}>
      <Card variant="bordered" className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Package className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{order.orderNumber}</p>
                <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
              </div>
            </div>
            <Badge className={getOrderStatusColor(order.orderStatus)}>
              {getOrderStatusText(order.orderStatus)}
            </Badge>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {order.items.length} item{order.items.length > 1 ? 's' : ''}
                </p>
                <p className="font-semibold text-gray-900">
                  {formatPrice(order.totalAmount)}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
