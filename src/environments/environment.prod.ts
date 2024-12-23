import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, indexedDBLocalPersistence } from 'firebase/auth';
import { Capacitor } from '@capacitor/core';

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCXaP0r9MHDMBPXO08mhOhRgDjSATtJC3g",
    authDomain: "back2u-faf8d.firebaseapp.com",
    databaseURL: "https://back2u-faf8d-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "back2u-faf8d",
    storageBucket: "back2u-faf8d.appspot.com",
    messagingSenderId: "376348689118",
    appId: "1:376348689118:web:c00dc36ac00b36848c384f",
    measurementId: "G-TL86S17Y1L"
  }
};

// Initialisez Firebase App
const app = initializeApp(environment.firebase);

// Exportez l'instance d'authentification pour toutes les plateformes
export const auth = Capacitor.isNativePlatform()
  ? initializeAuth(app, { persistence: indexedDBLocalPersistence })
  : getAuth(app);

// Exportez également l'application Firebase pour les autres modules si nécessaire
export const firebaseApp = app;
