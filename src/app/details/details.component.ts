import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';
import { FormControl, FormGroup , ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img class="listing-photo" [src]="housingLocation?.photo">
      <section class="listing-description">
        <h2 class="listing-heading">{{housingLocation?.name}}</h2>
        <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units Available: {{housingLocation?.availableUnits}}</li>
          <li>Does this location have WiFi? {{housingLocation?.wifi ? 'Yes' : 'No'}}</li>
          <li>Does this location have Laundry? {{housingLocation?.laundry ? 'Yes' : 'No'}}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply Now</h2>
        <button class="primary" type="button">Apply Now</button>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName">
          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName">
          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email">
          <button class="primary" type="submit">Apply Now</button>
        </form>
      </section>
    </article>
          `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService); // Assuming you have a housing service to fetch details
  housingLocation: HousingLocation | undefined;
  applyForm = new FormGroup({
    firstName : new FormControl(''),
    lastName : new FormControl(''),
    email : new FormControl(''),
  });
  constructor() {
    const housingLocationId = Number(this.route.snapshot.
      params['id']);
     this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => {
      this.housingLocation = housingLocation;
    });
  }
  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    );
  }
}
 
 