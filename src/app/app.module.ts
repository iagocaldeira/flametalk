import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ChatPage } from '../pages/chat/chat';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import 'rxjs/add/operator/take';
import { MemberProvider } from '../providers/member/member';
export const firebaseConfig = {
  apiKey: "AIzaSyCTYnskFxmiz8DAhY7rVgR-x8Pu5fs0VN4",
  authDomain: "flametalk-57619.firebaseapp.com",
  databaseURL: "https://flametalk-57619.firebaseio.com",
  projectId: "flametalk-57619",
  storageBucket: "flametalk-57619.appspot.com",
  messagingSenderId: "353184206367"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ChatPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ChatPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MemberProvider
  ]
})
export class AppModule {}
