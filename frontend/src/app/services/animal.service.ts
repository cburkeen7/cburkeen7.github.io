import { Injectable } from '@angular/core';
import { Animal } from '../models/animal.model';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  constructor() {}

  // No HTTP needed since we are using a local array
}