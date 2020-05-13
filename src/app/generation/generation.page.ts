import { Component, OnInit } from '@angular/core';
import{QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner/ngx';


@Component({
  selector: 'app-generation',
  templateUrl: './generation.page.html',
  styleUrls: ['./generation.page.scss'],
})
export class GenerationPage implements OnInit {

  public textToCode: string;
  public myAngularxQrCode: string = null;

  createQRCode() {
    this.myAngularxQrCode = this.textToCode;
    this.textToCode = "";
  }

  constructor() { }

  ngOnInit() {
  }

}
