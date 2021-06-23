import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/model/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-ricerca-ricette',
  templateUrl: './ricerca-ricette.page.html',
  styleUrls: ['./ricerca-ricette.page.scss'],
})
export class RicercaRicettePage implements OnInit {


  id: any;
  nomeCategoria: any;
  immagineCategoria: any;
  categorie: any;

  constructor( private database : AngularFirestore, private categoriaService: CategoriaService, private route: Router) {
    var categoria: Categoria;
    this.categorie = new Array();

    
    this.database.collection('categoria').valueChanges().subscribe( result => {
      for( let row of result ){
        categoria = new Categoria( row['id'], row['nome'], row['immagine'] );
        this.categorie.push( { nome:categoria.getNome(), immagine:categoria.getImmagine(), id:categoria.getId() }  );
      }
    });
  }

  ngOnInit() {
  }

  homePage(){
    this.route.navigate(['home']) 
  }
  loginPage(){
    this.route.navigate(['login']) 
  }
  ricettePage(){
    this.route.navigate(['ricerca-ricette']) 
  }
}
