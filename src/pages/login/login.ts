import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';

import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  email: string;
  password: string;

  constructor(public authService: AuthService, public navCtrl: NavController) {
    authService.user.subscribe(function redirectToHome(userState){
      if(userState)
        navCtrl.push(HomePage);
    });
  }

  signup() {
    this.authService.signup(this.email, this.password);
    this.email = this.password = '';
  }

  login() {
    this.authService.login(this.email, this.password);
    this.email = this.password = '';
  }

  logout() {
    this.authService.logout();
  }
}