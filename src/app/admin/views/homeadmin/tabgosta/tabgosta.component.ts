import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tabgosta',
  templateUrl: './tabgosta.component.html',
  styleUrls: ['./tabgosta.component.css']
})
export class TabgostaComponent implements OnInit {

  @Input() form:FormGroup

  constructor() { }

  ngOnInit() {
  }

}
