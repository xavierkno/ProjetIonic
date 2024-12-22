import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: false,
})
export class SignupPage {
  email: string = '';
  name: string = '';
  password1: string = '';
  password2: string = '';
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
        if (error.code === 'auth/email-already-in-use') {
          this.errorMessage =
            'Cette adresse e-mail est déjà utilisée. Veuillez en essayer une autre.';
        } else {
          this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
        }
        this.showError = true;
      });
      this.email = '';
      this.name = '';
      this.password1 = '';
      this.password2 = '';
    } else {
      this.errorMessage =
        'Veuillez remplir tous les champs correctement avant de continuer.';
      this.showError = true;
    }
  }
}
