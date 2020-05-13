import { Component } from '@angular/core';

import { appService } from '../app-service';

import { AngularFirestore } from 'angularfire2/firestore';
import { FirebaseService } from '../FirebaseService';

import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers:[appService]
})
export class HomePage {

  value:string="";

  tableauIndices:string[];

  _appService = appService.getInstance();  

  public textToCode: string;
  firebaseService: FirebaseService = new FirebaseService(this.afs);

  constructor(
    private afs:AngularFirestore, 
    public toastController: ToastController
  ) {
    this._appService.setApp("bonjour");
    this.value=this._appService.getApp();
    this.tableauIndices=this._appService.getTableau();
  }


  add(){
    this.firebaseService.addUser()
    .then( async res => {
      let toast = await this.toastController.create({
        message: 'Vous avez bien cliqué sur le bouton. Félicitations.',
        duration: 3000
      });
      toast.present();
      /*this.resetFields();*/
    }, err => {
      console.log(err)
    })
  }
  /*resetFields() {
    throw new Error("Method not implemented.");
  }*/
}






  



