import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
    providedIn: 'root'
})

export class RecensioneService {


    constructor(  private database: AngularFirestore ){
    }

    getRecensioniRicetta( ricetta: string ){
        var lista = new Array();
        this.database.collection('recensione').get().subscribe( resultRecensioni => {
            resultRecensioni.forEach( rowRecensione => {
                if( rowRecensione.data()['ricetta'] == ricetta ){
                    this.database.collection('utente').get().subscribe( resultUtente => {
                        resultUtente.forEach( rowUtente => {
                            if( rowUtente.data()['id'] == rowRecensione.data()['utente'] ){
                                lista.push({ titolo: rowRecensione.data()['titolo'], descrizione: rowRecensione.data()['descrizione'], nome: rowUtente.data()['nome'], cognome: rowUtente.data()['cognome'] });
                            }
                        });
                    });
                }
            });
        });
        return lista;
    }
    


}