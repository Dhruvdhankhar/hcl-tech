'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Truck, Clock, Award, ShieldCheck, Pizza, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui';
import { Header, Footer } from '@/components/layout';

const features = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: '30 minutes or free! Hot and fresh pizza at your doorstep.',
  },
  {
    icon: Clock,
    title: 'Order Anytime',
    description: 'Order 24/7 online. We are always ready to serve you.',
  },
  {
    icon: Award,
    title: 'Quality Ingredients',
    description: 'Fresh ingredients, authentic recipes, unmatched taste.',
  },
  {
    icon: ShieldCheck,
    title: 'Safe & Hygienic',
    description: 'Contactless delivery with highest hygiene standards.',
  },
];

const categories = [
  {
    name: 'Pizza',
    image: '/images/pizza.jpg',
    href: '/menu?category=pizza',
  },
  {
    name: 'Sides & Beverages',
    image: '/images/sides.jpg',
    href: '/menu?category=sides',
  },
  {
    name: 'Desserts',
    image: '/images/desserts.jpg',
    href: '/menu?category=desserts',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-red-600 to-red-800 text-white">
          <div className="container mx-auto px-4 py-20 lg:py-28">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight">
                  Fresh Hot Pizza
                  <br />
                  <span className="text-yellow-400 animate-pulse">Delivered Fast!</span>
                </h1>
                <p className="mt-6 text-xl text-red-50 max-w-lg leading-relaxed">
                  Order your favorite pizzas online and get them delivered hot and fresh.
                  Choose from our wide variety of handcrafted pizzas.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link href="/menu">
                    <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 text-lg px-8 py-4">
                      Order Now
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="/menu">
                    <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-red-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 text-lg px-8 py-4">
                      View Menu
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="relative w-full h-96 flex items-center justify-center">
                  <div className="w-80 h-80 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse shadow-2xl flex items-center justify-center">
                    <Pizza className="w-48 h-48 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Wave decoration */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                fill="white"
              />
            </svg>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Why Choose <span className="text-red-600">PizzaHub</span>?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="text-center p-6 rounded-xl bg-white hover:bg-red-50 hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                >
                  <div className="inline-flex p-4 bg-red-100 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Explore Our Menu
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              From classic favorites to new creations, we have something for everyone.
              Choose your category and start ordering!
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => {
                const gradients = [
                  'from-red-500 to-rose-600',
                  'from-orange-500 to-amber-600',
                  'from-purple-500 to-pink-600'
                ];
                const imageUrls = [
                  'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=600&fit=crop',
                  'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=800&h=600&fit=crop',
                  'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&h=600&fit=crop'
                ];
                return (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="group relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all z-10" />
                    <Image
                      src={imageUrls[index]}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                      <span className="inline-flex items-center text-sm text-white/90 mt-2 group-hover:text-yellow-300 transition-colors">
                        View All <ArrowRight className="ml-1 w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-60 h-60 bg-yellow-400 rounded-full blur-3xl"></div>
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to Order?</h2>
            <p className="text-red-50 text-lg mb-10 max-w-2xl mx-auto">
              Choose from our delicious selection of pizzas and get them delivered hot and fresh!
            </p>
            <Link href="/menu">
              <Button size="lg" className="bg-white text-red-600 hover:bg-yellow-400 hover:text-gray-900 shadow-2xl transform hover:-translate-y-1 transition-all duration-200 text-lg px-10 py-5">
                Start Ordering
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
