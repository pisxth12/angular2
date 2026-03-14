import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';  // Add this import
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,  // Add this explicitly
  imports: [RouterOutlet, NavbarComponent, FooterComponent],  // Add imports array
  template: `
    <app-navbar></app-navbar>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styles: [`
    main {
      min-height: calc(100vh - 200px);
      padding: 20px;
    }
  `]
})
export class AppComponent {
  title = 'E-Commerce App';
}