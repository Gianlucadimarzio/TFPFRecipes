import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Ricetta } from '../model/ricetta.model';
import firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})

export class RicettaService {

    

    constructor( private database: AngularFirestore ){
    
    }


    
}