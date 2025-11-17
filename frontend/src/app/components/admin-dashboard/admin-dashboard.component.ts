import { Component } from '@angular/core';
import { Animal } from '../../models/animal.model';
import { CommonModule } from '@angular/common';
import { AnimalCardComponent } from '../animal-card/animal-card.component';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, AnimalCardComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboard {

animals: Animal[] = [
    {
      id: 1,
      name: 'Rex',
      species: 'Dog',
      gender: 'Male',
      age: 4,
      weight: '25kg',
      trainingStatus: 'Intake',
      reserved: false,
      inServiceCountry: 'USA',
      image: 'dog1.jpg'
    },
    {
      id: 2,
      name: 'Luna',
      species: 'Monkey',
      gender: 'Female',
      age: 6,
      weight: '10kg',
      trainingStatus: 'In Service',
      reserved: true,
      inServiceCountry: 'Canada',
      image: 'monkey1.jpg'
    }
  ];

}
