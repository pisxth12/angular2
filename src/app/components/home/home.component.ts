// src/app/components/home/home.component.ts
import { Component } from '@angular/core';
import { HeroBannerComponent } from '../hero-banner/hero-banner.component';  // Add .component
import { FeaturedProductsComponent } from '../featured-products/featured-products.component';  // Add .component
import { NewsletterComponent } from '../newsletter/newsletter.component';  // Add .component

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroBannerComponent,
    FeaturedProductsComponent,
    NewsletterComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent { }