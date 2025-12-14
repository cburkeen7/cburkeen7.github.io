import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit {
  public formError: string = '';
  submitted = false;

  credentials = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {}

  public onLoginSubmit(): void {
    this.formError = '';

    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'Email and password are required';
      return; // Stop execution
    }

    this.doLogin();
  }

  private doLogin(): void {
  const newUser: User = { 
    name: this.credentials.name,
    email: this.credentials.email };

  this.authenticationService.login(newUser, this.credentials.password)
    .subscribe({
      next: () => this.router.navigate(['/admin-dashboard']),
      error: (err) => {
        console.error('Login failed:', err);
        this.formError = err?.error?.message || 'Login failed, please try again';
      }
    });
}
}