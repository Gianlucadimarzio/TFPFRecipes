import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Utente } from 'src/app/model/utente.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { UtenteService } from 'src/app/services/utente.service';



@Component({
  selector: 'app-dati-personali',
  templateUrl: './dati-personali.page.html',
  styleUrls: ['./dati-personali.page.scss'],
})
export class DatiPersonaliPage implements OnInit {

  utente: Utente;
  user: Array<any>;

  constructor( private utenteService: UtenteService, private database : AngularFirestore, private authService: AuthService, private router: Router ) { }

  ngOnInit() {
    this.utente = new Utente( this.authService, this.database );
    this.user = this.utenteService.getUtenteData( this.utente );
  }
  routerHome(){
    this.router.navigate(['tabs/tabs/home']);
  }
  routerRicerca(){
    this.router.navigate(['tabs/tabs/recipes']);
  }
  routerCarrello(){
    this.router.navigate(['tabs/tabs/cart']);
  }
  routerProfilo(){
    this.router.navigate(['tabs/tabs/profile']);
  }
  routerAddRicetta(){
    this.router.navigate(['tabs/tabs/addRicetta']);
  }

}
