import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

import { appService } from '../app-service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
  providers:[appService]
})
export class ScanPage implements OnInit {

  public textToCode: string;
  public myAngularxQrCode: string = null;

  public scanTermine = false;
  public textScanned: string = '';

  _appService = appService.getInstance();
  public indice : string;

  createQRCode() {
    this.myAngularxQrCode = this.textToCode;
    this.textToCode = "";
  }

  constructor(
    private qrScanner: QRScanner
  ) {
    
    this.scanCode();
  }

  scanCode() {
    this.closeCamera();
    //this.showCamera = true;
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted

          // start scanning
          console.log('Scan en cours...' + JSON.stringify(status));
          const scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);
            this.textScanned = text;
            this.scanTermine = true;

            if(text == "2"){
              this.indice = "Grille-pain.";
              this._appService.add(this.indice);
            }

            if(text == "1"){
              this.indice = "Ordinateur de la chambre.";
              this._appService.add(this.indice);
            }

            if(text == "3"){
              this.indice = "Poche arrière de Roxane.";
              this._appService.add(this.indice);
            }

            this.closeCamera();

          });

        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

  closeCamera() {
    this.qrScanner.hide(); // hide camera preview
    this.qrScanner.destroy();
  }

  ngOnInit() {
  }

}
