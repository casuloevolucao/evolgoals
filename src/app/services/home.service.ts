import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Groupo } from '../models/equipe.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private af:AngularFirestore
  ) { }

  getData(){
    return this.af.collection("equipe").valueChanges()
  }

   //cadastrar equipe
   sendEquipe(grupo:Groupo){
    return this.af.collection("equipe").add({
      equipe:grupo.equipe
    })
  }
}
