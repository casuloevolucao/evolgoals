import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { Observable, observable } from 'rxjs';
import { Respostas } from '../models/respostas.model';

@Injectable({
  providedIn: 'root'
})
export class RespostaService {

  constructor(
    private af:AngularFirestore,
    private afa:AngularFireAuth,
    private afs:AngularFireStorage,
    private router:Router
  ) { }

  getListUsers(current:Usuario){
    return this.af.collection('usuarios').doc(current.uid).collection('pares').valueChanges()
  }

  sendResposta(current:Usuario, respostas:Respostas){
    return new Observable(
      (observable)=>{
        this.af.collection("usuarios").doc(current.uid).update({
          whatsapp:current.whatsapp,
          facebook:current.facebook,
          instagram:current.instagram,
          descricao:current.descricao,
          idade: current.idade,
          respondido: 1
        })
        .then(()=>{
          this.af.collection("respostas").doc(current.uid).set({
            res1:respostas.res1,
            res2:respostas.res2,
            res3:respostas.res3,
            res4:respostas.res4,
            res5:respostas.res5,
            res6:respostas.res6,
            res7:respostas.res7,
            res8:respostas.res8,
            res9:respostas.res9,
            res10:respostas.res10,
          }).then(()=>{
            observable.next("salvo com sucesso")
          })  
        })
        .catch(()=>{
          observable.error("não foi possivel Cadastrar")
        })  
      }
    );
  }

  createListPares(){
    
  }
}
