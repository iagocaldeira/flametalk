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

  constructor(public navCtrl: NavController, db: AngularFireDatabase) {
    this.rooms = db.list('rooms').valueChanges();
    this.members = db.list('members').valueChanges();
  }
 
  changePage(id){
    this.navCtrl.push(ChatPage, {chatId: id});
  }

}