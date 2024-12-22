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
  constructor(private router: Router) {}

  loginWithEmail(email: string, password: string): Promise<void> {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Utilisateur connecté :', userCredential.user);
        this.router.navigateByUrl('/tabs/home');
      })
      .catch((error) => {
        console.error('Erreur lors de la connexion :', error);
        throw error;
      });
  }

  signup(email: string, password: string, name: string): Promise<void> {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        return updateProfile(result.user, { displayName: name });
      })
      .then(() => {
        console.log('Profil mis à jour avec succès.');
        this.router.navigateByUrl('/tabs/home');
      })
      .catch((error) => {
        console.error('Erreur lors de l\'inscription :', error);
        throw error; 
      });
  }
  

  logout(): void {
    signOut(auth)
      .then(() => {
        console.log('Déconnexion réussie.');
        this.router.navigateByUrl('/login');
      })
      .catch((error) => {
        console.error('Erreur lors de la déconnexion :', error);
      });
  }
}
