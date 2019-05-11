import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/services/login.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup  = new FormGroup({
    "email":new FormControl(null, [Validators.required, Validators.email]),
    "senha": new FormControl(null, [Validators.required, Validators.minLength(6)])
  })

  constructor(
    private loginS:LoginService,
    private spinnerS:NgxSpinnerService,
    private toast:ToastrService
  ) 
  
  { }

  ngOnInit() {

  }
  submit(){
    this.spinnerS.show()
    let usuario:Usuario = new Usuario(this.form.value)
    this.loginS.login(usuario)
    .then(()=>{
      this.spinnerS.hide()
      this.toast.success('login efetuado com sucesso')
    })
    .catch((e)=>{
      this.spinnerS.hide()
      this.toast.error(e)
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
      this.toast.error(e)
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
      this.toast.error(e)
    })
  }
}
