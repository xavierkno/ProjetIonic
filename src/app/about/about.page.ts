import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: false
})
export class AboutPage implements OnInit {

  appInfo = {
    name: 'Back2U',
    version: '1.0.0',
    description:
      'Back2U est une application mobile conçue pour aider les étudiants de l’Université de Lorraine à retrouver leurs objets perdus dans les salles de cours. Avec des fonctionnalités simples de création, de modification et de consultation des objets perdus, cette application facilite la gestion des objets oubliés.',
    concepteur:
      'KNOFFEL Xavier',
    features: [
      'Ajoutez vos objets perdus avec une description détaillée.',
      'Consultez la liste des objets perdus signalés par d’autres étudiants.',
      'Modifiez ou supprimez vos objets perdus à tout moment.',
      'Interface conviviale et facile à utiliser.',
      'Basé sur Firebase pour un accès sécurisé et rapide.',
    ],
    contact: {
      email: 'support@back2u.com',
      phone: '+33 6 12 34 56 78',
    },
  };

  constructor() { }

  ngOnInit() {
  }

}
