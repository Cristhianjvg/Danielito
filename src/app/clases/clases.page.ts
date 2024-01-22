import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MateriasPage } from '../materias/materias.page';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  redirectToMateria() {
    this.navCtrl.navigateForward('/materias');
  }

}
