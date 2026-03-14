import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-hero-banner',
   imports: [CommonModule, RouterModule], 
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.css']
})
export class HeroBannerComponent {
  slides = [
    {
      title: 'Summer Sale 2024',
      subtitle: 'Get up to 50% off on selected items',
      cta: 'Shop Now',
      image: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=1200',
      active: true
    },
    {
      title: 'New Arrivals',
      subtitle: 'Check out our latest collection',
      cta: 'Explore',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200',
      active: false
    },
    {
      title: 'Free Shipping',
      subtitle: 'On orders over $50',
      cta: 'Learn More',
      image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=1200',
      active: false
    }
  ];

  currentSlide = 0;

  constructor() {
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide() {
    this.slides[this.currentSlide].active = false;
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.slides[this.currentSlide].active = true;
  }

  prevSlide() {
    this.slides[this.currentSlide].active = false;
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.slides[this.currentSlide].active = true;
  }

  goToSlide(index: number) {
    this.slides[this.currentSlide].active = false;
    this.currentSlide = index;
    this.slides[this.currentSlide].active = true;
  }
}