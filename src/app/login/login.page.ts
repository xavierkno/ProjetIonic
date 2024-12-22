import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  email: string = '';
  password: string = '';

  passwordType: string = 'password';

  constructor(private Router: Router, private Auth: AuthService) {}

  onLogin() {
    if (this.email.trim() === '' || this.password.trim() === '') {
      console.error('Email et mot de passe sont requis.');
      return;
    }
  
    this.Auth.loginWithEmail(this.email, this.password)
      .then(() => {
        console.log('Connexion réussie !');
        this.Router.navigateByUrl('/tabs/home');
      })
      .catch((error) => {
        console.error('Erreur lors de la connexion : ', error.message);
      });
  }
  

  changeInputPasswordType() {
    this.passwordType = this.passwordType == 'password' ? 'text' : 'password';
  }

  login() {
    if (this.email != '' && this.password != '') {
      this.Auth.loginWithEmail(this.email, this.password);
      this.email = '';
      this.password = '';
    }
  }

  signup() {
    this.Router.navigateByUrl('signup');
  }
}