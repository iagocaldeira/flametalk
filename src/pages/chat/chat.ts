import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams, Content } from "ionic-angular";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { MemberModel } from "./member-model";
import { List } from "ionic-angular/components/list/list";
import { MemberProvider } from "../../providers/member/member";
import { AuthService } from '../../services/auth';

@Component({
  selector: "page-chat",
  templateUrl: "chat.html",
  providers: [MemberProvider]
})
export class ChatPage {
  @ViewChild("content") content: any;

  messages: Observable<any[]>;
  members;

  localNames: any[];
  message: string = "";

  chatInfo = {
    chatId: 0,
    chatName: "..."
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
    public memberProvider: MemberProvider,
    public authService: AuthService
  ) {
    this.getMemberList().then(r=>this.members = r);
    this.chatInfo.chatId = navParams.data.chatId;
    // this.chatInfo.chatName = navParams.data.chatName;
    this.messages = db.list("messages/" + this.chatInfo.chatId).valueChanges();
  }

  async getMemberList() {
    return await this.memberProvider.getMembers().then(res => res);
  }

  getName(id: number) {
    var user = this.members.find((el)=>{
      return el.id = id;
    });
    return user ? user.name : "";
  }

  sendMessage() {
    let messageId = new Date().getTime();
    let messageObj = {
      id: new Date().getTime(),
      owner: this.authService.getUserId(),
      text: this.message
    };
    const itemRef = this.db.object(
      "messages/" + this.chatInfo.chatId + "/" + messageId
    );
    itemRef.set(messageObj);
    this.message = "";
  }

  isMyMessage(message){
    return message.owner == this.authService.getUserId();
  }

  talvezSend(e){
    if(e.keyCode == 13){
      this.sendMessage();
    }
  }

}
