import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Animal } from '../models/animal.model';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private apiUrl = 'http://localhost:3000/rescueAnimal';

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  // Attach JWT
  private authHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });
  } 

  getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.apiUrl);
  }

  addAnimal(animal: Omit<Animal, '_id'>): Observable<Animal> {
    return this.http.post<Animal>(
      this.apiUrl,
      animal,
     { headers: this.authHeaders() }
    );
  }

  updateAnimal(id: string, animal: Animal): Observable<Animal> {
    return this.http.put<Animal>(
      `${this.apiUrl}/${id}`,
      animal,
     { headers: this.authHeaders() }
    );
  }

  deleteAnimal(id: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${id}`,
      { headers: this.authHeaders() }
    );
  }

 // AUTHENTICATION METHODS
  login(user: User, passwd: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/login`,
      { email: user.email, password: passwd }
    );
  }

  register(user: User, passwd: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/register`,
      { name: user.name, email: user.email, password: passwd }
    );
  }
}