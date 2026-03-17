import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../module/product.modale';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
  
    {
      id: 1,
      name: 'Sony WH-1000XM4 Wireless Headphones',
      price: 349.99,
      description:
        'Industry-leading noise cancellation with exceptional sound quality. 30-hour battery life with quick charging.',
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      rating: 4.8,
      inStock: true,
      featured: true,
      specifications: {
        'Battery Life': '30 hours',
        Connectivity: 'Bluetooth 5.0',
        'Noise Cancellation': 'Yes',
        Weight: '254g',
      },
    },
    {
      id: 2,
      name: 'Apple MacBook Pro 14-inch',
      price: 1999.99,
      description:
        'M3 Pro chip, 14-core GPU, 18GB unified memory, 512GB SSD storage. Perfect for professionals.',
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
      rating: 4.9,
      inStock: true,
      featured: true,
      specifications: {
        Processor: 'M3 Pro',
        RAM: '18GB',
        Storage: '512GB SSD',
        Display: '14-inch Liquid Retina',
      },
    },
    {
      id: 3,
      name: 'Samsung 65-inch QLED 4K TV',
      price: 1499.99,
      description:
        'Quantum Dot technology, 100% color volume with direct full array, ultra viewing angle.',
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500',
      rating: 4.7,
      inStock: true,
      featured: false,
    },
    {
      id: 4,
      name: 'iPad Pro 12.9-inch',
      price: 1099.99,
      description: 'M2 chip, Liquid Retina XDR display, 12MP Wide camera, 5G capable, Wi-Fi 6E.',
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
      rating: 4.8,
      inStock: true,
      featured: true,
    },
    {
      id: 5,
      name: 'Canon EOS R6 Mirrorless Camera',
      price: 2499.99,
      description:
        '20.1 MP Full-frame CMOS sensor, 4K video, Dual Pixel CMOS AF II, 12 fps mechanical shutter.',
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500',
      rating: 4.7,
      inStock: true,
      featured: false,
    },
    {
      id: 6,
      name: 'Apple Watch Series 9',
      price: 399.99,
      description:
        'Always-On Retina display, S9 SiP, double tap gesture, blood oxygen app, ECG app.',
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500',
      rating: 4.8,
      inStock: true,
      featured: true,
    },
    {
      id: 7,
      name: 'Bose SoundLink Revolve+',
      price: 299.99,
      description: '360-degree portable Bluetooth speaker with deep, loud and immersive sound.',
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
      rating: 4.6,
      inStock: true,
      featured: false,
    },
    {
      id: 8,
      name: 'Nintendo Switch OLED',
      price: 349.99,
      description: 'Vibrant 7-inch OLED screen, wide adjustable stand, dock with wired LAN port.',
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500',
      rating: 4.9,
      inStock: true,
      featured: false,
    },
    {
      id: 9,
      name: 'Kindle Paperwhite',
      price: 139.99,
      description: '6.8" display, 300 ppi, waterproof, 8 GB storage, adjustable warm light.',
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1544716278-e513176f20b5?w=500',
      rating: 4.7,
      inStock: true,
      featured: false,
    },
    {
      id: 10,
      name: 'DJI Mini 3 Pro Drone',
      price: 759.99,
      description: '4K HDR video, 48MP photos, obstacle avoidance, 34-min flight time, under 249g.',
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500',
      rating: 4.8,
      inStock: true,
      featured: true,
    },

    // Fashion (10 products)
    {
      id: 11,
      name: "Men's Classic Leather Jacket",
      price: 199.99,
      description: 'Genuine leather jacket with quilted lining, multiple pockets, and YKK zippers.',
      category: 'Fashion',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
      rating: 4.6,
      inStock: true,
      featured: true,
    },
    {
      id: 12,
      name: "Women's Cashmere Sweater",
      price: 89.99,
      description: '100% cashmere, classic fit, ribbed cuffs and hem, available in 5 colors.',
      category: 'Fashion',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500',
      rating: 4.7,
      inStock: true,
      featured: true,
    },
    {
      id: 13,
      name: 'Designer Sunglasses',
      price: 159.99,
      description: 'Polarized lenses, UV400 protection, lightweight titanium frame.',
      category: 'Fashion',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500',
      rating: 4.5,
      inStock: true,
      featured: false,
    },
    {
      id: 14,
      name: 'Premium Denim Jeans',
      price: 79.99,
      description: 'Slim fit, stretch denim, five-pocket styling, authentic wash.',
      category: 'Fashion',
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
      rating: 4.4,
      inStock: true,
      featured: false,
    },
    {
      id: 15,
      name: 'Leather Weekend Bag',
      price: 249.99,
      description: 'Full-grain leather, brass hardware, removable shoulder strap, fits 3-4 days.',
      category: 'Fashion',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
      rating: 4.8,
      inStock: true,
      featured: true,
    },
    {
      id: 16,
      name: 'Silk Evening Dress',
      price: 299.99,
      description: '100% silk, floor-length, V-neck, side slit, made in Italy.',
      category: 'Fashion',
      image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500',
      rating: 4.9,
      inStock: true,
      featured: false,
    },
    {
      id: 17,
      name: "Men's Running Shoes",
      price: 129.99,
      description: 'Lightweight mesh upper, responsive foam midsole, durable rubber outsole.',
      category: 'Fashion',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      rating: 4.6,
      inStock: true,
      featured: true,
    },
    {
      id: 18,
      name: "Women's Handbag",
      price: 179.99,
      description: 'Genuine leather, gold-tone hardware, adjustable strap, multiple compartments.',
      category: 'Fashion',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500',
      rating: 4.7,
      inStock: true,
      featured: false,
    },
    {
      id: 19,
      name: 'Cashmere Scarf',
      price: 59.99,
      description: 'Luxuriously soft, hand-rolled edges, 12 colors available, made in Scotland.',
      category: 'Fashion',
      image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=500',
      rating: 4.5,
      inStock: true,
      featured: false,
    },
    {
      id: 20,
      name: 'Leather Belt',
      price: 49.99,
      description: 'Full-grain leather, solid brass buckle, hand-finished edges, made in USA.',
      category: 'Fashion',
      image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=500',
      rating: 4.4,
      inStock: true,
      featured: false,
    },

    // Home & Living (10 products)
    {
      id: 21,
      name: 'Scandinavian Sofa',
      price: 899.99,
      description: 'Modern design, solid wood frame, high-density foam cushions, removable covers.',
      category: 'Home & Living',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500',
      rating: 4.7,
      inStock: true,
      featured: true,
    },
    {
      id: 22,
      name: 'Dining Table Set',
      price: 599.99,
      description: 'Solid oak table with 6 chairs, extendable design, mid-century modern style.',
      category: 'Home & Living',
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=500',
      rating: 4.6,
      inStock: true,
      featured: true,
    },
    {
      id: 23,
      name: 'Egyptian Cotton Sheets',
      price: 149.99,
      description: '1000 thread count, 100% Egyptian cotton, deep pockets, wrinkle-resistant.',
      category: 'Home & Living',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500',
      rating: 4.8,
      inStock: true,
      featured: false,
    },
    {
      id: 24,
      name: 'Cast Iron Cookware Set',
      price: 199.99,
      description: '5-piece set including skillet, Dutch oven, and griddle, pre-seasoned.',
      category: 'Home & Living',
      image:
        'https://images.unsplash.com/photo-1658524202348-8bdff4d4a194?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4.7,
      inStock: true,
      featured: true,
    },
    {
      id: 25,
      name: 'Smart LED Bulbs (4-pack)',
      price: 49.99,
      description: 'WiFi enabled, 16 million colors, voice control, schedules and routines.',
      category: 'Home & Living',
      image:
        'https://images.unsplash.com/photo-1583341655470-c039d25ce01e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U21hcnQlMjBMRUQlMjBCdWxicyUyMCg0LXBhY2spfGVufDB8fDB8fHww',
      rating: 4.5,
      inStock: true,
      featured: false,
    },
    {
      id: 26,
      name: 'Bath Towel Set',
      price: 79.99,
      description: '6-piece set, 100% Turkish cotton, ultra-absorbent, quick-dry technology.',
      category: 'Home & Living',
      image:
        'https://media.istockphoto.com/id/1294029211/photo/various-household-items-such-as-pillows-and-quilts-standing-in-the-white-cupboard.webp?a=1&b=1&s=612x612&w=0&k=20&c=M3foavhKM6odlsAaG4y_lJhBdye0KBwEQbwJ-5-VMUo=',
      rating: 4.6,
      inStock: true,
      featured: false,
    },
    {
      id: 27,
      name: 'Air Purifier',
      price: 249.99,
      description:
        'HEPA filter, covers 500 sq ft, smart sensor, quiet operation, energy star rated.',
      category: 'Home & Living',
      image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500',
      rating: 4.7,
      inStock: true,
      featured: true,
    },
    {
      id: 28,
      name: 'Coffee Table',
      price: 299.99,
      description: 'Industrial design, solid wood top, metal frame, storage shelf below.',
      category: 'Home & Living',
      image:
        'https://images.unsplash.com/photo-1542372147193-a7aca54189cd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q29mZmVlJTIwVGFibGV8ZW58MHx8MHx8fDA%3D',
      rating: 4.5,
      inStock: true,
      featured: false,
    },
    {
      id: 29,
      name: 'Floor Lamp',
      price: 89.99,
      description: 'Arc design, marble base, adjustable height, dimmable LED bulb included.',
      category: 'Home & Living',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
      rating: 4.4,
      inStock: true,
      featured: false,
    },
    {
      id: 30,
      name: 'Wall Art Set',
      price: 129.99,
      description: '3-piece canvas set, abstract design, gallery wrapped, ready to hang.',
      category: 'Home & Living',
      image:
        'https://plus.unsplash.com/premium_photo-1681022527744-c5493349b064?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8V2FsbCUyMEFydCUyMFNldHxlbnwwfHwwfHx8MA%3D%3D',
      rating: 4.6,
      inStock: true,
      featured: false,
    },

    // Sports & Outdoors (10 products)
    {
      id: 31,
      name: 'Mountain Bike',
      price: 899.99,
      description: 'Full suspension, 27.5" wheels, 21-speed Shimano gears, disc brakes.',
      category: 'Sports & Outdoors',
      image:
        'https://images.unsplash.com/photo-1673121414328-52eff37bc6d0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8TW91bnRhaW4lMjBCaWtlfGVufDB8fDB8fHww',
      rating: 4.7,
      inStock: true,
      featured: true,
    },
    {
      id: 32,
      name: 'Yoga Mat Premium',
      price: 49.99,
      description: 'Eco-friendly TPE, 6mm thickness, non-slip, with carrying strap.',
      category: 'Sports & Outdoors',
      image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
      rating: 4.8,
      inStock: true,
      featured: true,
    },
    {
      id: 33,
      name: 'Camping Tent 4-Person',
      price: 199.99,
      description: 'Waterproof, easy setup, ventilated, includes rainfly and carrying bag.',
      category: 'Sports & Outdoors',
      image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500',
      rating: 4.6,
      inStock: true,
      featured: false,
    },
    {
      id: 34,
      name: 'Adjustable Dumbbells Set',
      price: 299.99,
      description: 'Quick-change system, 5-50 lbs per dumbbell, space-saving storage tray.',
      category: 'Sports & Outdoors',
      image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500',
      rating: 4.7,
      inStock: true,
      featured: true,
    },
    {
      id: 35,
      name: 'Fishing Rod Combo',
      price: 79.99,
      description: '6\'6" medium action rod, spinning reel, includes tackle box and lures.',
      category: 'Sports & Outdoors',
      image: 'https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?w=500',
      rating: 4.5,
      inStock: true,
      featured: false,
    },
    {
      id: 36,
      name: 'Soccer Ball',
      price: 29.99,
      description: 'FIFA quality pro, machine-stitched, butyl bladder, size 5.',
      category: 'Sports & Outdoors',
      image:
        'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8U29jY2VyJTIwQmFsbHxlbnwwfHwwfHx8MA%3D%3D',
      rating: 4.4,
      inStock: true,
      featured: false,
    },
    {
      id: 37,
      name: 'Tennis Racket',
      price: 149.99,
      description: 'Graphite construction, 16x19 string pattern, vibration dampening system.',
      category: 'Sports & Outdoors',
      image:
        'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VGVubmlzJTIwUmFja2V0fGVufDB8fDB8fHww',
      rating: 4.6,
      inStock: true,
      featured: true,
    },
    {
      id: 38,
      name: 'Hiking Backpack 50L',
      price: 89.99,
      description:
        'Water-resistant, adjustable suspension, hydration compatible, multiple compartments.',
      category: 'Sports & Outdoors',
      image:
        'https://images.unsplash.com/photo-1575844264771-892081089af5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aGlraW5nJTIwYmFja3BhY2slMjA1MGx8ZW58MHx8MHx8fDA%3D',
      rating: 4.7,
      inStock: true,
      featured: false,
    },
    {
      id: 39,
      name: 'Yoga Block & Strap Set',
      price: 24.99,
      description:
        '2 cork blocks and 8ft cotton strap, perfect for alignment and deepening stretches.',
      category: 'Sports & Outdoors',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500',
      rating: 4.5,
      inStock: true,
      featured: false,
    },
    {
      id: 40,
      name: 'Jump Rope',
      price: 19.99,
      description: 'Speed cable, ball bearing rotation, adjustable length, foam handles.',
      category: 'Sports & Outdoors',
      image: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=500',
      rating: 4.4,
      inStock: true,
      featured: false,
    },

    // Beauty & Personal Care (10 products)
    {
      id: 41,
      name: 'Hair Dryer Professional',
      price: 149.99,
      description:
        'Ionic technology, 1875W, multiple heat/speed settings, includes concentrator nozzle.',
      category: 'Beauty',
      image:
        'https://media.istockphoto.com/id/2201920291/photo/woman-styling-long-wavy-hair-with-a-professional-hairdryer.webp?a=1&b=1&s=612x612&w=0&k=20&c=3sEStNMvn7guP5wmXXQ_15U6qKL8ZJm3Z0dVvh328PE=',
      rating: 4.7,
      inStock: true,
      featured: true,
    },
    {
      id: 42,
      name: 'Electric Toothbrush',
      price: 79.99,
      description: 'Sonic technology, pressure sensor, 3 brushing modes, timer with quadpacer.',
      category: 'Beauty',
      image:
        'https://images.unsplash.com/photo-1612181819081-950d35f4d826?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RWxlY3RyaWMlMjBUb290aGJydXNofGVufDB8fDB8fHww',
      rating: 4.6,
      inStock: true,
      featured: true,
    },
    {
      id: 43,
      name: 'Facial Cleansing Brush',
      price: 39.99,
      description: 'Waterproof, 2 speed settings, sensitive brush head, USB rechargeable.',
      category: 'Beauty',
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500',
      rating: 4.5,
      inStock: true,
      featured: false,
    },
    {
      id: 44,
      name: 'Hair Straightener',
      price: 89.99,
      description: 'Titanium plates, adjustable temperature up to 450°F, auto shut-off.',
      category: 'Beauty',
      image:
        'https://images.unsplash.com/photo-1620331307581-1e7d27da7ab6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SGFpciUyMFN0cmFpZ2h0ZW5lcnxlbnwwfHwwfHx8MA%3D%3D',
      rating: 4.6,
      inStock: true,
      featured: true,
    },
    {
      id: 45,
      name: 'Skincare Gift Set',
      price: 59.99,
      description: '5-piece set including cleanser, toner, serum, moisturizer, and eye cream.',
      category: 'Beauty',
      image: 'https://images.unsplash.com/photo-1556229010-aa3f7ff66b24?w=500',
      rating: 4.8,
      inStock: true,
      featured: false,
    },
  ];

  constructor() {}

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getFeaturedProducts(): Observable<Product[]> {
    const featured = this.products.filter((p) => p.featured);
    return of(featured);
  }

  getProduct(id: number): Observable<Product | undefined> {
    const product = this.products.find((p) => p.id === id);
    return of(product);
  }

  getCategories(): string[] {
    return [...new Set(this.products.map((p) => p.category))];
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    const filtered = this.products.filter((p) => p.category === category);
    return of(filtered);
  }

  searchProducts(query: string): Observable<Product[]> {
    const lowercaseQuery = query.toLowerCase();
    const results = this.products.filter(
      (p) =>
        p.name.toLowerCase().includes(lowercaseQuery) ||
        p.description.toLowerCase().includes(lowercaseQuery) ||
        p.category.toLowerCase().includes(lowercaseQuery),
    );
    return of(results);
  }

  getRelatedProducts(category: string, currentProductId: number): Observable<Product[]> {
    const related = this.products
      .filter((p) => p.category === category && p.id !== currentProductId)
      .slice(0, 4);
    return of(related);
  }
}
