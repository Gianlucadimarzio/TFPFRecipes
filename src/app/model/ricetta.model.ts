export class Ricetta {

    id: string;
    nome: string;
    descrizione: string;
    difficolta: string;
    immagine: string;
    procedimento: string;
    tempo: string;
    categoria: string;

    constructor( i:string, n:string, d:string, di:string, im:string, p:string, t:string ){ 
        this.id = i;
        this.nome = n;
        this.descrizione = d;
        this.difficolta = di;
        this.immagine = im;
        this.procedimento = p;
        this.tempo = t;
        this.categoria = "Non Specificata"
    }
    getId(){
        return this.id;
    }
    getNome(){
        return this.nome;
    }
    getDescrizione(){
        return this.descrizione;
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
    setCategoria( c:string ){
        this.categoria = c;
    }
}