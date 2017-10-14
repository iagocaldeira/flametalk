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
  message: string = "";

  chatInfo = {
    chatId: 0, 
    chatName: "..."
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
    this.chatInfo.chatId = navParams.data.chatId;
    // this.chatInfo.chatName = navParams.data.chatName;
    this.messages = db.list("messages/" + this.chatInfo.chatId).valueChanges();
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


  sendMessage(){
    let messageId = new Date().getTime();
    const itemRef = this.db.object("messages/" + this.chatInfo.chatId + "/" + messageId);
    itemRef.set({ id: new Date().getTime(), owner: 0, text: this.message });
  }

}
