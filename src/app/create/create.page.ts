import { Component } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { FirestoreService } from '../services/firestore/firestore.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
  standalone: false,
})
export class CreatePage {
  title: string = '';
  description: string = '';
  room: string = '';
  imageUrl: string = '';
  showToast: boolean = false;
  showErrorAlert: boolean = false;

  constructor(private firestoreService: FirestoreService) {}

  async createObject() {
    const auth = getAuth();
    const user = auth.currentUser;

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
        this.showToast = true;
        this.clearFields();
      } catch (error) {
        console.error('Erreur lors de l’ajout de l’objet :', error);
      }
    } else {
      this.showErrorAlert = true;
    }
  }

  clearFields() {
    this.title = '';
    this.description = '';
    this.room = '';
    this.imageUrl = '';
  }
}
