import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../interfaces/mensaje.interface';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];
  public usuario: any = {};





  constructor(private afs: AngularFirestore,
              public auth: AngularFireAuth) {
              auth.authState.subscribe(resp =>{
                console.log('Estado del usuario: ', resp);

                if (!resp){
                  return;
                }
                this.usuario.nombre = resp.displayName;
                this.usuario.uid = resp.uid;
              });

  }

  cargarMensajes() {
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => 
    ref.orderBy('fecha', 'desc').limit(5));

    return this.itemsCollection.valueChanges()
    .pipe(map((mensajes: Mensaje[]) => {
      this.chats = [];
      for(let mensaje of mensajes){
        this.chats.unshift(mensaje);
      }
    }));
  }

  agregarMensaje(texto: string){
    let mensaje: Mensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    };
    return this.itemsCollection.add(mensaje);
  }

  // tslint:disable-next-line: typedef
  login(proveedor: string) {
    // if(proveedor.toLocaleLowerCase() === 'google'){
    //   this.auth.signInWithPopup(new auth.GoogleAuthProvider());
    // }
    proveedor.toLocaleLowerCase() === 'google' ?
    this.auth.signInWithPopup(new auth.GoogleAuthProvider())
    // tslint:disable-next-line: no-unused-expression
    : this.auth.signInWithPopup(new auth.TwitterAuthProvider());
  }
  // tslint:disable-next-line: typedef
  logout() {
    this.usuario = {};
    this.auth.signOut();
  }

}
