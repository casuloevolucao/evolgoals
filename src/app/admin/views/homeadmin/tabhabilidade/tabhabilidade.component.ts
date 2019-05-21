import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { resposta6, resposta7, resposta8 } from 'src/app/shared/pergutan-mock';

@Component({
  selector: 'app-tabhabilidade',
  templateUrl: './tabhabilidade.component.html',
  styleUrls: ['./tabhabilidade.component.css']
})
export class TabhabilidadeComponent implements OnInit {

  @Input() form:FormGroup
  res6:string[] = resposta6
  res7:string[] = resposta7
  res8:string[] = resposta8

  constructor() { }

  ngOnInit() {
  }
  submit(){}
}
