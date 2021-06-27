import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { CategoriaService } from 'src/app/services/categoria.service';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { RicettaService } from 'src/app/services/ricetta.service';
import { Utente } from 'src/app/model/utente.model';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';



@Component({
  selector: 'app-add-ricetta',
  templateUrl: './add-ricetta.page.html',
  styleUrls: ['./add-ricetta.page.scss'],
})
export class AddRicettaPage implements OnInit {

  utente: Utente;
  categorie : Array<any>;
  ingredienti : Array<any>;
  items : Array<any>;
  indice : number;
  indiceDose : number;





  constructor( private router:Router, private database : AngularFirestore, private authService: AuthService, private ricettaService: RicettaService, private ingredienteService: IngredienteService , private categoriaService: CategoriaService ) {
    this.items = new Array();
    this.indice = 0;
  }

  ngOnInit() {
    this.utente = new Utente( this.authService, this.database );
    this.categorie = this.categoriaService.getCategorie();
    this.ingredienti = this.ingredienteService.getIngredienti();
    this.items.push( { value: this.indice, valueDose: this.indice + 1000000 } );
    this.indice += 1;
  }

  addRicetta( form: NgForm ){
    this.ricettaService.addRicetta( form, this.indice, this.utente );

    this.items = new Array();
    this.indice = 0;
    this.items.push( { value: this.indice, valueDose: this.indice + 1000000 } );
    this.indice += 1;
    
    this.router.navigate(['tabs/tabs/home']);
  }
  addIngrediente(){
    this.items.push( { value: this.indice, valueDose: this.indice + 1000000 } );
    this.indice += 1;
  }
  delIngrediente(){
    if( this.indice > 1 ){
      this.items.pop();
      this.indice -= 1;
    }
  }


}
