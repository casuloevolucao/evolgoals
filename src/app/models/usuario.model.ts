export class Usuario {
    
    constructor(init?: Partial<Usuario>) {
        Object.assign(this, init);
    }

    email:string
    senha:string
    foto: File | string
    nome:string
    dtCadastro:Date
    tipoUsuario:number
    uid:string
    whatsapp:number
    twitter:string
    facebook:string
    instagram:string
    descricao:string
}
