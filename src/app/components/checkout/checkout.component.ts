import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CartItem } from '../../module/product.modale';
import { CartService} from '../../services/cart.services';
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  cartItems: CartItem[] = [];
  subtotal = 0;
  shipping = 5.99;
  tax = 0;
  total = 0;
  currentStep = 1;
  orderPlaced = false;
  orderNumber = '';

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      apartment: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      phone: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.minLength(16)]],
      cardName: ['', Validators.required],
      cardExpiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)]],
      cardCvv: ['', [Validators.required, Validators.minLength(3)]],
      sameAsShipping: [true],
      saveInfo: [false]
    });
  }

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotals();
    });

    if (this.cartItems.length === 0) {
      this.router.navigate(['/products']);
    }
  }

  calculateTotals() {
    this.subtotal = this.cartService.getCartTotal();
    this.shipping = this.subtotal > 50 ? 0 : 5.99;
    this.tax = this.subtotal * 0.08; // 8% tax
    this.total = this.subtotal + this.shipping + this.tax;
  }

  nextStep() {
    if (this.currentStep === 1 && this.isPersonalInfoValid()) {
      this.currentStep = 2;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (this.currentStep === 2 && this.isShippingValid()) {
      this.currentStep = 3;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  isPersonalInfoValid(): boolean {
    const controls = this.checkoutForm.controls;
    return !!(controls['email'].valid && 
              controls['firstName'].valid && 
              controls['lastName'].valid &&
              controls['phone'].valid);
  }

  isShippingValid(): boolean {
    const controls = this.checkoutForm.controls;
    return !!(controls['address'].valid && 
              controls['city'].valid && 
              controls['state'].valid &&
              controls['zipCode'].valid);
  }

  isPaymentValid(): boolean {
    const controls = this.checkoutForm.controls;
    return !!(controls['cardNumber'].valid && 
              controls['cardName'].valid && 
              controls['cardExpiry'].valid &&
              controls['cardCvv'].valid);
  }

  placeOrder() {
    if (this.checkoutForm.valid) {
      // Generate random order number
      this.orderNumber = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      
      // Here you would typically send the order to your backend
      const order = {
        orderNumber: this.orderNumber,
        customer: this.checkoutForm.value,
        items: this.cartItems,
        subtotal: this.subtotal,
        shipping: this.shipping,
        tax: this.tax,
        total: this.total,
        date: new Date()
      };
      
      console.log('Order placed:', order);
      
      // Clear cart and show success
      this.cartService.clearCart();
      this.orderPlaced = true;
      
      // Redirect after 5 seconds
      setTimeout(() => {
        this.router.navigate(['/products']);
      }, 5000);
    }
  }
}