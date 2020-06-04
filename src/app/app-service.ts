import {
   Injectable
} from '@angular/core';
import { Histoire, Etape } from './FirebaseService';

@Injectable()
export class appService {

   private static _instance: appService = new appService();

   //value: string = "";

   //le tableau des indices à trouver dans notre histoire :
   private mesEtapes:Etape[] = [];
   private etapeSuivante:Etape = null;

   //le tableau des indices déjà trouvés :
   tableauIndices: string[] = [];

   public static getInstance(): appService {
      return appService._instance;
   }

   private compteur:number=0;

   /*getApp(): string {
      return this.value;
   }

   setApp(v: string): void {
      this.value = v;
   }*/

   getTableau(): string[] {
      return this.tableauIndices;
   }

   /*setTableau(v: string[]): void {
      this.tableauIndices = v;
   }*/

   getEtapes(): Etape[] {
      return this.mesEtapes;
   }

   getEtapeSuivante():Etape{
      return this.etapeSuivante;
   }

   setEtapes(v: Etape[]): void {
      if(v.length!=0){
         this.mesEtapes = v;
         this.etapeSuivante=v[0];
      }
      else{
         console.log("erreur : il n'y a pas d'étapes dans cette histoire.")
      }
      
   }

   add(v: string): void {
      this.tableauIndices.push(v);
      this.compteur++;
      this.etapeSuivante=this.mesEtapes[this.compteur];
   }

} 