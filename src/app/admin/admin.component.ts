import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @Input() usuario:Usuario = new Usuario()

  constructor(
    private loginS:LoginService
  ) { }

  ngOnInit() {
    this.loginS.currentUser().then((user:Usuario)=>{
      this.usuario = user
      console.log(this.usuario)
    })
  }

}
