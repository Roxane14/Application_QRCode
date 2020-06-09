import { Component, OnInit } from '@angular/core';
import { FirebaseService, Histoire, Etape } from '../FirebaseService';
import { AngularFirestore } from 'angularfire2/firestore';
import { ToastController } from '@ionic/angular';
import { appService } from '../app-service';

@Component({
  selector: 'app-jouer',
  templateUrl: './jouer.page.html',
  styleUrls: ['./jouer.page.scss'],
})
export class JouerPage implements OnInit {

  firebaseService: FirebaseService = new FirebaseService(this.afs);
  public histoires_recues: Histoire[];
  _appService = appService.getInstance();  
  mesEtapes1:Etape[] =[];
  public etapeSuivante: Etape;
  public valide: Boolean = false;

  constructor(
    private afs: AngularFirestore,
    public toastController: ToastController
  ) {
    this.etapeSuivante = this._appService.getEtapeSuivante();
    if (this.etapeSuivante == null) {
      this.valide = false;
    }

    else {
      this.valide = true;}
    this.afficherHistoires();
  }

  async afficherHistoires() {
    this.histoires_recues = await this.firebaseService.lireHistoires();
  }

  async choisirHistoire(i: number) {
    let j=i+1;

    console.log("Vous avez choisi l'histoire : " + j);
    console.log(this.histoires_recues[i].titre);

    this._appService.setEtapes(this.histoires_recues[i].etapes);

    
    let toast = await this.toastController.create({
      message: 'Vous avez bien choisi l\'histoire '+j+'. Félicitations.',
      duration: 3000
    });
    toast.present();
    this.valide=true;

  }

  ngOnInit() {
  }

}
