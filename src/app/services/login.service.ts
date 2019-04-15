import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { Usuario } from '../models/usuario.model';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  tokenId:string

  constructor(
    private af:AngularFirestore,
    private afa:AngularFireAuth,
    private afs:AngularFireStorage,
    private router:Router
  ) { }

  //metodo de login
  async login(usuario:Usuario){
    return this.afa.auth.signInWithEmailAndPassword(usuario.email, usuario.senha).then(()=>{
      this.salveToken()
    })
  }

  //metodo do login facebook
  async loginFacebook(){
    return this.afa.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(()=>{
      this.salveToken()
    })
  }

  //metodo do login facebook
  async loginGoogle(){
    return this.afa.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(()=>{
      this.salveToken()
    })
  }

  //metodo criar usuario
  async createUser(usuario:Usuario){
    return this.afa.auth.createUserWithEmailAndPassword(usuario.email, usuario.senha).then((user)=>{
     this.af.collection('usuarios').doc(user.user.uid).set({
        uid: user.user.uid,
        foto: '',
        email: usuario.email,
        nome: usuario.nome,
        dtCadastro: new Date(),
     })
   })
  }   

  //metodo que edita usuario
  async editUser(usuario:Usuario, antigoUser:Usuario){
    return new Promise((resolve, reject)=>{
      this.afa.authState.subscribe((user)=>{
        user.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(user.email, antigoUser.senha))
          .then(()=>{
            user.updateEmail(usuario.email)
              .then(()=>{
                user.updatePassword(usuario.senha)
                this.af.collection("usuarios").doc(user.uid).update({
                  foto: '',
                  email: usuario.email,
                  nome: usuario.nome,
                })
                resolve(user)
              })
          })
          .catch((e)=>{
            reject(e)
          })
      })
    })
  }

  //resetar senha
  async resetPassword(usuario:Usuario){
    return this.afa.auth.sendPasswordResetEmail(usuario.email)
  }

  //pegar usuario logado
  async currentUser(){
    return new Promise((resolve, reject)=>{
      this.afa.authState.subscribe(
        user=>{
        this.af.collection('usuarios').doc(user.uid).valueChanges().subscribe((data)=>{
          resolve(data)
        })
        error=>{
          reject(error)
        }
      })
    })
  }

  //metodo de logout
  async logout(){
    return this.afa.auth.signOut()
  }

  //metodo que valida autenticação
  autenticarLogin():boolean{
    if(this.tokenId == undefined && localStorage.getItem('tokenId')){
      this.tokenId = localStorage.getItem('tokenId')
    }
    if(this.tokenId == undefined){
      this.router.navigate(["/"])
    }
    return this.tokenId !== undefined
  }

  //metodo que salva token
  salveToken(){
    this.afa.authState.subscribe((user)=>{
      user.getIdToken().then((token)=>{
        this.tokenId = token
        localStorage.setItem('tokenId', token)
        this.router.navigate(['/admin'])
      })
    })
  }

}
