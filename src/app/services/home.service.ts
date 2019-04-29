import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

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
}
