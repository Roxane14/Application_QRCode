import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import { FirebaseService, Etape, Histoire } from '../FirebaseService';

import { ToastController } from '@ionic/angular';
import { stringify } from 'querystring';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.page.html',
  styleUrls: ['./creation.page.scss'],
})
export class CreationPage implements OnInit {

  public titreHistoire: string;
  public nombreEtapes: number = 0;
  firebaseService: FirebaseService = new FirebaseService(this.afs);
  public listeEtapes: Etape[] = [];
  public etapesExistent: boolean;
  public etapeTest: Etape;
  public nomEtape: string;
  public lieuEtape: string;

  public histoires_recues : Histoire[];
  public titre1:string = "";




  ajouterEtape() {
    if(this.listeEtapes.length==0){
      this.etapesExistent = true;
    }

    this.etapeTest = new Etape();
    this.listeEtapes.push(this.etapeTest);
  }

  validerEtape(i:number) {
    this.listeEtapes[i].lieu=this.lieuEtape;
    this.listeEtapes[i].nom=this.nomEtape;
    this.nombreEtapes++;
  }


  async createHistoire() {

    let i = this.listeEtapes.length;
    this.listeEtapes[i-1].lieu=this.lieuEtape;
    this.listeEtapes[i-1].nom=this.nomEtape;

    await this.firebaseService.nouvelleHistoire(this.titreHistoire.toString(), this.nombreEtapes, this.listeEtapes)
      .then(async res => {
        let toast = await this.toastController.create({
          message: 'Vous avez bien créé votre histoire. Félicitations.',
          duration: 3000
        });
        toast.present();
        this.resetFields();
      }, err => {
        console.log(err)
      })
  }

  async afficherHistoires(){
    this.histoires_recues = await this.firebaseService.lireHistoires();
    this.titre1 = this.histoires_recues[0].titre;
  }

  resetFields() {
    this.titreHistoire = "";
    this.nombreEtapes = 0;
    this.listeEtapes = [];
    this.etapesExistent = false;
  }

  constructor(
    private afs: AngularFirestore,
    public toastController: ToastController
  ) {
    this.etapesExistent = false;

  }

  ngOnInit() {
  }

}
