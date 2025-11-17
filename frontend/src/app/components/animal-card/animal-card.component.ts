import { Component, Input } from '@angular/core';
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
}
