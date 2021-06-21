import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Ricetta } from '../model/ricetta.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class RicettaService {

  private ricette : Array<Ricetta> = new Array();
  

  constructor( private database : AngularFirestore ){
    this.database.collection('ricetta').valueChanges().subscribe( result => {
      for( let row of result ){
        (this.ricette).push( new Ricetta("1", row['nome']) );
      }
      
    });
    
  }

  getRicette(){
    return this.ricette;
  }



 
 

  
}
