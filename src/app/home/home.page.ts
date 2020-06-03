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
    
  }



}






  



