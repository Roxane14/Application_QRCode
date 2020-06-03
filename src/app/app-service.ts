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

   //le tableau des indices déjà trouvés :
   tableauIndices: string[] = [];

   public static getInstance(): appService {
      return appService._instance;
   }

   /*getApp(): string {
      return this.value;
   }

   setApp(v: string): void {
      this.value = v;
   }*/

   getTableau(): string[] {
      return this.tableauIndices;
   }

   setTableau(v: string[]): void {
      this.tableauIndices = v;
   }

   getEtapes(): Etape[] {
      return this.mesEtapes;
   }

   setEtapes(v: Etape[]): void {
      this.mesEtapes = v;
   }

   add(v: string): void {
      this.tableauIndices.push(v);
   }

} 