import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { Equipe } from '../models/equipe.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  equipes: Equipe[] = new  Array<Equipe>()

  constructor(
    private homeS:HomeService,
  ) { }

  ngOnInit() {
    
  }
  submit(){
    
  }

}
