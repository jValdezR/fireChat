import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../providers/chat.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
  }

  ingresar(proveedor: string){
    console.log(proveedor);
    this.chatService.login(proveedor);
  }
}
