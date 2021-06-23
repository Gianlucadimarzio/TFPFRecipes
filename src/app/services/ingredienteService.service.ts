import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Utente } from "../model/utente.model";

@Injectable({
    providedIn: 'root'
})

export class IngredienteService {


    constructor( private database: AngularFirestore ){

    }

    listaIngredientiRicetta( ricetta: string ){
        var lista: Array<any> = new Array();
        this.database.collection('dose').valueChanges().subscribe( resultDose => {
            this.database.collection('ingrediente').valueChanges().subscribe( resultIngrediente => {
                for( let rowDose of resultDose ){
                    if( rowDose['ricetta'] == ricetta ){
                        for( let rowIngrediente of resultIngrediente ){
                            if( rowIngrediente['id'] == rowDose['ingrediente'] ){
                                lista.push( { nome: rowIngrediente['nome'], id: rowIngrediente['id'], dose: rowDose['quantita'] });

                            }
                        }
                    }
                }
            });

        });
        return lista;
    }



    listaIngredientiCarrello( utente: Utente ){
        var lista = new Array();
        this.database.collection('ricettario').get().subscribe( result=>{
            result.forEach( row => {
                if( row.data()['utente'] == utente.getId() )
                lista.push( { nome: row.data()['ricetta'] } );
            });
        });
        return lista;
    }

    


}