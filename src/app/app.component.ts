import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  chats: Observable<any[]>;
  constructor(private firestore: AngularFirestore) {
    this.chats = this.firestore.collection('chats').valueChanges();
  }
}