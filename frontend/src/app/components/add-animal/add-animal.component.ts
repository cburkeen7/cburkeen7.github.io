import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-animal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-animal.component.html',
  styleUrl:'./add-animal.component.css'
})
export class AddAnimal{

  @Output() close = new EventEmitter<void>();
  @Output() addAnimal = new EventEmitter<any>();

  animal = {
    name: '',
    species: '',
    gender: '',
    age: null,
    trainingStatus: '',

    reserved: false,
    inServiceCountry: '',
    image: ''
  };

  selectedImageFile: File | null = null;

  onImageSelected(event: any) {
    this.selectedImageFile = event.target.files[0];
    this.animal.image = this.selectedImageFile?.name ?? '';
  }

  submitForm() {
    this.addAnimal.emit(this.animal);
    this.close.emit();
  }

  closeForm() {
    this.close.emit();
  }
}