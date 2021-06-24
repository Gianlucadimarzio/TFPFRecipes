import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { RicettaService } from 'src/app/services/ricetta.service';
import { Utente } from 'src/app/model/utente.model';
import { AuthService } from 'src/app/services/auth.service';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { UtenteService } from 'src/app/services/utente.service';

@Component({
  selector: 'app-ricetta',
  templateUrl: './ricetta.page.html',
  styleUrls: ['./ricetta.page.scss'],
})

export class RicettaPage implements OnInit{

  utente: Utente;
  id: any;
  flagRicettario: Array<any>;
  flagAllIngredienti: Array<any>;
  ingredienti: Array<any>;
  ricetta: Array<any>;


  constructor( private utenteService: UtenteService, private ingredienteService: IngredienteService , private authService: AuthService, private ricettaService: RicettaService, private router:Router, private activatedRoute: ActivatedRoute, private database : AngularFirestore, public toastController: ToastController ) {

  }


  ngOnInit() {
    this.utente = new Utente( this.authService, this.database );
    this.id = this.activatedRoute.snapshot.paramMap.get('xyz');
    this.ingredienti = this.ingredienteService.listaIngredientiRicetta( this.id, this.utente );
    this.ricetta = this.ricettaService.getRicetta( this.id );
    this.flagRicettario = this.utenteService.getFlagRicettario( this.utente, this.id );
    this.flagAllIngredienti = this.utenteService.getFlagAllIngredienti( this.utente, this.id );

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

  
  async addPref() {
    this.ricettaService.addRicettaToRicettario( this.id, this.utente );
    const toast = await this.toastController.create({
    message: 'Ricetta aggiunta al ricettario!',
      duration: 500,
      position: "bottom",
      mode: "md",
      cssClass: "toast"
    });
    toast.present();
  }
  
  async addCartSingle( idIngrediente: string ) { 

    this.ingredienteService.addIngredienteToCarrello( idIngrediente, this.utente );
    //this.ingredienti = this.ingredienteService.listaIngredientiRicetta( this.id, this.utente );
    //this.flagAllIngredienti = this.utenteService.getFlagAllIngredienti( this.utente, this.id );
    const toast = await this.toastController.create({
      message: 'Ingrediente aggiunto alla lista della spesa!',
      duration: 500,
      position: "bottom",
      mode: "md",
      cssClass: "toast"
    });
    toast.present();
  }

  async addCart() {  
    this.ingredienteService.addAllIngredientiToCarrello( this.id, this.utente );
    //this.ingredienti = this.ingredienteService.listaIngredientiRicetta( this.id, this.utente );
    //this.flagAllIngredienti = this.utenteService.getFlagAllIngredienti( this.utente, this.id );

    const toast = await this.toastController.create({
      message: 'Ingredienti aggiunti alla lista della spesa!',
      duration: 500,
      position: "bottom",
      mode: "md",
      cssClass: "toast"
    });
    toast.present();
  }

  doRefresh(event) {
    setTimeout( () => { 
      this.ingredienti = this.ingredienteService.listaIngredientiRicetta( this.id, this.utente );
      this.flagRicettario = this.utenteService.getFlagRicettario( this.utente, this.id );
      this.flagAllIngredienti = this.utenteService.getFlagAllIngredienti( this.utente, this.id );
      event.target.complete(); 
    }, 250 );
  }

}
