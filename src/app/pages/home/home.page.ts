import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Ricetta } from 'src/app/model/ricetta.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nomeRicetta : any;

  constructor( private database : AngularFirestore) {
    var ricetta : Ricetta;

    this.nomeRicetta = new Array();
    
    this.database.collection('ricetta').valueChanges().subscribe( result => {
      for( let row of result ){
        ricetta = new Ricetta( "1", row['nome'] );
        this.nomeRicetta.push( ricetta.getNome() );
      }
    });

  }


  slidesOptions = {
    slidesPerView: 2.5
  }

}
