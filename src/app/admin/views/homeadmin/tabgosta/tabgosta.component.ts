import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { resposta1, resposta2, resposta4, resposta3,resposta5 } from 'src/app/shared/pergutan-mock';

@Component({
  selector: 'app-tabgosta',
  templateUrl: './tabgosta.component.html',
  styleUrls: ['./tabgosta.component.css']
})
export class TabgostaComponent implements OnInit {

  @Input() form:FormGroup

  res1:string[] = resposta1
  res2:string[] = resposta2
  res3:string[] = resposta3
  res4:string[] = resposta4
  res5:string[] = resposta5

  constructor() { }

  ngOnInit() {
  }

}
