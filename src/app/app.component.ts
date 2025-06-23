import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
@Component({
  standalone: true,
  selector: 'app-root',
  imports : [HomeComponent],
  template: `
  <main>
    <header class = "brand-name">
    <img class = "brand-logo" src = "/assets/logo.svg"
    alt = "home_logo" >
    </header>
    <app-home></app-home>
  </main>
    `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'homes';
}
