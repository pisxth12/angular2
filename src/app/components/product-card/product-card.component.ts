// src/app/components/product-card/product-card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../module/product.modale';
import { CartService } from '../../services/cart.services';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule], // Remove ProductCardComponent
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() showQuickView: boolean = true;
  @Output() quickView = new EventEmitter<Product>();

  constructor(private cartService: CartService) {}

  addToCart(event: Event) {
    event.stopPropagation();
    this.cartService.addToCart(this.product);
    
    // Show success feedback
    const button = event.target as HTMLElement;
    button.innerHTML = '✓ Added!';
    setTimeout(() => {
      button.innerHTML = 'Add to Cart';
    }, 2000);
  }

  onQuickView(event: Event) {
    event.stopPropagation();
    this.quickView.emit(this.product);
  }

  getStarsArray(): number[] {
    return Array(5).fill(0).map((_, i) => i + 1);
  }

  getStockStatus(): { text: string; class: string } {
    if (this.product.inStock) {
      return { text: 'In Stock', class: 'in-stock' };
    }
    return { text: 'Out of Stock', class: 'out-of-stock' };
  }

  getDiscountPrice(): number | null {
    // You can implement discount logic here
    // For example, if product has discount field
    return null;
  }
}