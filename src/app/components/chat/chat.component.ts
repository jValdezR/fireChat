import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit{

  mensaje = '';
  elemento: any;

  ngOnInit(){
     setTimeout(() => {
       this.elemento = document.getElementById('app-mensajes');
    }, 200);
    
  }
  constructor(public chatService: ChatService) {

    this.chatService.cargarMensajes().subscribe(()=>{
    this.elemento.scrollTop = this.elemento.scrollHeight;
    });
  }


  enviarMensaje(){
    console.log(this.mensaje);

    if (this.mensaje.length === 0){return;}

    this.chatService.agregarMensaje(this.mensaje)
    .then ((() => this.mensaje = ""))
    .catch((err: Error) => console.log('Error al enviar', err));
  }


}
