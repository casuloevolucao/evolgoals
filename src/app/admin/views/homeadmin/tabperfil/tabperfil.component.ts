import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tabperfil',
  templateUrl: './tabperfil.component.html',
  styleUrls: ['./tabperfil.component.css']
})
export class TabperfilComponent implements OnInit {

  @Input() form:FormGroup

  constructor() { }

  ngOnInit() {
  }

}
