import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../models/auth-response';
import { User } from '../models/user';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

private readonly TOKEN_KEY = 'animal-token';
  private apiUrl = 'http://localhost:3000/rescueAnimal';

  constructor(@Inject(BROWSER_STORAGE) private storage: Storage,
              private http: HttpClient) { }

  // Save token
  private saveToken(token: string): void {
    this.storage.setItem(this.TOKEN_KEY, token);
  }

  // Get token
  public getToken(): string {
    return this.storage.getItem(this.TOKEN_KEY) || '';
  }

  // Logout
  public logout(): void {
    this.storage.removeItem(this.TOKEN_KEY);
  }

  // Check login
  public isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  // Get current user
  public getCurrentUser(): User | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const { name, email } = JSON.parse(atob(token.split('.')[1]));
      return { name, email } as User;
    } catch {
      return null;
    }
  }

  // LOGIN — directly call backend, no AnimalService
  public login(user: User, passwd: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/login`,
      { email: user.email, password: passwd }
    ).pipe(
      tap(res => {
        if (res && res.token) this.saveToken(res.token);
      })
    );
  }

  // REGISTER — directly call backend, no AnimalService
  public register(user: User, passwd: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/register`,
      { name: user.name, email: user.email, password: passwd }
    ).pipe(
      tap(res => {
        if (res && res.token) this.saveToken(res.token);
      })
    );
  }
}