import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: Observable<any[]>;

  constructor(public navCtrl: NavController, db: AngularFireDatabase) {

    this.items = db.list('rooms').valueChanges();

    console.log(this.items);

  }

  validItem(anythinbg: any){
    console.log(anythinbg);

    return false;
  }
  
}


// {
//   "rules": {
//     ".read": "auth != null",
//       ".write": "auth != null"
//   }
// }