import { Injectable, Inject, PLATFORM_ID } from '@angular/core';  // Add Inject and PLATFORM_ID
import { isPlatformBrowser } from '@angular/common';  // Add this import
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../module/product.modale';
import { Product } from '../module/product.modale';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();
  
  private readonly STORAGE_KEY = 'shopping_cart';

  // Inject PLATFORM_ID
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadCart();
  }

  /**
   * Load cart from localStorage (only in browser)
   */
  private loadCart(): void {
    // Only access localStorage in the browser
    if (isPlatformBrowser(this.platformId)) {
      const savedCart = localStorage.getItem(this.STORAGE_KEY);
      if (savedCart) {
        try {
          this.cartItems = JSON.parse(savedCart);
          this.cartSubject.next(this.cartItems);
        } catch (error) {
          console.error('Error loading cart from localStorage:', error);
          this.cartItems = [];
        }
      }
    }
  }

  /**
   * Save cart to localStorage (only in browser)
   */
  private saveCart(): void {
    // Only access localStorage in the browser
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.cartItems));
    }
    this.cartSubject.next(this.cartItems);
  }

  // Rest of your methods remain the same...
  // (keep all the existing methods below this line)

  /**
   * Get cart items as observable
   */
  getCart(): Observable<CartItem[]> {
    return this.cart$;
  }

  /**
   * Get current cart items (synchronous)
   */
  getCurrentCart(): CartItem[] {
    return [...this.cartItems];
  }

  /**
   * Add product to cart
   */
  addToCart(product: Product, quantity: number = 1): void {
    if (!product.inStock) {
      throw new Error('Product is out of stock');
    }

    const existingItem = this.cartItems.find(item => item.product.id === product.id);
    
    if (existingItem) {
      // Check if adding more would exceed stock limit (assuming max 10 per product)
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity > 10) {
        throw new Error('Maximum quantity (10) reached for this product');
      }
      existingItem.quantity = newQuantity;
    } else {
      this.cartItems.push({ product, quantity });
    }
    
    this.saveCart();
  }

  /**
   * Update quantity of a cart item
   */
  updateQuantity(productId: number, quantity: number): void {
    if (quantity < 1) {
      this.removeFromCart(productId);
      return;
    }

    if (quantity > 10) {
      quantity = 10; // Enforce maximum
    }

    const item = this.cartItems.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      this.saveCart();
    }
  }

  /**
   * Remove item from cart
   */
  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.saveCart();
  }

  /**
   * Clear entire cart
   */
  clearCart(): void {
    this.cartItems = [];
    this.saveCart();
  }

  /**
   * Get cart total price
   */
  getCartTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + (item.product.price * item.quantity), 
      0
    );
  }

  /**
   * Get total number of items in cart
   */
  getCartCount(): number {
    return this.cartItems.reduce(
      (count, item) => count + item.quantity, 
      0
    );
  }

  /**
   * Check if product is in cart
   */
  isInCart(productId: number): boolean {
    return this.cartItems.some(item => item.product.id === productId);
  }

  /**
   * Get quantity of specific product in cart
   */
  getItemQuantity(productId: number): number {
    const item = this.cartItems.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  }

  /**
   * Get cart subtotal (without shipping/tax)
   */
  getSubtotal(): number {
    return this.getCartTotal();
  }

  /**
   * Calculate shipping cost
   */
  getShippingCost(): number {
    const subtotal = this.getSubtotal();
    return subtotal > 50 ? 0 : 5.99;
  }

  /**
   * Calculate tax (8% by default)
   */
  getTax(taxRate: number = 0.08): number {
    return this.getSubtotal() * taxRate;
  }

  /**
   * Calculate total including shipping and tax
   */
  getGrandTotal(taxRate: number = 0.08): number {
    return this.getSubtotal() + this.getShippingCost() + this.getTax(taxRate);
  }

  /**
   * Apply discount code
   */
  applyDiscount(code: string): { success: boolean; discount: number; message: string } {
    // Mock discount codes
    const discounts: { [key: string]: number } = {
      'SAVE10': 0.10,
      'SAVE20': 0.20,
      'WELCOME15': 0.15,
      'FLASH25': 0.25,
      'FREESHIP': 0
    };

    const discountPercent = discounts[code.toUpperCase()];
    
    if (discountPercent !== undefined) {
      if (code.toUpperCase() === 'FREESHIP') {
        // Free shipping special case
        return { 
          success: true, 
          discount: 0,
          message: 'Free shipping applied!'
        };
      }
      return { 
        success: true, 
        discount: discountPercent,
        message: `${discountPercent * 100}% discount applied!`
      };
    }
    
    return { 
      success: false, 
      discount: 0,
      message: 'Invalid discount code'
    };
  }

  /**
   * Merge carts (useful for user login)
   */
  mergeCart(newItems: CartItem[]): void {
    newItems.forEach(newItem => {
      const existingItem = this.cartItems.find(
        item => item.product.id === newItem.product.id
      );
      
      if (existingItem) {
        existingItem.quantity = Math.min(
          existingItem.quantity + newItem.quantity, 
          10
        );
      } else {
        this.cartItems.push(newItem);
      }
    });
    
    this.saveCart();
  }

  /**
   * Get cart summary object
   */
  getCartSummary(): {
    items: CartItem[];
    count: number;
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  } {
    const subtotal = this.getSubtotal();
    const shipping = this.getShippingCost();
    const tax = this.getTax();
    
    return {
      items: this.getCurrentCart(),
      count: this.getCartCount(),
      subtotal,
      shipping,
      tax,
      total: subtotal + shipping + tax
    };
  }

  /**
   * Check if cart has items
   */
  hasItems(): boolean {
    return this.cartItems.length > 0;
  }

  /**
   * Get item count by product ID
   */
  getItemCount(productId: number): number {
    const item = this.cartItems.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  }

  /**
   * Update multiple quantities at once
   */
  updateQuantities(updates: { productId: number; quantity: number }[]): void {
    updates.forEach(update => {
      if (update.quantity <= 0) {
        this.removeFromCart(update.productId);
      } else {
        const item = this.cartItems.find(
          item => item.product.id === update.productId
        );
        if (item) {
          item.quantity = Math.min(update.quantity, 10);
        }
      }
    });
    this.saveCart();
  }

  /**
   * Get cart weight (for shipping calculations)
   */
  getCartWeight(): number {
    // Mock weight calculation - in real app, products would have weight property
    return this.cartItems.reduce((weight, item) => {
      return weight + (item.quantity * 1.5); // Assuming 1.5kg per item average
    }, 0);
  }

  /**
   * Validate cart items (check if still in stock)
   */
  validateCart(products: Product[]): { valid: boolean; invalidItems: Product[] } {
    const invalidItems: Product[] = [];
    
    this.cartItems.forEach(item => {
      const currentProduct = products.find(p => p.id === item.product.id);
      if (!currentProduct || !currentProduct.inStock) {
        invalidItems.push(item.product);
      }
    });

    return {
      valid: invalidItems.length === 0,
      invalidItems
    };
  }

  /**
   * Remove invalid items from cart
   */
  removeInvalidItems(products: Product[]): void {
    const validation = this.validateCart(products);
    
    if (!validation.valid) {
      this.cartItems = this.cartItems.filter(item => 
        !validation.invalidItems.some(invalid => invalid.id === item.product.id)
      );
      this.saveCart();
    }
  }

  /**
   * Format cart for order placement
   */
  prepareOrder(): {
    items: Array<{
      productId: number;
      name: string;
      price: number;
      quantity: number;
      subtotal: number;
    }>;
    summary: {
      subtotal: number;
      shipping: number;
      tax: number;
      total: number;
    };
  } {
    const items = this.cartItems.map(item => ({
      productId: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      subtotal: item.product.price * item.quantity
    }));

    const subtotal = this.getSubtotal();
    const shipping = this.getShippingCost();
    const tax = this.getTax();

    return {
      items,
      summary: {
        subtotal,
        shipping,
        tax,
        total: subtotal + shipping + tax
      }
    };
  }

  /**
   * Get estimated delivery date
   */
  getEstimatedDelivery(): Date {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5); // 5 business days
    return deliveryDate;
  }
}