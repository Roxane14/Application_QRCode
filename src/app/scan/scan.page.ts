import { Component, OnInit, NgZone } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

import { appService } from '../app-service';
import { Etape } from '../FirebaseService';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
  providers: [appService]
})
export class ScanPage implements OnInit {

  public textToCode: string;
  public myAngularxQrCode: string = null;

  public scanTermine = false;
  public textScanned: string = '';

  _appService = appService.getInstance();
  public indice: string;

  public etapeSuivante: Etape;
  public valide: Boolean = false;

  createQRCode() {
    this.myAngularxQrCode = this.textToCode;
    this.textToCode = "";
  }

  constructor(
    private qrScanner: QRScanner,
    private ngZone: NgZone
  ) {
    this.scanCode();
  }

  scanCode() {
    console.log("scan code");
    this.etapeSuivante = this._appService.getEtapeSuivante();

    console.log("etape suivante : " + this.etapeSuivante);

    if (this.etapeSuivante == null) {
      this.valide = false;
    }

    else {

      this.ngZone.run(() => {
        this.scanTermine = false;
      });

      this.valide = true;
      console.log("le qr code : " + this.etapeSuivante.qr);
      console.log("l'indice : " + this.etapeSuivante.lieu);
      //this.closeCamera();

      this.qrScanner.hide(); // hide camera preview
      //this.qrScanner.destroy();

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


              if (text == this.etapeSuivante.qr.toString()) {
                this.indice = this.etapeSuivante.lieu;
                this._appService.add(this.indice);
              }

              this.ngZone.run(() => {
                this.scanTermine = true;
              });

              this.qrScanner.hide(); // hide camera preview
              this.qrScanner.destroy();


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
  }


  ngOnInit() {
  }

  ionViewWillEnter() {
    this.scanCode();
  }


}
