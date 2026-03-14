import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductService } from '../../services/product.services';
import { Product } from '../../module/product.modale';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule,
    ProductCardComponent
  ],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  loading: boolean = true;
  product: Product | null = null;
  quantity: number = 1;
  selectedTab: string = 'description';
  relatedProducts: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.loading = true;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    if (id) {
      this.loadProduct(id);
    } else {
      setTimeout(() => {
        this.product = {
          id: 1,
          name: 'Wireless Headphones',
          price: 99.99,
          rating: 4.5,
          inStock: true,
          featured: true,
          description: 'High-quality wireless headphones with noise cancellation and long battery life.',
          image: 'assets/images/headphones.jpg',
          category: 'Electronics',
          specifications: {
            'Brand': 'SoundMaster',
            'Model': 'WH-1000',
            'Color': 'Black',
            'Battery': '30 hours',
            'Weight': '250g'
          }
        };
        this.relatedProducts = [
          { id: 2, name: 'Bluetooth Speaker', price: 79.99, image: 'assets/images/speaker.jpg', rating: 4, inStock: true },
          { id: 3, name: 'Smart Watch', price: 199.99, image: 'assets/images/watch.jpg', rating: 5, inStock: true },
          { id: 4, name: 'Tablet', price: 299.99, image: 'assets/images/tablet.jpg', rating: 4, inStock: true },
          { id: 5, name: 'Phone Case', price: 19.99, image: 'assets/images/case.jpg', rating: 4, inStock: true }
        ];
        this.loading = false;
      }, 2000);
    }
  }

  getStarsArray(): number[] {
    if (!this.product) return [];
    const rating = this.product.rating || 0;
    return new Array(5).fill(0).map((_, i) => i + 1);
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity() {
    if (this.quantity < 10) {
      this.quantity++;
    }
  }

  addToCart() {
    if (this.product && this.product.inStock) {
      console.log('Added to cart:', this.product, 'Quantity:', this.quantity);
    }
  }

  buyNow() {
    if (this.product && this.product.inStock) {
      console.log('Buy now:', this.product, 'Quantity:', this.quantity);
    }
  }

  loadProduct(id: number) {
    this.productService.getProduct(id).subscribe({
      next: (product: Product | undefined) => {
        if (product) {
          this.product = product;
          if (this.productService.getProductsByCategory) {
            this.productService.getProductsByCategory(product.category).subscribe((products: Product[]) => {
              this.relatedProducts = products.filter(p => p.id !== this.product?.id).slice(0, 4);
            });
          }
        }
        this.loading = false;
      },
      error: (error: Error) => {
        console.error('Error loading product:', error);
        this.loading = false;
      }
    });
  }
}