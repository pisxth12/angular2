import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.services';
import { CartItem } from '../../module/product.modale';

@Component({
  selector: 'app-cart-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.css']
})
export class CartSidebarComponent implements OnInit {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  
  cartItems: CartItem[] = [];
  cartTotal = 0;
  cartCount = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // Subscribe to cart updates
    this.cartService.cart$.subscribe(items => {
      console.log('Cart updated:', items); // Add this to debug
      this.cartItems = items;
      this.cartTotal = this.cartService.getCartTotal();
      this.cartCount = this.cartService.getCartCount();
    });
  }

  closeSidebar() {
    this.close.emit();
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity >= 1) {
      this.cartService.updateQuantity(productId, quantity);
    }
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.cartService.clearCart();
    }
  }
}