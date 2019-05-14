import { Component, OnInit, TemplateRef } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Usuario } from 'src/app/models/usuario.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editaradmin',
  templateUrl: './editaradmin.component.html',
  styleUrls: ['./editaradmin.component.css']
})
export class EditaradminComponent implements OnInit {

  usuario:Usuario = new Usuario()

  form:FormGroup = new FormGroup({
    "foto": new FormControl(null,[Validators.required]),
    "nome": new FormControl(null,[Validators.required]),
    "email":new FormControl(null, [Validators.required, Validators.email]),
    "senha": new FormControl(null, [Validators.required, Validators.minLength(6)])
  })

  formConfirm:FormGroup = new FormGroup({
    "senha": new FormControl(null, [Validators.required, Validators.minLength(6)])
  })

  modalRef: BsModalRef;

  img:File;

  constructor(
    private loginS:LoginService,
    private modalService: BsModalService,
    private spinner:NgxSpinnerService,
    private toastr:ToastrService,
    private router:Router,
  ) { }

  ngOnInit() {
    this.loginS.currentUser().subscribe((user:Usuario)=>{
      this.form.patchValue({
        nome: user.nome,
        email: user.email
      });
      this.usuario = user
    })
  } 

  openModal(confirm: TemplateRef<any>) {
    this.modalRef = this.modalService.show(confirm);
  }

  capturarImg(event: Event): void {
    this.img = (<HTMLInputElement>event.target).files[0]
  }

  submit(){
    let novoUsuario:Usuario = new Usuario(this.form.value)
    let atualUsuario:Usuario = new Usuario(this.formConfirm.value)
    novoUsuario.foto = this.img
    this.spinner.show()
    this.loginS.editUser(novoUsuario, atualUsuario.senha)
    .then(()=>{
      this.spinner.hide()
      this.modalRef.hide()
      this.form.reset()
      this.formConfirm.reset()
      this.toastr.success("usuario foi atualizado com sucesso!!!")
    })
    .catch((e)=>{
      this.spinner.hide()
      this.toastr.error(this.loginS.erroTratament(e).message)
    })
  }

}
