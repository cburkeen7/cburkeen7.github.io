import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-sort',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './filter-sort.component.html',
  styleUrl: './filter-sort.component.css'
})
export class FilterSort {

  @Output() close = new EventEmitter<void>();
  @Output() apply = new EventEmitter<any>();

  filters = {
    species: '',
    trainingStatus: '',
    reserved: ''
  };

  sortOption = '';

  save() {
    this.apply.emit({
      filters: this.filters,
      sort: this.sortOption
    });

    this.close.emit();
  }

  cancel() {
    this.close.emit();
  }
}