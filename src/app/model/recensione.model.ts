import { Utente } from './utente.model';

export class Recensione{

  id: string;
  utente: Utente;
  titolo: string;
  descrizione: string;

  constructor( i:string, u: Utente, t:string, d:string ){
    this.id = i;
    this.utente = u;
    this.titolo = t;
    this.descrizione = d;
  }


}
