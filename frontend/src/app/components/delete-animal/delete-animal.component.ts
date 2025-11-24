import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-animal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-animal.component.html',
  styleUrl: './delete-animal.component.css',
})
export class DeleteAnimal {

  @Input() animal: any = null;

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
