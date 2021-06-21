import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Ricetta } from 'src/app/model/ricetta.model';
import { RicettaPage } from '../ricetta/ricetta.page';





@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  ricette : any;

  constructor( private router: Router, private database : AngularFirestore) {
    var ricetta : Ricetta;
    var flag: number = 0;

    this.ricette = new Array();
    
    this.database.collection('ricetta').valueChanges().subscribe( resultRicetta => {


      for( let row of resultRicetta ){    
        if( flag > 4 ) break;
        this.database.collection('categoria').valueChanges().subscribe( resultCategoria => {
          ricetta = new Ricetta( row['id'], row['nome'], row['descrizione'], row['difficolta'], row['immagine'], row['procedimento'], row['tempo'] );
          for( let rowCategoria of resultCategoria ){
            if( rowCategoria['id'] == row['categoria'] ){
              ricetta.setCategoria( rowCategoria['nome'] );
              this.ricette.push( { nome:ricetta.getNome(), immagine:ricetta.getImmagine(), categoria:ricetta.getCategoria(), id:ricetta.getId() }  );
              break;
            }
          }
        });                       
        flag = flag + 1;        
      }
    });
  }

  slidesOptions = {
    slidesPerView: 2.5
  }

  btnClicked(id: string){
    this.router.navigate([`ricetta/${id}`]);
  }

}
