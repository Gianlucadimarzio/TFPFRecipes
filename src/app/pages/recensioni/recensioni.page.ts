import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Utente } from 'src/app/model/utente.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { RecensioneService } from 'src/app/services/recensione.service';


@Component({
  selector: 'app-recensioni',
  templateUrl: './recensioni.page.html',
  styleUrls: ['./recensioni.page.scss'],
})
export class RecensioniPage implements OnInit {

  utente: Utente;
  recensioni: Array<any>;

  constructor( private recensioneService: RecensioneService, private database : AngularFirestore, private authService: AuthService, private router: Router ) { }

  ngOnInit() {
    this.utente = new Utente( this.authService, this.database );
    this.recensioni = this.recensioneService.getRecensioniByUtente( this.utente );
  }

  showRicetta( id: string ){
    this.router.navigate([`ricetta/${id}`]);
  }

  deleteFromRecensione( idRecensione: string ){
    this.recensioneService.deleteRecensione( idRecensione );
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

  doRefresh(event) {
    setTimeout( () => {
      this.recensioni = this.recensioneService.getRecensioniByUtente( this.utente );
      event.target.complete();
    }, 250 );
  }

}
