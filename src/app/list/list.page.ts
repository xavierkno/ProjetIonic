import { Component, OnInit } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { FirestoreService } from '../services/firestore/firestore.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  items: any[] = [];
  userId: string = '';

  constructor(private firestoreService: FirestoreService,
    private alertController: AlertController,
    private toastController: ToastController ) {}

  ngOnInit() {
    const auth = getAuth(); 
    const user = auth.currentUser;

    if (user) {
      this.userId = user.uid; 
      this.firestoreService.getUserItems(this.userId).subscribe((data) => {
        this.items = data;
      });
    } else {
      console.error('Utilisateur non connecté');
    }
  }

  async editItem(item: any) {
    const alert = await this.alertController.create({
      header: 'Modifier l\'objet',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Titre',
          value: item.title,
        },
        {
          name: 'description',
          type: 'text',
          placeholder: 'Description',
          value: item.description,
        },
        {
          name: 'room',
          type: 'text',
          placeholder: 'Salle',
          value: item.room,
        },
        {
          name: 'imageUrl',
          type: 'url',
          placeholder: 'Lien de l\'image',
          value: item.imageUrl,
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            console.log('Modification annulée');
          },
        },
        {
          text: 'Sauvegarder',
          handler: (data) => {
            const updatedItem = {
              title: data.title,
              description: data.description,
              room: data.room,
              imageUrl: data.imageUrl,
            };

            this.firestoreService.updateItem(item.id, updatedItem).then(() => {
              console.log('Objet mis à jour avec succès !');
              this.presentToast('Objet mis à jour avec succès !');
            }).catch((error) => {
              console.error('Erreur lors de la mise à jour de l\'objet :', error);
              this.presentToast('Erreur lors de la mise à jour', 'danger');
            });
          },
        },
      ],
    });

    await alert.present();
  }

  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'top',
    });
    await toast.present();
  }

  async deleteItem(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Êtes-vous sûr de vouloir supprimer cet objet ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            console.log('Suppression annulée');
          },
        },
        {
          text: 'Supprimer',
          handler: async () => {
            try {
              await this.firestoreService.deleteItem(id);
              console.log('Objet supprimé avec succès');
              this.presentToast('Objet supprimé avec succès');
            } catch (error) {
              console.error('Erreur lors de la suppression :', error);
              this.presentToast('Erreur lors de la suppression', 'danger');
            }
          },
        },
      ],
      backdropDismiss: false,
    });
  
    await alert.present();
  
    await alert.onDidDismiss();
    document.body.focus();
  }  
}
