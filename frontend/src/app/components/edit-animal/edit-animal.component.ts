import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Animal } from '../../models/animal.model';
import { AnimalService } from '../../services/animal.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-animal',
  imports: [FormsModule],
  templateUrl: './edit-animal.component.html',
  styleUrls: ['./edit-animal.component.css'],
})
export class EditAnimal {
  @Input() animal!: Animal;
  @Output() close = new EventEmitter<void>();
  @Output() updated = new EventEmitter<Animal>();

  formAnimal: Animal = {} as Animal;

  constructor(private animalService: AnimalService) {}

  ngOnInit() {
    this.formAnimal = { ...this.animal };
  }

  saveChanges() {
    this.updated.emit(this.formAnimal); // emit the updated animal directly
  }

  closeModal() {
    this.close.emit();
  }
}