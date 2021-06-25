import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Utente } from "../model/utente.model";

@Injectable({
    providedIn: 'root'
})

export class UtenteService {


    constructor( private database: AngularFirestore ){
    }

    getFlagRicettario( utente: Utente, idRicetta: string ){
      var lista = new Array();
      lista.push( { value: false } );
      this.database.collection('ricettario').valueChanges().subscribe( result => {
          for( let row of result ){
            if( row['utente'] == utente.getId() && row['ricetta'] == idRicetta ){
              lista.pop();
              lista.push( { value: true } );
            }
          }
        });
    return lista;
    }

    getFlagAllIngredienti( utente: Utente, idRicetta: string ){
      var lista = new Array();
      var flag: boolean;
      lista.push({ value: true });
      this.database.collection('dose').get().subscribe( resultDose => {
        resultDose.forEach( rowDose => {
          if( rowDose.data()['ricetta'] == idRicetta ){
            this.database.collection('carrello').get().subscribe( resultCarrello => {
              flag = false;
              resultCarrello.forEach( rowCarrello => {
                if( rowCarrello.data()['utente'] == utente.getId() && rowCarrello.data()['ingrediente'] == rowDose.data()['ingrediente'] ){
                  flag = true;
                }
              });
              if( flag == false ){
                lista.pop();
                lista.push({ value: false });
              }
            });
          }
        });
      });
      return lista;
    }

    getUtenteData( utente: Utente ){
      var lista = new Array();
      this.database.collection('utente').doc(`${utente.getId()}`).get().subscribe( rowUtente =>{
        lista.push( { nome: rowUtente.data()['nome'], cognome: rowUtente.data()['cognome'], email:rowUtente.data()['email'] } );
      });
      return lista;
    }








}
