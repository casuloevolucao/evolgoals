import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Usuario } from 'src/app/models/usuario.model';
import { RespostaService } from 'src/app/services/resposta.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-homeadmin',
  templateUrl: './homeadmin.component.html',
  styleUrls: ['./homeadmin.component.css']
})
export class HomeadminComponent implements OnInit {

  usuario:Usuario = new Usuario()

  @Input() form:FormGroup = new FormGroup({
    whatsapp: new FormControl(null, [Validators.required]),
    twitter: new FormControl(null),
    facebook: new FormControl(null),
    instagram: new FormControl(null),
    descricao: new FormControl(null),
    idade: new FormControl(null, [Validators.required])
  })

  @Input() resposta:FormGroup = new FormGroup({
    res1: new FormControl(null, [Validators.required]),
    res2: new FormControl(null, [Validators.required]),
    res3: new FormControl(null, [Validators.required]),
    res4: new FormControl(null, [Validators.required]),
    res5: new FormControl(null, [Validators.required]),
    res6: new FormControl(null, [Validators.required]),
    res7: new FormControl(null, [Validators.required]),
    res8: new FormControl(null, [Validators.required]),
    res9: new FormControl(null, [Validators.required]),
    res10: new FormControl(null, [Validators.required]),
  })

  lista:Usuario[]

  send:boolean
  constructor(
    private loginS:LoginService
  ) { }

  ngOnInit() {
    this.loginS.currentUser().subscribe((user:Usuario)=>{
      this.usuario = user
    })
    this.loginS.getSendRespose().subscribe((rs:any)=>{
      this.send = rs.send
    })
  }

}
