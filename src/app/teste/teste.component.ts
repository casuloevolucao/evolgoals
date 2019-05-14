import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { Respostas } from '../models/respostas.model';
import { RespostaService } from '../services/resposta.service';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.css']
})
export class TesteComponent implements OnInit {

  constructor(
    private respostaS:RespostaService
  ) { }

  ngOnInit() {
  }

  click(){
    this.respostaS.createListPares()
    /*for(let i = 0; i < 2; i++){
      let usuario:Usuario = new Usuario()
      usuario.uid = "5y4tSU8M4yc15F714HBMdkgE5pH3"
      usuario.facebook = "teste"
      usuario.instagram = "teste"
      usuario.twitter = "teste"
      usuario.descricao = "teste"  
      usuario.whatsapp = 10
      usuario.idade = 18

      let resposta:Respostas = new Respostas()
      resposta.res1 = 0
      resposta.res2 = 3
      resposta.res3 = 2
      resposta.res4 = 1
      resposta.res5 = 2
      resposta.res6 = 0
      resposta.res7 = 1
      resposta.res8 = 0
      resposta.res9 = 3
      resposta.res10 = 2

      this.respostaS.sendResposta(usuario, resposta).subscribe((rs)=>{
        console.log(rs)
      })
    }*/
  }

}
