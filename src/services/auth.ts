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

  getCurrentUser(){
    var user = firebase.auth().currentUser;

    if(user != null){
      return {
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
        emailVerified: user.emailVerified,
        uid: user.uid
      };
    }
  }

  getUserId(){
    var currentUser = this.getCurrentUser();
    return currentUser ? currentUser.uid : null;
  }

  getUserName(){
    var currentUser = this.getCurrentUser();
    return currentUser ? currentUser.name || currentUser.emailVerified : null;
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