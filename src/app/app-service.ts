import {
   Injectable
} from '@angular/core';

@Injectable()
export class appService {

   private static _instance: appService = new appService();

   value: string = "";

   tableauIndices: string[] = [];

   /*constructor() {
      if (appService._instance) {
         throw new Error("Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.");
      }
      appService._instance = this;
   }*/

   public static getInstance(): appService {
      return appService._instance;
   }

   getApp(): string {
      return this.value;
   }

   setApp(v: string): void {
      this.value = v;
   }

   getTableau(): string[] {
      return this.tableauIndices;
   }

   setTableau(v: string[]): void {
      this.tableauIndices = v;
   }

   add(v: string): void {
      this.tableauIndices.push(v);
   }

} 