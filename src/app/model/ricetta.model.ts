export class Ricetta {
    id: string;
    nome: String;
    constructor( i:string, n:string ){ 
        this.id = i;
        this.nome = n;
    }
    getId(){
        return this.id;
    }
    getNome(){
        return this.nome;
    }
}