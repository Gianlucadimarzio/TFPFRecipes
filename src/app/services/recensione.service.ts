import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { TokenService } from 'src/app/services/token.service';
import {NgForm} from '@angular/forms';
import { Utente } from 'src/app/model/utente.model';




@Injectable({
    providedIn: 'root'
})

export class RecensioneService {


    constructor(  private tokenService: TokenService, private database: AngularFirestore ){
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

    addRecensione( form: NgForm, idRicetta: string, utente: Utente ){
      var token = this.tokenService.generateToken();
      this.database.collection('recensione').doc(`${token}`).set({
        id: token,
        utente: utente.getId(),
        ricetta: idRicetta,
        titolo: form.value['titolo'],
        descrizione: form.value['testo']
      });
    }

    getRecensioniByUtente( utente: Utente ){
      var lista = new Array();
      this.database.collection('recensione').get().subscribe( resultRecensioni =>{
        resultRecensioni.forEach( rowRecensione => {
          if( rowRecensione.data()['utente'] == utente.getId() ){
            this.database.collection('ricetta').get().subscribe( resultRicette => {
              resultRicette.forEach( rowRicetta => {
                if( rowRicetta.data()['id'] == rowRecensione.data()['ricetta'] ){
                  lista.push( { id: rowRecensione.data()['id'], titolo: rowRecensione.data()['titolo'], testo: rowRecensione.data()['descrizione'], idRicetta: rowRecensione.data()['ricetta'], immagine: rowRicetta.data()['immagine'] } );
                }
              });
            });
          }
        });
      });
      return lista;
    }

    deleteRecensione( idRecensione: string ){
      this.database.collection('recensione').doc(`${idRecensione}`).delete();
    }



}
