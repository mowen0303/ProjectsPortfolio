import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HttpModule} from "@angular/http";

//my custom provider
import {CommonToolService} from "../providers/common-tool.service";
import {UserService} from "../providers/user.service";
import {Camera} from "@ionic-native/camera";
import {FileTransfer} from "@ionic-native/file-transfer";
import {File} from '@ionic-native/file';
import {ForumService} from "../providers/forum.service";
import {Base64ToGallery} from "@ionic-native/base64-to-gallery";
import {Base64} from "@ionic-native/base64";
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {Keyboard} from "@ionic-native/keyboard";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{swipeBackEnabled:false}),
    CommonModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CommonToolService,
    UserService,
    Camera,
    FileTransfer,
    File,
    ForumService,
    Base64ToGallery,
    Base64,
    InAppBrowser,
    Keyboard

  ]
})
export class AppModule {
}
