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
    console.log(current)
    console.log(respostas)
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

  async createListPares(){
    let listaUsuario:Usuario[] = new Array<Usuario>()
    await this.af.collection("usuarios", ref => ref.where('tipoUsuario','==', 1)).valueChanges().subscribe((listaUsuario:Usuario[])=>{
    let contresposta = 0
    let usuarioTemp:Usuario = new Usuario()    
    let respostaTemp:Respostas = new Respostas()
    let paresTemp:Usuario[] = new Array<Usuario>()
    for(let i=0; i < listaUsuario.length; i++){
      this.getRespostas(listaUsuario[i]).subscribe((rs:Respostas)=>{
        respostaTemp = rs
      })
      usuarioTemp = listaUsuario[i]
      if(paresTemp.length < 5){
        listaUsuario.forEach((value)=>{
          if(usuarioTemp.uid != value.uid){
            this.getRespostas(value).subscribe((respOutro:Respostas)=>{
              if(respostaTemp.res1 == respOutro.res1){
                contresposta ++
              }else if(respostaTemp.res1 == respOutro.res1){
                contresposta ++
              }
              else if(respostaTemp.res2 == respOutro.res2){
                contresposta ++
              }
              else if(respostaTemp.res3 == respOutro.res3){
                contresposta ++
              }
              else if(respostaTemp.res4 == respOutro.res4){
                contresposta ++
              }
              else if(respostaTemp.res5 == respOutro.res5){
                contresposta ++
              }
              else if(respostaTemp.res6 == respOutro.res6){
                contresposta ++
              }
              else if(respostaTemp.res7 == respOutro.res7){
                contresposta ++
              }
              else if(respostaTemp.res8 == respOutro.res8){
                contresposta ++
              }
              else if(respostaTemp.res9 == respOutro.res9){
                contresposta ++
              } else if(respostaTemp.res10 == respOutro.res10){
                contresposta ++
              }
            })
            if(contresposta > 5){
              paresTemp.push(value)
            }else{
              this.notFoud(usuarioTemp)
            }
          }
        })
      }else{
        this.addPares(paresTemp, usuarioTemp)
      }
    }
    })
    console.log(listaUsuario)
    
  }

  getRespostas(usuario:Usuario){
    return this.af.collection('respostas').doc(usuario.uid).valueChanges()
  }

  addPares(lista:Usuario[], current:Usuario){
    lista.forEach((value)=>{
      this.af.collection("usuarios").doc(current.uid).collection("pares").add({
        uid: value.uid,
        foto: value.foto,
        email: value.email,
        nome: value.nome,
        whatsapp: value.whatsapp,
        facebook: value.facebook,
        instagram: value.instagram,
        descricao: value.descricao,
        idade: value.idade,
      })
    })
    this.af.collection("usuarios").doc(current.uid).update({
      respondido:3
    })
  }

  notFoud(current:Usuario){
    this.af.collection("usuarios").doc(current.uid).update({
      respondido:2
    })
  }
}
