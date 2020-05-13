import { AngularFirestore } from 'angularfire2/firestore'

import {
  Injectable
} from '@angular/core';

@Injectable()
export class FirebaseService {

    constructor(
      public afs: AngularFirestore
    ){ }
  
      addUser(){
        return new Promise<any>((resolve, reject) => {
          this.afs.collection('/users').add({
            name: "monNom",
            surname: "monPrenom",
            age: parseInt("3")
          })
          .then(
            (res) => {
              resolve(res)
            },
            err => reject(err)
          )
        })
      }
  }