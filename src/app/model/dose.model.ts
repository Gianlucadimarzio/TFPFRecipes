import { Ricetta } from 'src/app/model/ricetta.model';
import { Ingrediente } from './ingrediente.model';


export Class Dose(){

  ricetta: Ricetta;
  ingrediente: Ingrediente;
  quantita: number;

  constructor( r: Ricetta, i: Ingrediente, q: number ){
    this.ricetta = r;
    this.ingrediente = i;
    this.quantita = q;
  }


}
