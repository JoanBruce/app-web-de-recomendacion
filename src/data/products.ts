import { Product, Category } from '../types';

export const categories: Category[] = [
  { id: '1', name: 'Electronics', icon: 'smartphone' },
  { id: '2', name: 'Fashion', icon: 'shirt' },
  { id: '3', name: 'Home', icon: 'home' },
  { id: '4', name: 'Sports', icon: 'dumbbell' }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: '1',
    description: 'High-quality wireless headphones with noise cancellation'
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500',
    category: '1',
    description: 'Advanced smartwatch with health tracking features'
  },
  {
    id: '3',
    name: 'Designer Denim Jacket',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=500',
    category: '2',
    description: 'Stylish denim jacket perfect for any occasion'
  },
  {
    id: '4',
    name: 'Modern Coffee Table',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=500',
    category: '3',
    description: 'Elegant coffee table with minimalist design'
  },
  {
    id: '5',
    name: 'Yoga Mat Premium',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
    category: '4',
    description: 'Professional yoga mat with extra cushioning'
  },
  {
    id: '6',
    name: 'Mechanical Keyboard',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=500',
    category: '1',
    description: 'RGB mechanical keyboard with custom switches'
  }
];