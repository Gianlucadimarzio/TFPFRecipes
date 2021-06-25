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
        utente: utente.getId(),
        ricetta: idRicetta,
        titolo: form.value['titolo'],
        descrizione: form.value['testo']
      });
    }



}
