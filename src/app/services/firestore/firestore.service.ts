import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { DocumentReference } from '@angular/fire/compat/firestore/interfaces';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private collectionName = 'lost_items';

  constructor(private firestore: AngularFirestore) {}

  // Récupérer tous les objets
  getAllItems(): Observable<any[]> {
    return this.firestore.collection(this.collectionName).valueChanges({ idField: 'id' });
  }

  // Récupérer les objets d'un utilisateur spécifique
  getUserItems(userId: string): Observable<any[]> {
    return this.firestore
      .collection(this.collectionName, (ref) => ref.where('userId', '==', userId))
      .valueChanges({ idField: 'id' }); // Inclut l'ID des documents
  }

  // Ajouter un objet
  addItem(item: any): Promise<DocumentReference<unknown>> {
    return this.firestore.collection(this.collectionName).add(item);
  }

  // Modifier un objet existant
  updateItem(id: string, item: any): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).update(item);
  }

  deleteItem(id: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }
  
}