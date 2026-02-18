import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input({ required: true }) product!: Product;

  activeIndex = 0;

  ngOnChanges() {
    this.activeIndex = 0;
  }

  get activeImage(): string {
    return this.product.images?.[this.activeIndex] ?? this.product.image;
  }

  selectImage(index: number) {
    this.activeIndex = index;
  }

  prev() {
    const n = this.product.images?.length ?? 0;
    if(n === 0) return;
    this.activeIndex = (this.activeIndex - 1 + n) % n;
  }

  next() {
    const n = this.product.images?.length ?? 0;
    if(n == 0) return;
    this.activeIndex = (this.activeIndex + 1) % n;
  }

  get fullStars(): number {
    return Math.floor(this.product.rating);
  }

  get hasHalfStars(): boolean {
    return this.product.rating - this.fullStars >= 0.5;
  }

  shareToWhatsApp() {
    const msg = `Check out this product: ${this.product.link}`;
    const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  }

  shareToTelegram() {
    const url = `https://t.me/share/url?url=${encodeURIComponent(this.product.link)}&text=${encodeURIComponent(this.product.name)}`;
    window.open(url, '_blank');
  }
}
