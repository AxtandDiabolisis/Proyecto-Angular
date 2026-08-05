import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartWidgetComponent } from './cart-widget/cart-widget.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CartWidgetComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
