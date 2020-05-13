import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { IonicErrorHandler } from 'ionic-angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { QRScanner } from '@ionic-native/qr-scanner/ngx';
//import { IonicStorageModule } from '@ionic/storage';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from 'angularfire2/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyDlkn3pIHG32g_EyX2w3XK5a0-XCBltZ0o",
  authDomain: "projet-qrcode-8f647.firebaseapp.com",
  databaseURL: "https://projet-qrcode-8f647.firebaseio.com",
  projectId: "projet-qrcode-8f647",
  storageBucket: "projet-qrcode-8f647.appspot.com",
  messagingSenderId: "727457620500",
  appId: "1:727457620500:web:4392f44adf3d6b2256bd01"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    //IonicStorageModule.forRoot({name:'__duckcoindb', driverOrder:['indexeddb', 'sqlite', 'websql']}),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    QRScanner,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
