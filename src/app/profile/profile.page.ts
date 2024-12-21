import { Component, OnInit } from '@angular/core';
import { getAuth, updateProfile, updatePassword } from 'firebase/auth';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any = {
    displayName: '',
  };
  editingField: string | null = null;

  constructor(private toastController: ToastController, private alertController: AlertController) {}

  ngOnInit() {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      this.user.displayName = currentUser.displayName || '';
    }
  }

  async enableEdit(field: string) {
    this.editingField = field;
  }

  async saveField(field: string) {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      this.presentToast('Utilisateur non connecté', 'danger');
      return;
    }

    if (field === 'displayName') {
      try {
        await updateProfile(currentUser, { displayName: this.user.displayName });
        this.presentToast('Pseudo mis à jour avec succès', 'success');
      } catch (error) {
        console.error('Erreur lors de la mise à jour du pseudo :', error);
        this.presentToast('Erreur lors de la mise à jour du pseudo', 'danger');
      }
    }

    this.editingField = null;
  }

  async changePassword() {
    const alert = await this.alertController.create({
      header: 'Changer le mot de passe',
      inputs: [
        {
          name: 'newPassword',
          type: 'password',
          placeholder: 'Nouveau mot de passe',
        },
        {
          name: 'confirmPassword',
          type: 'password',
          placeholder: 'Confirmer le mot de passe',
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
        },
        {
          text: 'Confirmer',
          handler: async (data) => {
            if (data.newPassword !== data.confirmPassword) {
              this.presentToast('Les mots de passe ne correspondent pas', 'danger');
              return;
            }

            const auth = getAuth();
            const currentUser = auth.currentUser;

            if (!currentUser) {
              this.presentToast('Utilisateur non connecté', 'danger');
              return;
            }

            try {
              await updatePassword(currentUser, data.newPassword);
              this.presentToast('Mot de passe mis à jour avec succès', 'success');
            } catch (error) {
              console.error('Erreur lors de la mise à jour du mot de passe :', error);
              this.presentToast('Erreur lors de la mise à jour du mot de passe', 'danger');
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async logout() {
    const auth = getAuth();
    try {
      await auth.signOut();
      this.presentToast('Déconnexion réussie', 'success');
      window.location.href = '/login';
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
      this.presentToast('Erreur lors de la déconnexion', 'danger');
    }
  }

  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top',
    });
    await toast.present();
  }
}
