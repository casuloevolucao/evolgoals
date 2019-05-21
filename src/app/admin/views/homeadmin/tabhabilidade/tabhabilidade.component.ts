import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { resposta6, resposta7, resposta8, resposta9, resposta10 } from 'src/app/shared/pergutan-mock';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { RespostaService } from 'src/app/services/resposta.service';
import { LoginService } from 'src/app/services/login.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Respostas } from 'src/app/models/respostas.model';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-tabhabilidade',
  templateUrl: './tabhabilidade.component.html',
  styleUrls: ['./tabhabilidade.component.css']
})
export class TabhabilidadeComponent implements OnInit {

  @Input() form:FormGroup
  @Input() resposta:FormGroup
  res6:string[] = resposta6
  res7:string[] = resposta7
  res8:string[] = resposta8
  res9:string[] = resposta9
  res10:string[] = resposta10

  usuario:Usuario

  constructor(
    private respostaS:RespostaService,
    private loginS:LoginService,
    private spinnerS:NgxSpinnerService,
    private toast:ToastrService
  ) { }

  ngOnInit() {
    this.loginS.currentUser().subscribe((rs:Usuario)=>{
      this.usuario = rs
    })
  }
  submit(){
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'você so poderar Enviar uma unica vez !!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim tenho certeza!',
      cancelButtonText: 'Não Espera mais um pouco!'
    }).then((result) => {
      
      if (result.value) {
        this.spinnerS.show()
        let resposta:Respostas = new Respostas(this.resposta.value)
        let usuario:Usuario = new Usuario(this.form.value)
        usuario.uid = this.usuario.uid
        this.respostaS.sendResposta(usuario, resposta).then((rs)=>{
          Swal.fire(
            'Enviado!',
            'O Formulário foi Enviado com Sucesso',
            'success'
          )
          this.spinnerS.hide()
        })
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Eita Quase :)',
          'error'
        )
      }
    })
  }
}
