import { Utente } from './utente.model';
import { Ingrediente } from './ingrediente.model';

export class Ricetta {

    id: string;
    nome: string;
    difficolta: string;
    immagine: string;
    procedimento: string;
    tempo: number;
    categoria: string;

    utente: Utente;
    ingredienti: Array<Ingrediente>;

    constructor( i:string, n:string, di:string, im:string, p:string, t:number, c:string ){
        this.id = i;
        this.nome = n;
        if( di == "1") this.difficolta = "Facile";
        if( di == "2") this.difficolta = "Media";
        if( di == "3") this.difficolta = "Difficile";
        this.immagine = im;
        this.procedimento = p;
        this.tempo = +t;
        this.categoria = c;
    }
    getId(){
        return this.id;
    }
    getNome(){
        return this.nome;
    }
    getDifficolta(){
        return this.difficolta;
    }
    getImmagine(){
        return this.immagine;
    }
    getProcedimento(){
        return this.procedimento;
    }
    getTempo(){
        return this.tempo;
    }
    getCategoria(){
        return this.categoria;
    }
}
