import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Utente } from 'src/app/model/utente.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { RicettaService } from 'src/app/services/ricetta.service';


@Component({
  selector: 'app-ricettario',
  templateUrl: './ricettario.page.html',
  styleUrls: ['./ricettario.page.scss'],
})
export class RicettarioPage implements OnInit {

  ricette: Array<any>;
  utente: Utente;

  constructor( private ricettaService: RicettaService, private database : AngularFirestore, private authService: AuthService, private router: Router ) { }

  ngOnInit() {
    this.utente = new Utente( this.authService, this.database );
    this.ricette = this.ricettaService.getRicettario( this.utente );
  }
  showRicetta( id: string ){
    this.router.navigate([`ricetta/${id}`]);
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
  removeFromRicettario( id:string ){
    this.ricettaService.removeFromRicettario( id, this.utente );
  }
  doRefresh(event) {
    setTimeout( () => {
      this.ricette = this.ricettaService.getRicettario( this.utente );
      event.target.complete();
    }, 250 );
  }
}
