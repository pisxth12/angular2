export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
  inStock: boolean;
  featured: boolean;
  specifications?: { [key: string]: string };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: number;
  items: CartItem[];
  total: number;
  customerInfo: CustomerInfo;
  date: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
}