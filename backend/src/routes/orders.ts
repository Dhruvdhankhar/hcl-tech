import { Router, Response } from 'express';
import Order from '../models/Order';
import Cart from '../models/Cart';
import Product from '../models/Product';
import Coupon from '../models/Coupon';
import User from '../models/User';
import { protect, AuthRequest } from '../middleware/auth';
import mongoose from 'mongoose';

const router = Router();

// Generate unique order number
const generateOrderNumber = () => {
  return 'ORD' + Date.now() + Math.floor(Math.random() * 1000);
};

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', protect, async (req: AuthRequest, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { addressId, paymentMethod, couponCode } = req.body;

    if (!addressId || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'Address and payment method are required'
      });
    }

    // Get cart
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // Get user and address
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const address = user.addresses.find(addr => addr._id?.toString() === addressId);
    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found'
      });
    }

    // Check inventory for all items
    for (const item of cart.items) {
      const product = await Product.findById(item.product._id).session(session);
      if (!product) {
        await session.abortTransaction();
        return res.status(404).json({
          success: false,
          message: `Product ${item.product._id} not found`
        });
      }

      if (product.inventory < item.quantity) {
        await session.abortTransaction();
        return res.status(400).json({
          success: false,
          message: `Insufficient inventory for ${product.name}. Available: ${product.inventory}, Requested: ${item.quantity}`
        });
      }
    }

    // Calculate order totals
    let subtotal = cart.totalAmount;
    let discount = 0;
    let deliveryCharge = subtotal < 500 ? 40 : 0;
    let appliedCoupon = undefined;

    // Apply coupon if provided
    if (couponCode) {
      const coupon = await Coupon.findOne({ 
        code: couponCode.toUpperCase(),
        isActive: true
      });

      if (coupon) {
        const now = new Date();
        if (now >= coupon.validFrom && now <= coupon.validUntil) {
          if (subtotal >= coupon.minOrderAmount) {
            if (coupon.discountType === 'percentage') {
              discount = (subtotal * coupon.discountValue) / 100;
              if (coupon.maxDiscount > 0) {
                discount = Math.min(discount, coupon.maxDiscount);
              }
            } else {
              discount = coupon.discountValue;
            }
            appliedCoupon = couponCode.toUpperCase();
          }
        }
      }
    }

    const totalAmount = subtotal + deliveryCharge - discount;

    // Deduct inventory
    console.log('Starting inventory deduction...');
    for (const item of cart.items) {
      const productBefore = await Product.findById(item.product._id).session(session);
      console.log(`Product ${productBefore?.name} - Inventory before: ${productBefore?.inventory}, Deducting: ${item.quantity}`);
      
      const updatedProduct = await Product.findByIdAndUpdate(
        item.product._id,
        { $inc: { inventory: -item.quantity } },
        { session, new: true }
      );
      
      console.log(`Product ${updatedProduct?.name} - Inventory after: ${updatedProduct?.inventory}`);
    }

    // Create order items
    const orderItems = cart.items.map(item => ({
      product: item.product._id,
      name: (item.product as any).name,
      quantity: item.quantity,
      price: (item.product as any).basePrice
    }));

    // Create order
    const order = await Order.create([{
      orderNumber: generateOrderNumber(),
      user: req.user._id,
      items: orderItems,
      deliveryAddress: {
        type: address.type,
        street: address.street,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        landmark: address.landmark
      },
      paymentMethod,
      paymentStatus: paymentMethod === 'online' ? 'paid' : 'pending',
      orderStatus: 'placed',
      subtotal,
      deliveryCharge,
      discount,
      totalAmount,
      couponApplied: appliedCoupon,
      estimatedDelivery: new Date(Date.now() + 45 * 60 * 1000) // 45 minutes from now
    }], { session });

    // Clear cart
    cart.items = [];
    cart.totalAmount = 0;
    await cart.save({ session });

    await session.commitTransaction();
    console.log('Transaction committed successfully. Inventory updated in MongoDB.');

    // Verify inventory was updated in database
    const verifyProducts = await Product.find({ 
      _id: { $in: cart.items.map(item => item.product._id) } 
    });
    console.log('Verification - Current inventory in DB:');
    verifyProducts.forEach(p => {
      console.log(`  ${p.name}: ${p.inventory} units`);
    });

    res.status(201).json({
      success: true,
      data: order[0]
    });
  } catch (error) {
    await session.abortTransaction();
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  } finally {
    session.endSession();
  }
});

// @route   GET /api/orders
// @desc    Get user's orders
// @access  Private
router.get('/', protect, async (req: AuthRequest, res: Response) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate('items.product');

    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/orders/:id
// @desc    Get single order
// @access  Private
router.get('/:id', protect, async (req: AuthRequest, res: Response) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate('items.product');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/orders/track/:orderNumber
// @desc    Track order by order number
// @access  Private
router.get('/track/:orderNumber', protect, async (req: AuthRequest, res: Response) => {
  try {
    const order = await Order.findOne({
      orderNumber: req.params.orderNumber,
      user: req.user._id
    }).populate('items.product');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Track order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/orders/:id/status
// @desc    Update order status
// @access  Private
router.put('/:id/status', protect, async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;

    const validStatuses = ['placed', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order status'
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/orders/admin/all
// @desc    Get all orders (Admin)
// @access  Private
router.get('/admin/all', protect, async (req: AuthRequest, res: Response) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate('user', 'name email phone')
      .populate('items.product');

    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
