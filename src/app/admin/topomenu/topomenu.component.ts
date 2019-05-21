import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topomenu',
  templateUrl: './topomenu.component.html',
  styleUrls: ['./topomenu.component.css']
})
export class TopomenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  menu(){
    if (window.innerWidth < 756) {
      let element = document.querySelector("#wrapper")
      element.classList.toggle("toggled")
    }else{
      let element = document.querySelector("#wrapper")
      element.classList.toggle("toggled-2")
    }
  }

}
