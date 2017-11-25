import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class MemberProvider {
  constructor(public db: AngularFireDatabase) {}

  getMembers() {
    var prom = new Promise((res,rej) => {
      this.db
        .object("members")
        .valueChanges()
        .take(1)
        .subscribe((list: any) => {
          res(list);
        });
    });

    return prom;

    // console.log("get members");

    // var listm = [];

    // var calll = function(){
    //   console.log("ok");
    //   console.log();

    //   var retornaList = function(){

    //   }

    //   var prom = function(db, function(resolve, reject) {

    //         console.log(this.db);

    //     }
    //   );
    //   return prom;
    // }

    // calll().then(data => {
    //   console.log("data");
    //   console.log(data);
    // })
    // .catch(err => {
    //   console.log("err");
    //   console.log(err);
    // });

    // return "ok";

    // console.log(this.db.list("members"));

    // afDb.list('items').subscribe(console.log);

    // var prom = new Promise(
    //   function (resolve, reject) {

    //     reject("reason");

    //         console.log("creating promisse");

    // this.db.object("members").valueChanges().take(1).subscribe(function (list: any) {
    //   console.log(list);
    //   resolve(list); // fulfilled
    // });

    //         var reason = new Error('error');
    //         reject(reason); // reject
    //     }
    // );

    // var membersAux = list;
    // for(var k = 0; k < membersAux.length; k++){

    //   console.log("adicionar membro");
    //   console.log(new MemberModel(0, "ok"));
    //   console.log("nessa lista aqui");
    //   console.log(this.members);

    //   this.members.push(new MemberModel(0, "ok"));
    // }

    // console.log(prom);
  }
}
