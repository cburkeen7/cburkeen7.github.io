import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Animal } from '../../models/animal.model';
import { AnimalService } from '../../services/animal.service';

@Component({
  selector: 'app-add-animal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.css']
})
export class AddAnimal {
  @Output() cancel = new EventEmitter<void>();
  @Output() add = new EventEmitter<Animal>();

  newAnimal: Omit<Animal, '_id'> = {
    name: '',
    species: '',
    gender: '',
    age: 0,
    weight: '',
    trainingStatus: '',
    reserved: false,
    inServiceCountry: '',
    image: ''
  };

  constructor(private animalService: AnimalService) {}

  saveAnimal() {
    // Call backend to save the new animal
    this.animalService.addAnimal(this.newAnimal).subscribe({
      next: (createdAnimal) => {
        // Emit the saved animal with _id
        this.add.emit(createdAnimal);
        // Reset form
        this.newAnimal = {
          name: '',
          species: '',
          gender: '',
          age: 0,
          weight: '',
          trainingStatus: '',
          reserved: false,
          inServiceCountry: '',
          image: ''
        };
      },
      error: (err) => {
        console.error('Error adding animal:', err);
      }
    });
  }

  closeForm() {
    this.cancel.emit();
  }
}