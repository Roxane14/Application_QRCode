import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import { FirebaseService, Etape } from '../FirebaseService';

import { ToastController } from '@ionic/angular';
import { stringify } from 'querystring';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.page.html',
  styleUrls: ['./creation.page.scss'],
})
export class CreationPage implements OnInit {

  public titreHistoire: string;
  public nombreEtapes: number;
  firebaseService: FirebaseService = new FirebaseService(this.afs);
  public listeEtapes: Etape[] = [];
  public etape1: boolean;
  public etape2: boolean;
  public etape3: boolean;
  public etapeTest: Etape;

  termine1(){
    for(let i = 1;i<=this.nombreEtapes;i++){
      this.etapeTest = new Etape();
      this.etapeTest.lieu = "test";
      this.etapeTest.nom = "testNom";
      this.listeEtapes.push(this.etapeTest);
    }
    this.etape1=false;
    this.etape2=true;
  }

  arrayOne(): any[] {
    return Array(this.nombreEtapes);
  }


  createHistoire() {
    this.firebaseService.nouvelleHistoire(this.titreHistoire, this.nombreEtapes, this.listeEtapes)
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

  resetFields() {
    this.titreHistoire = "";
    this.nombreEtapes = null;
  }

  constructor(
    private afs: AngularFirestore,
    public toastController: ToastController
  ) {
    this.etape1 = true;
    this.etape2 = false;
    this.etape3 = false;

  }

  ngOnInit() {
  }

}
