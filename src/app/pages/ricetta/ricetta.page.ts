import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Ricetta } from 'src/app/model/ricetta.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ToastController } from '@ionic/angular';
import { RicettaService } from 'src/app/services/ricetta.service';
import { Utente } from 'src/app/model/utente.model';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { IngredienteService } from 'src/app/services/ingredienteService.service';



@Component({
  selector: 'app-ricetta',
  templateUrl: './ricetta.page.html',
  styleUrls: ['./ricetta.page.scss'],
})
export class RicettaPage implements OnInit{

  utente: Utente;
  id: any;
  nomeRicetta: any;
  descrizioneRicetta: any;
  tempoRicetta: any;
  difficoltaRicetta: any;
  categoriaRicetta: any;
  immagineRicetta: any;

  flagRicettario: boolean = false;


  ingredienti: Array<any>;


  constructor( private ingredienteService: IngredienteService , private authService: AuthService, private ricettaService: RicettaService, private router:Router, private activatedRoute: ActivatedRoute, private database : AngularFirestore, public toastController: ToastController ) {

  }


  ngOnInit() {
    this.utente = new Utente( this.authService, this.database );
    this.id = this.activatedRoute.snapshot.paramMap.get('xyz');
    this.ingredienti = this.ingredienteService.listaIngredientiRicetta(this.id);

    var ricetta: Ricetta;
    this.database.collection('ricetta').valueChanges().subscribe( resultRicetta => {
      for( let rowRicetta of resultRicetta ){
        ricetta = new Ricetta( rowRicetta['id'], rowRicetta['nome'],rowRicetta['descrizione'],rowRicetta['difficolta'],rowRicetta['immagine'],rowRicetta['procedimento'],rowRicetta['tempo'] );
        if( ricetta.getId() == this.id){
          this.database.collection('categoria').valueChanges().subscribe( resultCategoria => {
            this.nomeRicetta = ricetta.getNome();
            this.descrizioneRicetta = ricetta.getDescrizione();
            this.immagineRicetta = ricetta.getImmagine();
            this.tempoRicetta = ricetta.getTempo();
            if(ricetta.getDifficolta() == "1") this.difficoltaRicetta = " Facile";
            if(ricetta.getDifficolta() == "2") this.difficoltaRicetta = " Media";
            if(ricetta.getDifficolta() == "3") this.difficoltaRicetta = " Difficile";
            for( let rowCategoria of resultCategoria ){
              if( rowRicetta['categoria'] == rowCategoria['id'] ){
                ricetta.setCategoria( rowCategoria['nome'] );;
                this.categoriaRicetta = ricetta.getCategoria();
                break;
              }

            }
          });
          break;
        }
      }
    });    

    this.database.collection('ricettario').valueChanges().subscribe( result => {
      for( let row of result ){
        if( row['utente'] == this.utente.getId() && row['ricetta'] == this.id ){
          this.flagRicettario = true;
        }
      }
    });

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
    let token:number = Math.random();
    this.database.collection('ricettario').doc(`${token}`).set({
      utente: this.utente.getId(),
      ricetta: this.id,
      id: token,
      valido: 1
    });

    const toast = await this.toastController.create({
    message: 'Ricetta aggiunta al ricettario!',
      duration: 500,
      position: "bottom",
      mode: "md",
      cssClass: "toast"
    });
    toast.present();
  }
  
  async addCart() {  
    let token: number;
    this.database.collection('dose').valueChanges().subscribe( resultDose => {
      for( let rowDose of resultDose ){
        if( rowDose['ricetta'] == this.id ){
          token = Math.random();
          this.database.collection('carrello').doc(`${token}`).set({
            ingrediente: rowDose['ingrediente'],
            utente: this.utente.getId(),
            id: token
          });
        }
      }
    });
    this.database.collection('carrello').valueChanges().subscribe( result => {
      for( let row of result ){
        var c: number = 0;
       for( let cRow of result ){
        if( cRow['utente'] == row['utente'] && cRow['ingrediente'] == row['ingrediente']  ){
          c++;
        }
        if(c > 1){
          this.database.collection('carrello').doc(`${cRow['id']}`).delete();
          break;
          
        }
       }
      }
    });
 

    const toast = await this.toastController.create({
      message: 'Ingredienti aggiunti alla lista della spesa!',
      duration: 500,
      position: "bottom",
      mode: "md",
      cssClass: "toast"
    });
    toast.present();
  }

}
