import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.services';
import { CartService } from '../../services/cart.services';
import { Product } from '../../module/product.modale';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ProductCardComponent],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  displayedProducts: Product[] = [];
  categories: string[] = [];
  
  // Filters
  selectedCategory: string = '';
  searchQuery: string = '';
  sortOption: string = 'featured';
  priceRange: { min: number; max: number } = { min: 0, max: 5000 };
  maxPrice: number = 5000;
  inStockOnly: boolean = false;
  
  // Pagination
  currentPage = 1;
  itemsPerPage = 12;
  totalPages = 1;
  loading = true;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe(products => {
      this.allProducts = products;
      this.categories = this.productService.getCategories();
      this.calculateMaxPrice();
      this.applyFilters();
      this.loading = false;
    });
  }

  calculateMaxPrice() {
    this.maxPrice = Math.max(...this.allProducts.map(p => p.price));
    this.priceRange.max = this.maxPrice;
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.currentPage = 1;
    this.applyFilters();
  }

  onSearch(event: any) {
    this.searchQuery = event.target.value.toLowerCase();
    this.currentPage = 1;
    this.applyFilters();
  }

  onSortChange(event: any) {
    this.sortOption = event.target.value;
    this.applyFilters();
  }

  onPriceRangeChange() {
    this.currentPage = 1;
    this.applyFilters();
  }

  onStockFilterChange() {
    this.currentPage = 1;
    this.applyFilters();
  }

  applyFilters() {
    // Apply all filters
    let filtered = this.allProducts.filter(product => {
      // Category filter
      const matchesCategory = !this.selectedCategory || product.category === this.selectedCategory;
      
      // Search filter
      const matchesSearch = !this.searchQuery || 
        product.name.toLowerCase().includes(this.searchQuery) ||
        product.description.toLowerCase().includes(this.searchQuery) ||
        product.category.toLowerCase().includes(this.searchQuery);
      
      // Price filter
      const matchesPrice = product.price >= this.priceRange.min && 
                          product.price <= this.priceRange.max;
      
      // Stock filter
      const matchesStock = !this.inStockOnly || product.inStock;
      
      return matchesCategory && matchesSearch && matchesPrice && matchesStock;
    });

    // Apply sorting
    filtered = this.sortProducts(filtered);

    this.filteredProducts = filtered;
    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);
    this.updateDisplayedProducts();
  }

  sortProducts(products: Product[]): Product[] {
    switch(this.sortOption) {
      case 'price-low':
        return [...products].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...products].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...products].sort((a, b) => b.rating - a.rating);
      case 'name':
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      default: // featured
        return products;
    }
  }

  updateDisplayedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.displayedProducts = this.filteredProducts.slice(startIndex, startIndex + this.itemsPerPage);
  }

  clearFilters() {
    this.selectedCategory = '';
    this.searchQuery = '';
    this.sortOption = 'featured';
    this.priceRange = { min: 0, max: this.maxPrice };
    this.inStockOnly = false;
    this.currentPage = 1;
    this.applyFilters();
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updateDisplayedProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getStartIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  getEndIndex(): number {
    const end = this.currentPage * this.itemsPerPage;
    return Math.min(end, this.filteredProducts.length);
  }

  handleQuickView(product: Product) {
    // You can implement a modal here
    console.log('Quick view:', product);
  }
}