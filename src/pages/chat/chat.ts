import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  @ViewChild(Content) content: Content;

  messages: Observable<any[]>;
  members: Observable<any[]>;

  localNames: any[];
  message: string = "";

  chatInfo = {
    chatId: 0, 
    chatName: "..."
  };

  constructor(public navParams: NavParams, public db: AngularFireDatabase, public authService: AuthService) {
    this.chatInfo.chatId = navParams.data.chatId;
    // this.chatInfo.chatName = navParams.data.chatName;
    this.messages = db.list("messages/" + this.chatInfo.chatId).valueChanges();
    this.members = db.list("members").valueChanges();
  }

  ionViewDidLoad() {
  }

  isMyMessage(message){
    return message.owner == this.authService.getUserId();
  }

  getMember(id: any) {

    //  this.db.object("members/" + id).valueChanges().take(1).subscribe(function (asd: any) {
    //     this.localNamesasd.name;
    // });

    return this.members[id];
  }

  talvezSend(e){
    if(e.keyCode == 13){
      this.sendMessage();
    }
  }

  sendMessage(){
    let messageId = new Date().getTime();
    const itemRef = this.db.object("messages/" + this.chatInfo.chatId + "/" + messageId);
    itemRef.set({ id: new Date().getTime(), owner: this.authService.getUserId(), text: this.message });
    this.content.scrollToBottom();
    this.message = "";
  }

}
