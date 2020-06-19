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
  public attente:boolean;
  public champsRemplis:boolean = true;

  ajouterEtape() {
    if (this.listeEtapes.length == 0) {
      this.etapesExistent = true;
    }

    this.etapeTest = new Etape();
    this.listeEtapes.push(this.etapeTest);
  }

  async createHistoire() {
    this.champsRemplis=true;
    this.nombreEtapes = this.listeEtapes.length;
    for(let i=0;i<this.nombreEtapes;i++){
      if((this.listeEtapes[i].lieu==null)||(this.listeEtapes[i].nom==null)){
        this.champsRemplis=false;
      }
    }

    if(this.champsRemplis){
      this.attente=true;

      await this.firebaseService.nouvelleHistoire(this.titreHistoire.toString(), this.nombreEtapes, this.listeEtapes)
        .then(async res => {
          let toast = await this.toastController.create({
            message: 'Vous avez bien créé votre histoire. Félicitations.',
            duration: 3000
          });
          toast.present();
          this.resetFields();
          this.attente=false;
        }, err => {
          console.log(err)
        })
      
    }
    
    
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
    this.attente = false;
  }

  ngOnInit() {
  }

}
