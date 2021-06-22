import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Plugins } from '@capacitor/core';

import firebase from 'firebase';

const { Storage } = Plugins;

const CART_STORAGE_KEY = 'MY_CART';

@Injectable({
    providedIn: 'root'
})

export class RicettaService {
    
    ricetteCollection: AngularFirestoreCollection;
    cart = new BehaviorSubject({});
    cartKey = "eii3tv4aASj2bV2N1F8l";

    constructor( private afs: AngularFirestore ){
        this.ricetteCollection = this.afs.collection('ricetta');
    }

    getRicette(){
       return this.ricetteCollection.valueChanges( { idField: 'myID' } );
    }

    addToCarrello( ingrediente, utente ){
        let token = Math.random();
        this.afs.collection('cart').doc(`${token}`).set({
            ingrediente: ingrediente,
            utente: utente,
            id: token
        });
    }

    removeFromCarrello(){

    }

    switchFromCart(){
        this.afs.collection('cart').valueChanges().subscribe( result => {
            for( let row of result ){
                this.afs.collection('carrello').add({
                    ingrediente: row['ingrediente'],
                    utente: row['utente'],
                });
            }
        });
    }
    deleteFromCart(){
        this.afs.collection('cart').valueChanges().subscribe( result => {
            for( let row of result ){
                this.afs.collection('cart').doc(`${row['id']}`).delete();
            }
        });       
    }

}

/*

       this.afs.collection('carrello').doc(this.cartKey).update({
            nome: "plof"
        });

        this.afs.collection('carrello').add({
            ingrediente: ingrediente,
            utente: utente
        });











*/