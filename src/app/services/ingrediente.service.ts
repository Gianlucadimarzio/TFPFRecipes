import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Utente } from "../model/utente.model";
import { TokenService } from "./token.service";

@Injectable({
    providedIn: 'root'
})

export class IngredienteService {


    constructor( private tokenService: TokenService, private database: AngularFirestore ){
    }

    listaIngredientiRicetta( ricetta: string, utente: Utente ){
        var lista = new Array();
        this.database.collection('dose').get().subscribe( resultDose => {
            resultDose.forEach( rowDose => {
                this.database.collection('ingrediente').get().subscribe( resultIngrediente => {
                    resultIngrediente.forEach( rowIngrediente => {
                        if( rowDose.data()['ricetta'] == ricetta ){
                            if( rowIngrediente.data()['id'] == rowDose.data()['ingrediente'] ){
                                this.database.collection('carrello').get().subscribe( resultCarrello => {
                                    var flag: boolean = false;
                                    resultCarrello.forEach( rowCarrello => { 
                                        if( rowCarrello.data()['utente'] == utente.getId() && rowCarrello.data()['ingrediente'] == rowIngrediente.data()['id'] ){
                                            flag = true;
                                        }
                                    });
                                    lista.push( { nome: rowIngrediente.data()['nome'], id: rowIngrediente.data()['id'], dose: rowDose.data()['quantita'], flag: flag  });   
                                });

                            }                           
                        }
                    });
                });
            });
        });
        return lista;
    }

    addAllIngredientiToCarrello( idRicetta: string, utente: Utente ){
        this.database.collection('dose').get().subscribe( resultDose => {
            resultDose.forEach( rowDose => {
                if( rowDose.data()['ricetta'] == idRicetta ){
                    var flag: boolean = false;
                    this.database.collection('carrello').get().subscribe( resultCarrello => {                       
                        resultCarrello.forEach( rowCarrello => {                            
                            if( rowCarrello.data()['utente'] == utente.getId() && rowCarrello.data()['ingrediente'] == rowDose.data()['ingrediente'] ){
                                flag = true;
                            }                            
                        });
                        if( flag == false ){
                            var token = this.tokenService.generateToken();
                            this.database.collection('carrello').doc(`${token}`).set({
                              ingrediente: rowDose.data()['ingrediente'],
                              utente: utente.getId(),
                              id: token 
                            });
                        }
                    }); 
                }
            });
        });
    }

    addIngredienteToCarrello( idIngrediente: string, utente: Utente ){
        this.database.collection('dose').get().subscribe( resultDose => {
            var flag: boolean = false;
            this.database.collection('carrello').get().subscribe( resultCarrello => {                       
                resultCarrello.forEach( rowCarrello => {                            
                    if( rowCarrello.data()['utente'] == utente.getId() && rowCarrello.data()['ingrediente'] == idIngrediente ){
                        flag = true;
                    }                            
                });
                if( flag == false ){
                    var token = this.tokenService.generateToken();
                    this.database.collection('carrello').doc(`${token}`).set({
                        ingrediente: idIngrediente,
                        utente: utente.getId(),
                        id: token 
                    });
                }
            }); 
        });
    }

    getIngredientiFromCarrello( utente: Utente ){
        var lista = new Array();
        this.database.collection('carrello').get().subscribe( resultCarrello => {
            resultCarrello.forEach( rowCarrello => {
                if( rowCarrello.data()['utente'] == utente.getId() ){
                    this.database.collection('ingrediente').get().subscribe( resultIngrediente => {
                        resultIngrediente.forEach( rowIngrediente => {
                            if( rowIngrediente.data()['id'] == rowCarrello.data()['ingrediente'] ){
                                lista.push( { id: rowIngrediente.data()['id'], nome: rowIngrediente.data()['nome'] } );
                            }
                        });
                    });
                }
            });
        });
        return lista;
    }

    deleteIngredienreFromCarrello( idIngrediente: string, utente: Utente ){
        this.database.collection('carrello').get().subscribe( resultCarrello => {
            resultCarrello.forEach( rowCarrello => {
                if( rowCarrello.data()['utente'] == utente.getId() && rowCarrello.data()['ingrediente'] == idIngrediente ){
                    this.database.collection('carrello').doc(`${rowCarrello['id']}`).delete();
                }
            });
        });
    }




    


}