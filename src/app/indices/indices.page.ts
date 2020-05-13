import { Component, OnInit } from '@angular/core';

import { appService } from '../app-service';

@Component({
  selector: 'app-indices',
  templateUrl: './indices.page.html',
  styleUrls: ['./indices.page.scss'],
  providers:[appService]
})
export class IndicesPage implements OnInit {
  tableauIndices : string[];
  _appService = appService.getInstance();



  constructor() { 
    //this._appService.add("indiceIndices");
    this.tableauIndices=this._appService.getTableau();
    
  }

  ngOnInit() {
  }

}


