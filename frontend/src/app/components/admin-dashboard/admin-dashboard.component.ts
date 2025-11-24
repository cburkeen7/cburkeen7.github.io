import { Component } from '@angular/core';
import { Animal } from '../../models/animal.model';
import { CommonModule } from '@angular/common';
import { AnimalCardComponent } from '../animal-card/animal-card.component';
import { AddAnimal } from '../add-animal/add-animal.component';
import { EditAnimal } from '../edit-animal/edit-animal.component';
import { FilterSort } from '../filter-sort/filter-sort.component';
import { DeleteAnimal } from '../delete-animal/delete-animal.component';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, AnimalCardComponent, AddAnimal, EditAnimal, FilterSort, DeleteAnimal],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboard {
  // Master array of all animals
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

  // Displayed array for UI (filtered/sorted)
  displayedAnimals: Animal[] = [...this.animals];

  // Add Animal form logic
  showAddForm = false;
  openAddAnimal() {
    this.showAddForm = true;
  }
  addAnimalToList(newAnimal: Animal) {
    this.animals.push(newAnimal);              // add to master list
    this.displayedAnimals = [...this.animals]; // update displayed list
  }

  // Edit Animal form logic
  showEditForm = false;
  selectedAnimal!: Animal;
  openEditAnimal(animal: Animal) {
    this.selectedAnimal = { ...animal }; // clone to avoid immediate UI changes
    this.showEditForm = true;
  }
  onAnimalUpdated(updatedAnimal: Animal) {
    const index = this.animals.findIndex(a => a.id === updatedAnimal.id);
    if (index !== -1) {
      this.animals[index] = updatedAnimal;          // update master
      this.displayedAnimals = [...this.animals];    // update displayed
    }
    this.showEditForm = false;
  }

  // Delete Animal logic
  showDeleteModal = false;
  animalToDelete: any = null;
  openDeleteConfirm(animal: Animal) {
    this.animalToDelete = animal;
    this.showDeleteModal = true;
  }
  cancelDelete() {
    this.showDeleteModal = false;
    this.animalToDelete = null;
  }
  confirmDelete() {
    this.animals = this.animals.filter(a => a.id !== this.animalToDelete.id); // master
    this.displayedAnimals = [...this.animals]; // update displayed
    this.showDeleteModal = false;
    this.animalToDelete = null;
  }

  // Filter + Sort logic
  showFilterSortModal = false;
  applyFilterSort(event: any) {
    const { filters, sort } = event;

    // Start with full master array
    let result = [...this.animals];

    // FILTER
    result = result.filter(animal => {
      return (!filters.species || animal.species === filters.species) &&
             (!filters.trainingStatus || animal.trainingStatus === filters.trainingStatus) &&
             (!filters.reserved || String(animal.reserved) === filters.reserved);
    });

    // SORT
    if (sort === 'training') {
      result.sort((a, b) => a.trainingStatus.localeCompare(b.trainingStatus));
    }
    if (sort === 'reserved') {
      result.sort((a, b) => Number(a.reserved) - Number(b.reserved));
    }
    if (sort === 'age') {
      result.sort((a, b) => a.age - b.age);
    }

    // Update displayed array
    this.displayedAnimals = result;
  }
}