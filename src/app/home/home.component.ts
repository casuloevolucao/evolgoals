import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { Equipe } from '../models/equipe.model';
import { LoginService } from '../services/login.service';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  equipes: Equipe[] = new  Array<Equipe>()

  constructor(
    private homeS:HomeService,
    private loignS:LoginService,
  ) { }

  ngOnInit() {
    
  }
  submit(){
    let usuario:Usuario = new Usuario()
    usuario.email = "ismael@teste.com"
    usuario.senha = "85926302"
    usuario.nome = "ismael alves"

    let usuario2:Usuario = new Usuario()
    usuario2.email = "ismael@alves.com"
    usuario2.senha = "85926302"
    this.loignS.loginGoogle().then((rs)=>{
      console.log(rs)
    }).catch((e)=>{
      console.log(e)
    })
  }

}
