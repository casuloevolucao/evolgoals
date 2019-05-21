import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { Respostas } from '../models/respostas.model';
import { RespostaService } from '../services/resposta.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.css']
})
export class TesteComponent implements OnInit {

  constructor(
    private respostaS:RespostaService,
    private toastr:ToastrService
  ) { }

  ngOnInit() {
  }

  click(){
    this.respostaS.createListPares()
    .subscribe((rs:string)=>{
      this.toastr.success(rs)
      console.log(rs)
    })
    /*for(let i = 0; i < 1; i++){
      let usuario:Usuario = new Usuario()
      usuario.uid = "vtW1ZS6i6TRInNJ5SFwzr5ehxqu1"
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
