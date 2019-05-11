import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { LoginService } from 'src/app/services/login.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  form:FormGroup  = new FormGroup({
    "nome": new FormControl(null, [Validators.required]),
    "email":new FormControl(null, [Validators.required, Validators.email]),
    "senha": new FormControl(null, [Validators.required, Validators.minLength(6)])
  })

  constructor(
    private loginS:LoginService,
    private spinnerS:NgxSpinnerService,
    private toast:ToastrService
  ) { }

  ngOnInit() {
  }
  submit(){
    this.spinnerS.show()
    let usuario:Usuario = new Usuario(this.form.value)
    this.loginS.createUser(usuario)
    .then(()=>{
      this.spinnerS.hide()
      this.toast.success(`Conta Criada com sucesso ${usuario.email}`)
    })
    .catch((e)=>{
      this.spinnerS.hide()
      this.toast.error(this.loginS.erroTratament(e).message)
    })
  }

  facebook(){
    this.loginS.loginFacebook()
    .then(()=>{
      this.spinnerS.hide()
      this.toast.success(`login efeuado com sucesso!!!`)
    })
    .catch((e)=>{
      this.spinnerS.hide()
      this.toast.error(this.loginS.erroTratament(e).message)
    })
  }

  google(){
    this.loginS.loginGoogle()
    .then(()=>{
      this.spinnerS.hide()
      this.toast.success(`login efeuado com sucesso!!!`)
    })
    .catch((e)=>{
      this.spinnerS.hide()
      this.toast.error(this.loginS.erroTratament(e).message)
    })
  }
}
