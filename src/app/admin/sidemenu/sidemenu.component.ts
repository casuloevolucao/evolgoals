import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  @Input() usuario:Usuario

  modalRef: BsModalRef;

  constructor(
    private loginS:LoginService,
    private toastr:ToastrService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }

  openModal(termos: TemplateRef<any>) {
    this.modalRef = this.modalService.show(termos);
  }

  logout(){
    this.loginS.logout().then(()=>{
      this.toastr.success("Logout feito com sucesso!!!")
    })
  }
}
