import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductList } from './components/product-list/product-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductList],
  template: `
    <app-product-list />
  `,
})
export class App {}