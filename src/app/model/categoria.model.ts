export class Categoria {

    id: string;
    nome: string;
    immagine: string;

    constructor( i:string, n:string, im:string ){ 
        this.id = i;
        this.nome = n;
        this.immagine = im;

    }
    getId(){
        return this.id;
    }
    getNome(){
        return this.nome;
    }
    getImmagine(){
        return this.immagine;
    }

}