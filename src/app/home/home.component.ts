import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { Groupo } from '../models/equipe.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  groupos:Groupo[] = new Array<Groupo>()

  constructor(
    private homeS:HomeService,
  ) { }

  ngOnInit() {
    this.homeS.getData().subscribe((rs:Groupo[])=>{
      this.groupos = rs
    })
  }
  submit(){
    
  }

}
