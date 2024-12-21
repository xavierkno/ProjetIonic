import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  dbPath = 'users';
  constructor(private Router: Router) {}

  loginWithEmail(email: string, password: string): Promise<void> {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Utilisateur connecté : ', user);
        this.Router.navigateByUrl('/tabs/home');
      })
      .catch((error) => {
        console.error('Erreur lors de la connexion : ', error.message);
        throw error; // Propager l'erreur pour la gérer dans le composant.
      });
  }
  

  signup(email: string, password: string, name: string): void {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // Met à jour le profil utilisateur avec le pseudo (displayName)
        updateProfile(result.user, {
          displayName: name,
        })
          .then(() => {
            console.log('Profil mis à jour avec le pseudo : ', name);
            this.Router.navigateByUrl('/tabs/home'); // Navigue vers la page d'accueil
          })
          .catch((error) => {
            console.error('Erreur lors de la mise à jour du profil : ', error);
          });
      })
      .catch((error) => {
        console.error('Erreur lors de l\'inscription : ', error.message);
      });
  }  

  signout() {
    signOut(auth).catch((error) => {});
  }
}