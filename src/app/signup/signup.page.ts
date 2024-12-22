import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  email: string = '';
  name: string = '';
  password1: string = '';
  password2: string = '';
  passwordType1: string = 'password';
  passwordType2: string = 'password'; 
  showError: boolean = false;
  errorMessage: string = '';

  constructor(private Auth: AuthService, private Router: Router) {}

  signup(): void {
    if (
      this.email.trim() !== '' &&
      this.password1 === this.password2 &&
      this.password1.length >= 6 &&
      this.name.trim() !== ''
    ) {
      this.Auth.signup(this.email, this.password1, this.name).catch((error) => {
        this.showError = true;
        this.errorMessage = error.message || 'Une erreur est survenue.';
      });
    } else {
      this.showError = true;
      this.errorMessage = 'Vérifiez les champs et réessayez.';
    }
  }

  togglePasswordVisibility1(): void {
    this.passwordType1 = this.passwordType1 === 'password' ? 'text' : 'password';
  }

  togglePasswordVisibility2(): void {
    this.passwordType2 = this.passwordType2 === 'password' ? 'text' : 'password';
  }
}
