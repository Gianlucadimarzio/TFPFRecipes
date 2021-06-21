import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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

    var ricetta : Ricetta;

    this.database.collection('ricetta').valueChanges().subscribe( result => {
      for( let row of result ){
        ricetta = new Ricetta( "1", row['nome'] )
        if( ricetta.getId() == "1"){
          this.ricettaNome = ricetta.getNome();
          break;
        }
      }
    });


  /*
    SELECT * FROM RICETTA
    this.database.collection('ricetta').valueChanges().subscribe( result => {
      this.ricettaNome = result[0]['nome'];
    });
  */


  }


  ngOnInit() {
  }



}
