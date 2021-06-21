import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { RicettaService } from 'src/app/services/ricetta.service';
import { Ricetta } from 'src/app/model/ricetta.model';

@Component({
  selector: 'app-ricetta',
  templateUrl: './ricetta.page.html',
  styleUrls: ['./ricetta.page.scss'],
})
export class RicettaPage implements OnInit {

  ricettaNome: any;
  ricettaProcedimento: any = "test";
  ricettaDescrizione: any = "test";
  ricettaTempo: any = "test";
  ricettaImmagine: any = "test";
  ricettaDifficolta: any = "test";

  constructor(private database : AngularFirestore) {

    var service: RicettaService = new RicettaService( database );
    console.log( service.getRicette() );
  /*
    SELECT * FROM RICETTA
    this.database.collection('ricetta').valueChanges().subscribe( result => {
      this.ricettaNome = result[0]['nome'];
    });
  */

  /*
    SELECT * FROM RICETTA WHERE ID = gwuW7I3chGPgMZmoE66h
    this.database.doc('ricetta/gwuW7I3chGPgMZmoE66h').valueChanges().subscribe( result => {
      this.ricettaNome = result['nome'];
    });
  */

  }


  ngOnInit() {
  }



}
