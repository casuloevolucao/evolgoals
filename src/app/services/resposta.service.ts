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
    return new Observable((resolve)=>{
      this.af.collection("usuarios", ref => ref.where('tipoUsuario','==', 1).where('respondido','==', 1)).valueChanges().subscribe((lista:Usuario[])=>{
        let contadorResposta:number = 0
        let conatadorPares:number = 0
        for (let i = 0; i < lista.length; i++) {
          const usuarioTemp:Usuario = lista[i];
          this.getRespostas(usuarioTemp).then((respostaTemp1:Respostas)=>{
            const respostaUsuario:Respostas = respostaTemp1
            lista.forEach((value)=>{
              if(usuarioTemp.uid != value.uid){
                this.getRespostas(value).then((respostaTemp2:Respostas)=>{
                  const respostaOutra:Respostas = respostaTemp2
                  if(respostaUsuario.res1 == respostaOutra.res1){
                    contadorResposta++
                  }
                  if(respostaUsuario.res2 == respostaOutra.res2){
                    contadorResposta++
                  }
                  if(respostaUsuario.res3 == respostaOutra.res3){
                    contadorResposta++
                  }
                  if(respostaUsuario.res4 == respostaOutra.res4){
                    contadorResposta++
                  }
                  if(respostaUsuario.res5 == respostaOutra.res5){
                    contadorResposta++
                  }
                  if(respostaUsuario.res6 == respostaOutra.res6){
                    contadorResposta++
                  }
                  if(respostaUsuario.res7 == respostaOutra.res7){
                    contadorResposta++
                  }
                  if(respostaUsuario.res8 == respostaOutra.res8){
                    contadorResposta++
                  }
                  if(respostaUsuario.res9 == respostaOutra.res9){
                    contadorResposta++
                  }
                  if(respostaUsuario.res10 == respostaOutra.res10){
                    contadorResposta++
                  }
                  if(contadorResposta > 5){
                    if( conatadorPares < 6){
                      this.addPares(value, usuarioTemp).then(()=>{
                        conatadorPares++   
                        contadorResposta = 0
                        resolve.next(`O par para o usuário ${usuarioTemp.nome} foi ${value.nome}`)
                      })
                    }
                  }else{
                    this.notFoud(usuarioTemp).then(()=>{
                      contadorResposta = 0
                    })
                  }
                })
              }
            })
          })
        }
      })
    })
  }

  getRespostas(usuario:Usuario){
    return new Promise((resolve, reject)=>{
      return this.af.collection('respostas').doc(usuario.uid).valueChanges().subscribe((rs)=>{
        resolve(rs)
      })
    })
  }

  addPares(par:Usuario, current:Usuario){
    return new Promise((resolve, reject)=>{
      this.af.collection("usuarios").doc(current.uid).update({
        respondido:3
      }).then(()=>{
        this.af.collection("usuarios").doc(current.uid).collection("pares").doc(par.uid).set({
          uid: par.uid,
          foto: par.foto,
          email: par.email,
          nome: par.nome,
          whatsapp: par.whatsapp,
          facebook: par.facebook,
          instagram: par.instagram,
          descricao: par.descricao,
          idade: par.idade,
        }).then(()=>{
          resolve(par)
        })
      })
    })
  }

  notFoud(current:Usuario){
    return this.af.collection("usuarios").doc(current.uid).update({
      respondido:2
    })
  }

}
