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
  public etape_tampon: Etape;
  public etapes_tampon: Etape[];

  public reference: number = 1;

  public document: firebase.firestore.DocumentData;
  public titre: string;

  public ok:Boolean;
  public i:number;

  constructor(
    public afs: AngularFirestore,
  ) { }

  async nouvelleHistoire(titre: string, nombre: number, etapes: Etape[]) {

    console.log("avant lire histoire :"+this.reference);

    await this.lireHistoires();

    console.log("après lire histoire :"+this.reference);

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

        this.afs.collection('/histoires/').doc(this.reference.toString()).collection('/etapes/').doc(i.toString()).set({
          Nom: etapes[i].nom,
          Lieu: etapes[i].lieu,
          QrCode: i
        })
          .then(
            (res) => {
              resolve(res)
            },
            err => reject(err)
          )
      }
      //this.reference++;

    })
  }

  async lireHistoires() {
    this.histoires_renvoyees = [];

    this.ok = true;
    this.i=0;

        while(this.ok){
        console.log(this.i);
        this.i++;

        let docRef = await this.afs.collection('/histoires/').doc(this.i.toString()).get().toPromise()
          .then( async doc => {
            if (!doc.exists) {
              console.log('No such document');
              this.ok=false;
              this.reference=this.i;
            } else {
              console.log('Document data:', doc.data());
              this.document = doc.data();
              this.histoire_tampon = new Histoire();
              this.histoire_tampon.titre = this.document.Titre;
              this.histoire_tampon.nombreEtapes = this.document.NombreEtapes;
              this.etapes_tampon = [];

              for(let j=0;j<this.histoire_tampon.nombreEtapes;j++){
                let docRef2 = await this.afs.collection('/histoires/').doc(this.i.toString()).collection('/etapes/').doc(j.toString()).get().toPromise()
                .then( async doc => {
                  if (!doc.exists) {
                    console.log('No such sub-document');
                  } else {
                    console.log('Document data:', doc.data());
                    this.document = doc.data();

                    this.etape_tampon = new Etape();
                    this.etape_tampon.lieu = this.document.Lieu;
                    this.etape_tampon.nom = this.document.Nom;
                    this.etape_tampon.qr = this.document.QrCode;


                    this.etapes_tampon.push(this.etape_tampon);
                  }
                })

                  .catch(err => {
                    console.log('Error getting document', err);
                  });
                  
                }

              this.histoire_tampon.etapes = this.etapes_tampon;

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

@Injectable()
export class Etape {

  constructor() {

  }
  nom: string;
  lieu: string;
  qr:number;

}

@Injectable()
export class Histoire {

  constructor() {

  }
  titre: string;
  nombreEtapes: number;
  etapes: Etape[];

}