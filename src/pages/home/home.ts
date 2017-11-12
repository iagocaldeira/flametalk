import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { ChatPage } from '../chat/chat';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  rooms: Observable<any[]>;
  members: Observable<any[]>;
  tabItem = 0;

  constructor(public navCtrl: NavController, db: AngularFireDatabase) {
    this.rooms = db.list('rooms').valueChanges();
    this.members = db.list('members').valueChanges();
  }
 
  changePage(id: number, name: string) {
    this.navCtrl.push(ChatPage, {chatId: id, chatName: name});
  }

  selectTab(tab: number){
    this.tabItem = tab;
  }

  getDateString(){

    var date = new Date();

    var monthNames = [
      "Janeiro", "Fevereiro", "Março",
      "Abril", "Maio", "Junho", "Julio",
      "Agosto", "Setembro", "Outubro",
      "Novembro", "Dezembro"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

}