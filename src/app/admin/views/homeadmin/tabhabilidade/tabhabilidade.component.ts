import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tabhabilidade',
  templateUrl: './tabhabilidade.component.html',
  styleUrls: ['./tabhabilidade.component.css']
})
export class TabhabilidadeComponent implements OnInit {

  @Input() form:FormGroup

  constructor() { }

  ngOnInit() {
  }

}
