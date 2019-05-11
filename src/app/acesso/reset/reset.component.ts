import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Usuario } from 'src/app/models/usuario.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  form:FormGroup  = new FormGroup({
    "email":new FormControl(null, [Validators.required, Validators.email]),
    
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
    this.loginS.resetPassword(usuario)
    .then(()=>{
      this.spinnerS.hide()
      this.toast.success(`foi enviado um email para ${usuario.email}`)
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
