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
    idade: new FormControl(null),
    res1: new FormControl(null),
    res2: new FormControl(null),
    res3: new FormControl(null),
    res4: new FormControl(null),
    res5: new FormControl(null),
    res6: new FormControl(null),
    res7: new FormControl(null),
    res8: new FormControl(null),
    res9: new FormControl(null),
    res10: new FormControl(null),
  })

  lista:Usuario[]
  constructor(
    private loginS:LoginService
  ) { }

  ngOnInit() {
    this.loginS.currentUser().subscribe((user:Usuario)=>{
      this.usuario = user
    })
    
  }

}
