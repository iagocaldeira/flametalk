import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  messages: Observable<any[]>;
  members: Observable<any[]>;

  localNames: any[];

  chatId: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
    // this.chatId = navParams.data.chatId;
    this.chatId = 0;
    this.messages = db.list("messages/" + this.chatId).valueChanges();
    this.members = db.list("members").valueChanges();
  }

  ionViewDidLoad() {
  }



  getMember(id: any) {

    //  this.db.object("members/" + id).valueChanges().take(1).subscribe(function (asd: any) {
    //     this.localNamesasd.name;
    // });

    return this.members[id];
  }


}
