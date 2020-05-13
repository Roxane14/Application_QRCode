import { AngularFirestore } from 'angularfire2/firestore'

import {
  Injectable
} from '@angular/core';
import { stringify } from 'querystring';

@Injectable()
export class FirebaseService {

  public id_histoires: string[];

  public histoires_renvoyees: Histoire[];
  public histoire_tampon: Histoire;

  public reference: number = 1;

  public document: firebase.firestore.DocumentData;
  public titre: string;

  constructor(
    public afs: AngularFirestore,
  ) { }

  addUser() {
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

  nouvelleHistoire(titre: string, nombre: number, etapes: Etape[]) {

    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/histoires').doc(this.reference.toString()).set({
        Titre: titre,
        NombreEtapes: nombre
      })
        .then(
          (res) => {
            resolve(res)
          },
          err => reject(err)
        )


      for (let i = 0; i < nombre; i++) {

        this.afs.collection('/histoires/').doc(this.reference.toString()).collection('/etapes/').add({
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
      this.reference++;

    })
  }

  async lireHistoires() {
    this.histoires_renvoyees = [];

     if (this.reference != 0) {

      for (let i = 1; i < this.reference; i++) {
        console.log(i);

        let cityRef = await this.afs.collection('/histoires/').doc(i.toString()).get().toPromise()
          .then( doc => {
            if (!doc.exists) {
              console.log('No such document');
            } else {
              console.log('Document data:', doc.data());
              this.document = doc.data();
              this.histoire_tampon = new Histoire();
              this.histoire_tampon.titre = this.document.Titre;
              this.histoire_tampon.nombreEtapes = this.document.NombreEtapes;
              this.histoires_renvoyees.push(this.histoire_tampon);

            }
          })
          .catch(err => {
            console.log('Error getting document', err);
          });
      }
      return this.histoires_renvoyees;
    }
  }
}

@Injectable()
export class Etape {

  constructor() {

  }
  nom: string;
  lieu: string;

}

@Injectable()
export class Histoire {

  constructor() {

  }
  titre: string;
  nombreEtapes: number;
  etapes: Etape[];

}