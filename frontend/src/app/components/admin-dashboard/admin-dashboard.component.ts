import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Animal } from '../../models/animal.model';
import { AnimalService } from '../../services/animal.service';

import { AnimalCardComponent } from '../animal-card/animal-card.component';
import { AddAnimal } from '../add-animal/add-animal.component';
import { EditAnimal } from '../edit-animal/edit-animal.component';
import { FilterSort } from '../filter-sort/filter-sort.component';
import { DeleteAnimal } from '../delete-animal/delete-animal.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    AnimalCardComponent,
    AddAnimal,
    EditAnimal,
    FilterSort,
    DeleteAnimal
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboard implements OnInit {

  animals: Animal[] = [];            // Master list from DB
  displayedAnimals: Animal[] = [];   // Filtered/sorted list

  showAddForm = false;
  showEditForm = false;
  showDeleteModal = false;
  showFilterSortModal = false;

  selectedAnimal!: Animal;
  animalToDelete: Animal | null = null;

  constructor(private animalService: AnimalService,  private router: Router,
  private authService: AuthenticationService) {}

  ngOnInit() {
    this.loadAnimals();
  }
 
  logout(): void {
  this.authService.logout();
  this.router.navigate(['/login']);
}

  // -----------------------------
  // LOAD animals from backend
  // -----------------------------
  loadAnimals() {
    this.animalService.getAnimals().subscribe({
      next: (data) => {
        this.animals = data;
        this.displayedAnimals = [...this.animals];
      },
      error: (err) => console.error('Error loading animals:', err)
    });
  }

  // -----------------------------
  // ADD ANIMAL
  // -----------------------------
  openAddAnimal() {
    this.showAddForm = true;
  }

  addAnimalToList(createdAnimal: Animal) {
    this.animals.push(createdAnimal);
    this.displayedAnimals = [...this.animals];
    this.showAddForm = false;
  }

  // -----------------------------
  // EDIT ANIMAL
  // -----------------------------
  openEditAnimal(animal: Animal) {
    this.selectedAnimal = { ...animal };
    this.showEditForm = true;
  }

  onAnimalUpdated(updatedAnimal: Animal) {
    if (!updatedAnimal._id) {
      console.error('Cannot update animal without _id');
      return;
    }

    this.animalService.updateAnimal(updatedAnimal._id, updatedAnimal).subscribe({
      next: (savedAnimal) => {
        const index = this.animals.findIndex(a => a._id === savedAnimal._id);
        if (index !== -1) this.animals[index] = savedAnimal;

        this.displayedAnimals = [...this.animals];
        this.showEditForm = false;
        console.log('Animal updated successfully:', savedAnimal);
      },
      error: (err) => console.error('Error updating animal:', err)
    });
  }

  // -----------------------------
  // DELETE ANIMAL
  // -----------------------------
  openDeleteConfirm(animal: Animal) {
    this.animalToDelete = animal;
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.animalToDelete = null;
  }

  confirmDelete() {
    if (!this.animalToDelete?._id) return;

    this.animalService.deleteAnimal(this.animalToDelete._id).subscribe({
      next: () => {
        this.animals = this.animals.filter(a => a._id !== this.animalToDelete!._id);
        this.displayedAnimals = [...this.animals];
        this.showDeleteModal = false;
        this.animalToDelete = null;
        console.log('Animal deleted successfully');
      },
      error: (err) => console.error('Error deleting animal:', err)
    });
  }

  // -----------------------------
  // FILTER + SORT
  // -----------------------------
  openFilterSort() {
    this.showFilterSortModal = true;
  }

  applyFilterSort(event: any) {
    const { filters, sort } = event;

    let result = [...this.animals];

    // FILTER
    result = result.filter(animal => {
      return (!filters.species || animal.species === filters.species) &&
             (!filters.trainingStatus || animal.trainingStatus === filters.trainingStatus) &&
             (!filters.reserved || String(animal.reserved) === filters.reserved);
    });

    // SORT
    if (sort === 'training') result.sort((a, b) => a.trainingStatus.localeCompare(b.trainingStatus));
    if (sort === 'reserved') result.sort((a, b) => Number(a.reserved) - Number(b.reserved));
    if (sort === 'age') result.sort((a, b) => a.age - b.age);

    this.displayedAnimals = result;
  }
}