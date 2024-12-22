import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-native-feature',
  templateUrl: './native-feature.page.html',
  styleUrls: ['./native-feature.page.scss'],
})
export class NativeFeaturePage {
  photo: string | null | undefined = null;


  constructor() {}

  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera, 
      });
      this.photo = image.dataUrl;
    } catch (error) {
      console.error('Erreur lors de la prise de photo :', error);
    }
  }

  async chooseFromGallery() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
      });
      this.photo = image.dataUrl;
    } catch (error) {
      console.error('Erreur lors de la sélection de photo :', error);
    }
  }
}
