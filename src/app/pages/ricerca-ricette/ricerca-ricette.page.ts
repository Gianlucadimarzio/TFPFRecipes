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

  categorie: Array<any>;

  constructor( private database : AngularFirestore, private categoriaService: CategoriaService, private router: Router) {
  }

  ngOnInit() {
    this.categorie = this.categoriaService.getCategorie();
  }
  btnClicked( id: string ){
    this.router.navigate([`ricerca-ricette-categoria/${id}`]);
  }
}
