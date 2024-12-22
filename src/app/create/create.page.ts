import { Component } from '@angular/core';
import { getAuth } from 'firebase/auth'; // Import pour récupérer l'utilisateur
import { FirestoreService } from '../services/firestore/firestore.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
  standalone: false
})
export class CreatePage {
  title: string = '';
  description: string = '';
  room: string = '';
  imageUrl: string = '';
  showToast: boolean = false; // Variable pour afficher le toast

  constructor(private firestoreService: FirestoreService) {}

  async createObject() {
    const auth = getAuth(); // Obtenir l'authentification Firebase
    const user = auth.currentUser; // Obtenir l'utilisateur connecté

    if (!user) {
      console.error('Utilisateur non connecté');
      return;
    }

    if (this.title && this.description && this.room && this.imageUrl) {
      const item = {
        title: this.title,
        description: this.description,
        room: this.room,
        imageUrl: this.imageUrl,
        userId: user.uid,
      };

      try {
        await this.firestoreService.addItem(item);
        console.log('Objet ajouté avec succès !');
        this.showToast = true; // Afficher le message de succès
        this.clearFields(); // Réinitialiser les champs
      } catch (error) {
        console.error('Erreur lors de l’ajout de l’objet :', error);
      }
    } else {
      console.log('Veuillez remplir tous les champs.');
    }
  }

  // Fonction pour réinitialiser les champs du formulaire
  clearFields() {
    this.title = '';
    this.description = '';
    this.room = '';
    this.imageUrl = '';
  }
}
