import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Animal } from '../../models/animal.model';

@Component({
  selector: 'app-animal-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.css'],
})
export class AnimalCardComponent {
  @Input() animal!: Animal;
  @Output() edit = new EventEmitter<Animal>();
  @Output() delete = new EventEmitter<Animal>(); 

onDeleteClick() {
  this.delete.emit(this.animal);
}
  onEditClick() {
    this.edit.emit(this.animal);
  }
}
