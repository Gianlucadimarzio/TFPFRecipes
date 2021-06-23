import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Utente } from 'src/app/model/utente.model';
import { AuthService } from 'src/app/services/auth.service';
import { IngredienteService } from 'src/app/services/ingredienteService.service';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.page.html',
  styleUrls: ['./carrello.page.scss'],
})
export class CarrelloPage implements OnInit {
  
  ingredienti: Array<any> = new Array();
  utente : Utente;

  constructor( private ingredientiService: IngredienteService, private database : AngularFirestore, private authService: AuthService ) {

  }

  ngOnInit() {
    this.utente = new Utente( this.authService, this.database );
    this.ingredienti = this.ingredientiService.listaIngredientiCarrello(this.utente);
  }

  deleteFromRicettario( id:number ){
    /*
    this.database.collection('ricettario').valueChanges().subscribe( result => {
      for( let row of result ){
        if( row['ricetta'] == id && row['utente'] == this.utente.getId() ){
          this.database.collection('ricettario').doc(`${row['id']}`).delete();
          break;
        }
      }
    });
    */

  }

  doRefresh(event) {
    setTimeout(() => {
      this.ingredienti = this.ingredientiService.listaIngredientiCarrello(this.utente);

      event.target.complete();
    }, 2000);
  }

}

