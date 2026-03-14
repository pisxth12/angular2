import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.services';
import { Product } from '../../module/product.modale';
import { ProductCardComponent } from '../product-card/product-card.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-featured-products',
  standalone: true,
  imports: [
    CommonModule,
     RouterModule, 
    ProductCardComponent
  ],
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css']
})
export class FeaturedProductsComponent implements OnInit {
  products: Product[] = [];
  loading = true;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getFeaturedProducts().subscribe(products => {
      this.products = products;
      this.loading = false;
    });
  }
}