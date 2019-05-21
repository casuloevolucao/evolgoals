import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { LoginService } from '../services/login.service';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Groupo } from '../models/equipe.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../services/home.service';
import { RespostaService } from '../services/resposta.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @Input() usuario:Usuario = new Usuario()

  usersRegister:Usuario[]

  form:FormGroup = new FormGroup({
    "equipe": new FormArray([
      new FormGroup({
        "nome": new FormControl(null, [Validators.required]),
        "descricao": new FormControl(null, [Validators.required]),
        "foto": new FormControl(null, [Validators.required]),
        "facebook": new FormControl(null, ),
        "instagram": new FormControl(null,),
        "github": new FormControl(null, ),
        "linkedin": new FormControl(null,),
      }),
      new FormGroup({
        "nome": new FormControl(null, [Validators.required]),
        "descricao": new FormControl(null, [Validators.required]),
        "foto": new FormControl(null, [Validators.required]),
        "facebook": new FormControl(null, ),
        "instagram": new FormControl(null,),
        "github": new FormControl(null, ),
        "linkedin": new FormControl(null,),
      }),
      new FormGroup({
        "nome": new FormControl(null, [Validators.required]),
        "descricao": new FormControl(null, [Validators.required]),
        "foto": new FormControl(null, [Validators.required]),
        "facebook": new FormControl(null, ),
        "instagram": new FormControl(null,),
        "github": new FormControl(null, ),
        "linkedin": new FormControl(null,),
      })
    ])
  })

  get equipe(){
    return this.form.get('equipe') as FormArray
  }

  modalRef: BsModalRef;

  send:boolean

  constructor(
    private loginS:LoginService,
    private homeS:HomeService,
    private modalService: BsModalService,
    private spinnerS:NgxSpinnerService,
    private toastr:ToastrService,
    private respostaS:RespostaService,
  ) { }

  ngOnInit() {
    this.loginS.currentUser().subscribe((rs:Usuario)=>{
      this.usuario = rs
    })
    this.loginS.getUsersResgistres().subscribe((rs:Usuario[])=>{
      this.usersRegister = rs
    })
    this.loginS.getSendRespose().subscribe((rs:any)=>{
      this.send = rs.send
    })
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  submit(){
    let grupo:Groupo = new Groupo(this.form.value)
    this.spinnerS.show()
    this.homeS.sendEquipe(grupo)
    .then(()=>{
      this.spinnerS.hide()
      this.modalRef.hide()
      this.form.reset()
      this.toastr.success("Cadastrado equipe com sucesso!!!")
    })
    .catch(()=>{
      this.spinnerS.hide()
      this.toastr.error("Erro ao cadastrar equipe")
    })
  }

  disableSend(){
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Admin você estara desabilitando o envio de respostas',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim tenho certeza!',
      cancelButtonText: 'Não Espera mais um pouco!'
    }).then((result) => {
      if (result.value) {
        this.loginS.closeSendResponse(this.usuario).then((rs)=>{
          Swal.fire(
            'Desativado!',
            'O Formulário de Envio foi desativado com Sucesso',
            'success'
          )
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

  execute(){
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Admin você estara executando o programa de pares',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim tenho certeza!',
      cancelButtonText: 'Não Espera mais um pouco!'
    }).then((result) => {
      this.spinnerS.show()
      if (result.value) {
        this.respostaS.createListPares().subscribe((rs:string)=>{
          this.spinnerS.hide()
          this.toastr.success(rs,"Encontrado",{
            timeOut:10000
          })
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
