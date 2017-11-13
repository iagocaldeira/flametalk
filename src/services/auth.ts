import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth, public alertCtrl: AlertController) {
    let self = this;
    this.user = firebaseAuth.authState;
  }

  getUserId(){
    return "B8mrDfI78WO2Yav3UE1ZvY802zV2";//this.user.uid;
  }

  showErrorAlert(errMessage){
  	let alert = this.alertCtrl.create({
  		title: 'Something went wrong',
  		subTitle: errMessage,
  		buttons: ['Ok']
  	});
  	alert.present();
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        this.showErrorAlert(err.message);
      });    
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
      })
      .catch(err => {
        this.showErrorAlert(err.message);
      });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
  }

}