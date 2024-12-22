import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  email: string = '';
  password: string = '';
  passwordType: string = 'password';

  showEmailError: boolean = false;
  showPasswordError: boolean = false;
  showLoginError: boolean = false;
  loginErrorMessage: string = '';

  constructor(private router: Router, private auth: AuthService) {}

  onLogin() {
    this.showEmailError = false;
    this.showPasswordError = false;

    if (this.email.trim() === '') {
      this.showEmailError = true;
    }
    if (this.password.trim() === '') {
      this.showPasswordError = true;
    }

    if (this.showEmailError || this.showPasswordError) {
      return;
    }

    this.auth
      .loginWithEmail(this.email, this.password)
      .then(() => {
        console.log('Connexion réussie !');
        this.router.navigateByUrl('/tabs/home');
      })
      .catch(() => {
        this.showLoginError = true;
        this.loginErrorMessage = "Identifiant ou mot de passe incorrect.";
      });
  }

  changeInputPasswordType() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }
}
