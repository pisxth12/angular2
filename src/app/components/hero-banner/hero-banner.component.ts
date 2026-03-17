import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="position: relative; width: 100%; height: 500px; overflow: hidden;">
      <!-- Slide 1 with image -->
      <div style="position: absolute; width: 100%; height: 100%; background-image: url('https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=1200'); background-size: cover; background-position: center;">
        <div style="position: absolute; width: 100%; height: 100%; background: rgba(0,0,0,0.4);"></div>
        <div style="position: relative; height: 100%; display: flex; align-items: center; justify-content: center; text-align: center; color: white; z-index: 2;">
          <div>
            <h1 style="font-size: 48px; margin-bottom: 20px;">Summer Sale 2024</h1>
            <p style="font-size: 24px; margin-bottom: 30px;">Get up to 50% off</p>
            <a href="/products" style="background: #ff6b6b; color: white; padding: 15px 40px; text-decoration: none; border-radius: 5px; display: inline-block;">SHOP NOW</a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HeroBannerComponent { }