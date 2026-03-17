import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="hero-slideshow">
      <!-- Slides -->
      <div *ngFor="let slide of slides; let i = index" 
           class="slide" 
           [class.active]="i === currentSlide"
           [style.background-image]="'url(' + slide.image + ')'">
        <div class="overlay"></div>
        <div class="slide-content">
          <h1>{{ slide.title }}</h1>
          <p>{{ slide.subtitle }}</p>
          <a href="/products" class="shop-btn">{{ slide.buttonText }}</a>
        </div>
      </div>

      <!-- Navigation Arrows -->
      <button class="arrow prev" (click)="prevSlide()">❮</button>
      <button class="arrow next" (click)="nextSlide()">❯</button>

      <!-- Dots -->
      <div class="dots">
        <span *ngFor="let slide of slides; let i = index" 
              class="dot" 
              [class.active]="i === currentSlide"
              (click)="goToSlide(i)"></span>
      </div>
    </div>
  `,
  styles: [`
    .hero-slideshow {
      position: relative;
      width: 100%;
      height: 600px;
      overflow: hidden;
    }

    .slide {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      opacity: 0;
      transition: opacity 1s ease-in-out;
      visibility: hidden;
    }

    .slide.active {
      opacity: 1;
      visibility: visible;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.4);
    }

    .slide-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      color: white;
      z-index: 2;
      width: 90%;
      max-width: 800px;
      animation: fadeInUp 1s ease;
    }

    .slide-content h1 {
      font-size: 3.5rem;
      margin-bottom: 1rem;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    }

    .slide-content p {
      font-size: 1.5rem;
      margin-bottom: 2rem;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
    }

    .shop-btn {
      display: inline-block;
      padding: 15px 40px;
      background: #ff6b6b;
      color: white;
      text-decoration: none;
      font-size: 1.2rem;
      font-weight: bold;
      border-radius: 50px;
      transition: transform 0.3s, background 0.3s;
    }

    .shop-btn:hover {
      background: #ff5252;
      transform: scale(1.05);
    }

    .arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 50px;
      height: 50px;
      background: rgba(255,255,255,0.3);
      color: white;
      border: none;
      border-radius: 50%;
      font-size: 2rem;
      cursor: pointer;
      z-index: 10;
      transition: background 0.3s;
    }

    .arrow:hover {
      background: rgba(255,255,255,0.5);
    }

    .arrow.prev {
      left: 20px;
    }

    .arrow.next {
      right: 20px;
    }

    .dots {
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 15px;
      z-index: 10;
    }

    .dot {
      width: 12px;
      height: 12px;
      background: rgba(255,255,255,0.5);
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.3s;
    }

    .dot.active {
      background: white;
      transform: scale(1.2);
    }

    .dot:hover {
      background: white;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 768px) {
      .hero-slideshow {
        height: 400px;
      }
      
      .slide-content h1 {
        font-size: 2rem;
      }
      
      .slide-content p {
        font-size: 1.1rem;
      }
      
      .shop-btn {
        padding: 12px 30px;
        font-size: 1rem;
      }
      
      .arrow {
        width: 40px;
        height: 40px;
        font-size: 1.5rem;
      }
    }
  `]
})
export class HeroBannerComponent implements OnInit, OnDestroy {
  slides = [
    {
      title: 'Summer Sale 2024',
      subtitle: 'Get up to 50% off on selected items',
      buttonText: 'Shop Now',
      image: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=1200'
    },
    {
      title: 'New Arrivals',
      subtitle: 'Check out our latest collection',
      buttonText: 'Explore',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200'
    },
    {
      title: 'Free Shipping',
      subtitle: 'On orders over $50',
      buttonText: 'Learn More',
      image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=1200'
    }
  ];

  currentSlide = 0;
  private intervalId: any;

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoSlide() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.stopAutoSlide();
    this.startAutoSlide();
  }
}