import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Ricetta } from '../model/ricetta.model';
import { Utente } from '../model/utente.model';
import { TokenService } from './token.service';
import {NgForm} from '@angular/forms';


@Injectable({
    providedIn: 'root'
})

export class RicettaService {



    constructor( private tokenService: TokenService, private database: AngularFirestore ){

    }

    getRicettario( utente: Utente ){
        var lista = new Array();
        this.database.collection('ricettario').get().subscribe( result => {
            result.forEach( row => {
                if( row.data()['utente'] == utente.getId() )
                lista.push( { nome: row.data()['ricetta'] } );
            });
        });
        return lista;
    }

    getRicetta( id: string ){
        var lista = new Array(); var ricetta: Ricetta;
        this.database.collection('ricetta').get().subscribe( resultRicetta => {
            resultRicetta.forEach( rowRicetta => {
            if( rowRicetta.data()['id'] == id){
                ricetta = new Ricetta( rowRicetta.data()['id'], rowRicetta.data()['nome'],rowRicetta.data()['descrizione'],rowRicetta.data()['difficolta'],rowRicetta.data()['immagine'],rowRicetta.data()['procedimento'],rowRicetta.data()['tempo'], rowRicetta.data()['categoria'] );
                lista.push( { nome: ricetta.getNome(), immagine: ricetta.getImmagine(), descrizione: ricetta.getDescrizione(), difficolta : ricetta.getDifficolta(), tempo: ricetta.getTempo(), categoria: ricetta.getCategoria() } );
            }
          });
        });
        return lista;
    }

    getRicetteSlider(){
        var cont: number = 0; var lista = new Array();
        this.database.collection('ricetta').get().subscribe( resultRicettaSlider => {
            resultRicettaSlider.forEach( rowRicettaSlider =>{
                if( cont < 4 && rowRicettaSlider.data()['difficolta'] == "3" || rowRicettaSlider.data()['difficolta'] == "2"   ){
                    lista.push({ id:rowRicettaSlider.data()['id'], immagine: rowRicettaSlider.data()['immagine'], nome: rowRicettaSlider.data()['nome']  });
                    cont++;
                }
            })
        });
        return lista;
    }
    getRicetteFacili(){
        var cont: number = 0; var lista = new Array(); var ricetta: Ricetta;
        this.database.collection('ricetta').get().subscribe( resultRicettaFacile => {
            resultRicettaFacile.forEach( rowRicettaFacile =>{
                ricetta = new Ricetta( rowRicettaFacile.data()['id'], rowRicettaFacile.data()['nome'], rowRicettaFacile.data()['descrizione'], rowRicettaFacile.data()['difficolta'], rowRicettaFacile.data()['immagine'], rowRicettaFacile.data()['procedimento'], rowRicettaFacile.data()['tempo'], rowRicettaFacile.data()['categoria']);
                if( cont < 6 && ricetta.getDifficolta() == "Facile" ){
                    lista.push( { nome:ricetta.getNome(), immagine:ricetta.getImmagine(), categoria:ricetta.getCategoria(), id:ricetta.getId() }  );
                    cont++;
                }
            })
        });
        return lista;
    }
    getRicetteVeloci(){
        var cont: number = 0; var lista = new Array(); var ricetta: Ricetta;
        this.database.collection('ricetta').get().subscribe( resultRicettaVeloce => {
            resultRicettaVeloce.forEach( rowRicettaVeloce =>{
                ricetta = new Ricetta( rowRicettaVeloce.data()['id'], rowRicettaVeloce.data()['nome'], rowRicettaVeloce.data()['descrizione'], rowRicettaVeloce.data()['difficolta'], rowRicettaVeloce.data()['immagine'], rowRicettaVeloce.data()['procedimento'], rowRicettaVeloce.data()['tempo'], rowRicettaVeloce.data()['categoria']);
                if( cont < 6 && ricetta.getTempo() < 30 ){
                    lista.push( { nome:ricetta.getNome(), immagine:ricetta.getImmagine(), categoria:ricetta.getCategoria(), id:ricetta.getId() }  );
                    cont++;
                }
            })
        });
        return lista;
    }

    addRicettaToRicettario( idRicetta: string, utente: Utente ){
        let token = this.tokenService.generateToken();
        this.database.collection('ricettario').doc(`${token}`).set({
            utente: utente.getId(),
            ricetta: idRicetta,
            id: token
        });

    }
    addRicetta( form: NgForm, indice: number, utente: Utente ){
      console.log( form.value );
      var token = this.tokenService.generateToken();
      var categoria = form.value['categoria'];
      var descrizione = form.value['descrizione'];
      var difficolta = form.value['difficolta'];
      var immagine = form.value['immagine'];
      var nome = form.value['nome'];
      var durata = form.value['durata'];
      var procedimento = form.value['procedimento'];
      this.database.collection('ricetta').doc(`${token}`).set({
          id: token,
          utente: utente.getId(),
          immagine: immagine,
          nome: nome,
          categoria: categoria,
          descrizione: descrizione,
          procedimento: procedimento,
          tempo: durata,
          difficolta: difficolta
      });
      for( let i = 0; i < indice; i++ ){
        var tokenIngrediente = this.tokenService.generateToken();
        this.database.collection('dose').doc(`${tokenIngrediente}`).set({
            ricetta: token,
            quantita: form.value[i + 1000000],
            ingrediente: form.value[i]
        });
      }

    }





}
