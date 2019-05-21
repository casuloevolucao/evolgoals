export class Groupo{
    constructor(init?: Partial<Groupo>) {
        Object.assign(this, init);
    }
    equipe:Equipe[]
}
class Equipe {
    constructor(init?: Partial<Equipe>) {
        Object.assign(this, init);
    }
    nome:string
    descricao:string
    foto: File | string
    facebook:string
    instagram:string
    github:string
    linkedin:String
}