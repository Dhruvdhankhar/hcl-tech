import { Product } from '@/types';

export const menuItems: Product[] = [
  // Pizzas (8 items)
  {
    _id: '1',
    name: 'Margherita',
    description: 'Classic delight with 100% real mozzarella cheese',
    category: 'pizza',
    basePrice: 199,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=400&fit=crop',
    isVeg: true,
    isAvailable: true,
    sizes: [
      { name: 'small', price: 199 },
      { name: 'medium', price: 349 },
      { name: 'large', price: 549 }
    ],
    crusts: [
      { name: 'Classic Hand Tossed', price: 0 },
      { name: 'Cheese Burst', price: 99 },
      { name: 'Thin Crust', price: 0 }
    ],
    toppings: [
      { name: 'Extra Cheese', price: 59, isVeg: true },
      { name: 'Black Olives', price: 49, isVeg: true },
      { name: 'Jalapeno', price: 39, isVeg: true }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '2',
    name: 'Farmhouse',
    description: 'Delightful combination of onion, capsicum, tomato & grilled mushroom',
    category: 'pizza',
    basePrice: 299,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop',
    isVeg: true,
    isAvailable: true,
    sizes: [
      { name: 'small', price: 299 },
      { name: 'medium', price: 449 },
      { name: 'large', price: 649 }
    ],
    crusts: [
      { name: 'Classic Hand Tossed', price: 0 },
      { name: 'Cheese Burst', price: 99 },
      { name: 'Thin Crust', price: 0 }
    ],
    toppings: [
      { name: 'Extra Cheese', price: 59, isVeg: true },
      { name: 'Paneer', price: 69, isVeg: true },
      { name: 'Corn', price: 49, isVeg: true }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '3',
    name: 'Peppy Paneer',
    description: 'Chunky paneer with crisp capsicum and spicy red pepper',
    category: 'pizza',
    basePrice: 349,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=400&fit=crop',
    isVeg: true,
    isAvailable: true,
    sizes: [
      { name: 'small', price: 349 },
      { name: 'medium', price: 499 },
      { name: 'large', price: 699 }
    ],
    crusts: [
      { name: 'Classic Hand Tossed', price: 0 },
      { name: 'Cheese Burst', price: 99 },
      { name: 'Thin Crust', price: 0 }
    ],
    toppings: [
      { name: 'Extra Cheese', price: 59, isVeg: true },
      { name: 'Extra Paneer', price: 79, isVeg: true },
      { name: 'Mushroom', price: 59, isVeg: true }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '4',
    name: 'Mexican Green Wave',
    description: 'Mexican herbs sprinkled on onion, capsicum, tomato & jalapeno',
    category: 'pizza',
    basePrice: 329,
    image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=400&fit=crop',
    isVeg: true,
    isAvailable: true,
    sizes: [
      { name: 'small', price: 329 },
      { name: 'medium', price: 479 },
      { name: 'large', price: 679 }
    ],
    crusts: [
      { name: 'Classic Hand Tossed', price: 0 },
      { name: 'Cheese Burst', price: 99 },
      { name: 'Thin Crust', price: 0 }
    ],
    toppings: [
      { name: 'Extra Cheese', price: 59, isVeg: true },
      { name: 'Jalapeno', price: 39, isVeg: true },
      { name: 'Corn', price: 49, isVeg: true }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '5',
    name: 'Chicken Dominator',
    description: 'Double pepper barbecue chicken, peri-peri chicken, chicken tikka & grilled chicken rashers',
    category: 'pizza',
    basePrice: 499,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=400&fit=crop',
    isVeg: false,
    isAvailable: true,
    sizes: [
      { name: 'small', price: 499 },
      { name: 'medium', price: 649 },
      { name: 'large', price: 849 }
    ],
    crusts: [
      { name: 'Classic Hand Tossed', price: 0 },
      { name: 'Cheese Burst', price: 99 },
      { name: 'Thin Crust', price: 0 }
    ],
    toppings: [
      { name: 'Extra Cheese', price: 59, isVeg: true },
      { name: 'Extra Chicken', price: 99, isVeg: false },
      { name: 'Onion', price: 29, isVeg: true }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '6',
    name: 'Chicken Golden Delight',
    description: 'Double golden chicken topping with extra cheese',
    category: 'pizza',
    basePrice: 449,
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=400&h=400&fit=crop',
    isVeg: false,
    isAvailable: true,
    sizes: [
      { name: 'small', price: 449 },
      { name: 'medium', price: 599 },
      { name: 'large', price: 799 }
    ],
    crusts: [
      { name: 'Classic Hand Tossed', price: 0 },
      { name: 'Cheese Burst', price: 99 },
      { name: 'Thin Crust', price: 0 }
    ],
    toppings: [
      { name: 'Extra Cheese', price: 59, isVeg: true },
      { name: 'Extra Chicken', price: 99, isVeg: false },
      { name: 'Mushroom', price: 59, isVeg: true }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '7',
    name: 'Pepper Barbecue Chicken',
    description: 'Pepper barbecue chicken, cheese and capsicum',
    category: 'pizza',
    basePrice: 429,
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=400&h=400&fit=crop',
    isVeg: false,
    isAvailable: true,
    sizes: [
      { name: 'small', price: 429 },
      { name: 'medium', price: 579 },
      { name: 'large', price: 779 }
    ],
    crusts: [
      { name: 'Classic Hand Tossed', price: 0 },
      { name: 'Cheese Burst', price: 99 },
      { name: 'Thin Crust', price: 0 }
    ],
    toppings: [
      { name: 'Extra Cheese', price: 59, isVeg: true },
      { name: 'Extra Chicken', price: 99, isVeg: false },
      { name: 'Capsicum', price: 39, isVeg: true }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '8',
    name: 'Non Veg Supreme',
    description: 'Supreme combination of black olives, onions, grilled mushrooms, pepper barbecue chicken, peri-peri chicken & grilled chicken rashers',
    category: 'pizza',
    basePrice: 479,
    image: 'https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?w=400&h=400&fit=crop',
    isVeg: false,
    isAvailable: true,
    sizes: [
      { name: 'small', price: 479 },
      { name: 'medium', price: 629 },
      { name: 'large', price: 829 }
    ],
    crusts: [
      { name: 'Classic Hand Tossed', price: 0 },
      { name: 'Cheese Burst', price: 99 },
      { name: 'Thin Crust', price: 0 }
    ],
    toppings: [
      { name: 'Extra Cheese', price: 59, isVeg: true },
      { name: 'Extra Chicken', price: 99, isVeg: false },
      { name: 'Black Olives', price: 49, isVeg: true }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // Beverages (8 items)
  {
    _id: '9',
    name: 'Coca Cola (750ml)',
    description: 'The chilled refreshing taste of Coca Cola',
    category: 'beverages',
    basePrice: 57,
    image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=400&fit=crop',
    isVeg: true,
    isAvailable: true,
    sizes: [],
    crusts: [],
    toppings: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '10',
    name: 'Pepsi (750ml)',
    description: 'Refresh yourself with chilled Pepsi',
    category: 'beverages',
    basePrice: 57,
    image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&h=400&fit=crop',
    isVeg: true,
    isAvailable: true,
    sizes: [],
    crusts: [],
    toppings: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '12',
    name: 'Fanta (750ml)',
    description: 'Orange flavored refreshing drink',
    category: 'beverages',
    basePrice: 57,
    image: 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=400&h=400&fit=crop',
    isVeg: true,
    isAvailable: true,
    sizes: [],
    crusts: [],
    toppings: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '13',
    name: 'Thums Up (750ml)',
    description: 'Strong fizzy refreshment with bold taste',
    category: 'beverages',
    basePrice: 57,
    image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=400&h=400&fit=crop',
    isVeg: true,
    isAvailable: true,
    sizes: [],
    crusts: [],
    toppings: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '14',
    name: 'Mountain Dew (750ml)',
    description: 'Electrifying citrus blast',
    category: 'beverages',
    basePrice: 57,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&h=400&fit=crop',
    isVeg: true,
    isAvailable: true,
    sizes: [],
    crusts: [],
    toppings: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '15',
    name: 'Mirinda (750ml)',
    description: 'Delicious orange flavored drink',
    category: 'beverages',
    basePrice: 57,
    image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=400&fit=crop',
    isVeg: true,
    isAvailable: true,
    sizes: [],
    crusts: [],
    toppings: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // Desserts (8 items)
  {
    _id: '17',
    name: 'Choco Lava Cake',
    description: 'Chocolate cake with gooey molten lava inside',
    category: 'desserts',
    basePrice: 99,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=400&fit=crop',
    isVeg: true,
    isAvailable: true,
    sizes: [],
    crusts: [],
    toppings: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '18',
    name: 'Brownie Fantasy',
    description: 'Rich chocolate brownie topped with chocolate sauce',
    category: 'desserts',
    basePrice: 119,
    image: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=400&h=400&fit=crop',
    isVeg: true,
    isAvailable: true,
    sizes: [],
    crusts: [],
    toppings: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '19',
    name: 'Red Velvet Lava Cake',
    description: 'Soft red velvet cake with creamy white chocolate lava',
    category: 'desserts',
    basePrice: 109,
    image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400&h=400&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    sizes: [],
    crusts: [],
    toppings: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '20',
    name: 'Butterscotch Mousse Cake',
    description: 'Creamy butterscotch mousse layered with cake',
    category: 'desserts',
    basePrice: 99,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop',
    isVeg: true,
    isAvailable: true,
    sizes: [],
    crusts: [],
    toppings: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '21',
    name: 'Chocolate Chip Cookie',
    description: 'Freshly baked chocolate chip cookie',
    category: 'desserts',
    basePrice: 59,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=400&fit=crop',
    isVeg: true,
    isAvailable: true,
    sizes: [],
    crusts: [],
    toppings: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '22',
    name: 'Vanilla Ice Cream Tub',
    description: 'Creamy vanilla ice cream tub',
    category: 'desserts',
    basePrice: 79,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop',
    isVeg: true,
    isAvailable: true,
    sizes: [],
    crusts: [],
    toppings: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '23',
    name: 'Chocolate Ice Cream Tub',
    description: 'Rich chocolate ice cream tub',
    category: 'desserts',
    basePrice: 79,
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=400&fit=crop',
    isVeg: true,
    isAvailable: true,
    sizes: [],
    crusts: [],
    toppings: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '24',
    name: 'Strawberry Ice Cream Tub',
    description: 'Delicious strawberry ice cream tub',
    category: 'desserts',
    basePrice: 79,
    image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&h=400&fit=crop',
    isVeg: true,
    isAvailable: true,
    sizes: [],
    crusts: [],
    toppings: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
