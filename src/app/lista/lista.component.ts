import { Component, OnInit } from '@angular/core';
import { RespostaService } from '../services/resposta.service';
import { LoginService } from '../services/login.service';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  usuario:Usuario = new Usuario() 

  lista:Usuario[]

  constructor(
    private respostaS:RespostaService,
    private loginS:LoginService
  ) { }

  ngOnInit() {
    this.loginS.currentUser().subscribe((user:Usuario)=>{
      this.usuario = user
      this.respostaS.getListUsers(user).subscribe((lista:Usuario[])=>{
        console.log(lista)
        this.lista = lista
      })
    })
  
  }

}
