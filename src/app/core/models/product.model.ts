export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockQuantity: number;
  image: string;
  discountPercentage: number;
  tags: string[];
}