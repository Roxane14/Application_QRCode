import { AngularFirestore } from 'angularfire2/firestore'

import {
  Injectable
} from '@angular/core';
import { stringify } from 'querystring';

@Injectable()
export class FirebaseService {

  public reference:string;

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

      nouvelleHistoire(titre:string, nombre:number, etapes:Etape[]){
        
        return new Promise<any>((resolve, reject) => {
          this.afs.collection('/histoires').add({
            Titre: titre,
            NombreEtapes: nombre
          })
          .then(
            (res) => {
              resolve(res)
              this.reference=res.id;
            },
            err => reject(err)
          );

          for(let i=0;i<nombre;i++){

            this.afs.collection('/histoires/').doc(this.reference).collection('/etapes/').add({
              Nom: etapes[i].nom,
              Lieu: etapes[i].lieu
            })
            .then(
              (res) => {
                resolve(res)
              },
              err => reject(err)
            )

          }
          
        })
      }
  }

  @Injectable()
  export class Etape {

    constructor(){

    }
    nom:string;
    lieu:string;

  }