import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Utente } from 'src/app/model/utente.model';
import { AuthService } from 'src/app/services/auth.service';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.page.html',
  styleUrls: ['./carrello.page.scss'],
})
export class CarrelloPage implements OnInit {

  ingredienti: Array<any> = new Array();
  utente : Utente;

  constructor( private router: Router, private ingredientiService: IngredienteService, private database : AngularFirestore, private authService: AuthService ) {

  }

  ngOnInit() {
    this.utente = new Utente( this.authService, this.database );
    this.ingredienti = this.ingredientiService.getIngredientiFromCarrello( this.utente );
  }

  deleteFromCarrello( id:string ){
    this.ingredientiService.deleteIngredienreFromCarrello( id, this.utente );
  }

  doRefresh(event) {
    setTimeout( () => {
      this.ingredienti = this.ingredientiService.getIngredientiFromCarrello( this.utente );
      event.target.complete();
    }, 250 );
  }
  routerHome(){
    this.router.navigate(['tabs/tabs/home']);
  }
  routerRicerca(){
    this.router.navigate(['tabs/tabs/recipes']);
  }
  routerProfilo(){
    this.router.navigate(['tabs/tabs/profile']);
  }
  routerAddRicetta(){
    this.router.navigate(['tabs/tabs/addRicetta']);
  }

}
