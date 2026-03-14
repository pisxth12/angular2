
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';  // Add .component
import { ProductPageComponent } from './components/product-page/product-page.component';  // Add .component
import { ProductDetailComponent } from './components/product-detail/product-detail.component';  // Add .component
import { CheckoutComponent } from './components/checkout/checkout.component';  // Add .component
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductPageComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'checkout', component: CheckoutComponent },
   { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' }
];