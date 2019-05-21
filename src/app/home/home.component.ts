import { Component, OnInit, TemplateRef } from '@angular/core';
import { HomeService } from '../services/home.service';
import { Groupo } from '../models/equipe.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  groupos:Groupo[] = new Array<Groupo>()

  modalRef: BsModalRef;

  constructor(
    private homeS:HomeService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.homeS.getData().subscribe((rs:Groupo[])=>{
      this.groupos = rs
    })
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
