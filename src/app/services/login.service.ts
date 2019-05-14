import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { Usuario } from '../models/usuario.model';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Observable, observable } from 'rxjs';

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
        foto: null,
        email: usuario.email,
        nome: usuario.nome,
        tipoUsuario: 1,
        whatsapp: null,
        facebook: null,
        instagram: null,
        descricao: null,
        idade:null,
        respondido: 0,
        dtCadastro: new Date(),
     })
     this.router.navigate(["/login"])
   })
  }   

  //metodo que edita usuario
  async editUser(usuario:Usuario, senha:string){
    return new Promise((resolve, reject)=>{
      this.afa.authState.subscribe((user)=>{
        user.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(user.email, senha))
        .then(()=>{
          user.updateEmail(usuario.email)
            .then(()=>{
              user.updatePassword(usuario.senha)
              this.afs.ref(`users/${user.uid}`).put(usuario.foto).then((foto)=>{
                foto.ref.getDownloadURL().then((fotoUrl)=>{
                  this.af.collection("usuarios").doc(user.uid).update({
                    foto: fotoUrl,
                    email: usuario.email,
                    nome: usuario.nome,
                  })
                  resolve(user)
                })
              })
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
  currentUser(){
    return  new Observable((observable)=>{
      this.afa.authState.subscribe(
        user=>{
        this.af.collection('usuarios').doc(user.uid).valueChanges().subscribe((data:Usuario)=>{
          observable.next(data) 
        })
      })
    })
  }

  //metodo de logout
  async logout(){
    return this.afa.auth.signOut().then(()=>{
      localStorage.clear()
      this.router.navigate(['/'])
    })
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

  //tradução dos erros de login
  erroTratament(erro:firebase.FirebaseError):firebase.FirebaseError{
    if( erro.code == "auth/email-already-in-use" ){
      erro.message = "O endereço de e-mail já está sendo usado por outra conta."
    }else if(erro.code == "auth/invalid-email"){
      erro.message = "O endereço de e-mail está invalido"
    }else if(erro.code == "auth/wrong-password"){
      erro.message = "A senha é inválida ou o usuário é inválido."
    }else if (erro.code == "auth/user-not-found"){
      erro.message = "Não há registro do usuário. O usuário pode ter sido excluído."
    }else if (erro.code == "auth/user-disabled"){
      erro.message = "A conta do usuário foi desativada."
    }else if (erro.code = "auth/user-token-expired"){
      erro.message = "A credencial do usuário não é mais válida. O usuário deve entrar novamente."
    }else if (erro.code = "auth/argument-error"){
      erro.message = "reauthenticateWithPopup falhou: o primeiro argumento authProvider deve ser um provedor de Auth válido."
    }
    return erro
  }
}
