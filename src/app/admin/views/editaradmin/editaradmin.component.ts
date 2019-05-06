import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Usuario } from 'src/app/models/usuario.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  constructor(
    private loginS:LoginService
  ) { }

  ngOnInit() {
    this.loginS.currentUser().then((user:Usuario)=>{
      this.form.patchValue({
        nome: user.nome,
        email: user.email
      });
      this.usuario = user
    })
  }

  submit(){
    
  }

}
