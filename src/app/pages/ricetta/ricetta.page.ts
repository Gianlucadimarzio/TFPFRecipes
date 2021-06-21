import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Ricetta } from 'src/app/model/ricetta.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser'


@Component({
  selector: 'app-ricetta',
  templateUrl: './ricetta.page.html',
  styleUrls: ['./ricetta.page.scss'],
})
export class RicettaPage implements OnInit {

  id: any;
  nomeRicetta: any;
  descrizioneRicetta: any;
  tempoRicetta: any;
  difficoltaRicetta: any;
  categoriaRicetta: any;
  immagineRicetta: any;

  ingredienti: any;


  constructor( private router:Router, private activatedRoute: ActivatedRoute, private database : AngularFirestore ) {
    this.ingredienti = new Array();

    var ricetta : Ricetta;
    this.id = activatedRoute.snapshot.paramMap.get('xyz');
    this.database.collection('ricetta').valueChanges().subscribe( resultRicetta => {
      for( let rowRicetta of resultRicetta ){
        ricetta = new Ricetta( rowRicetta['id'], rowRicetta['nome'],rowRicetta['descrizione'],rowRicetta['difficolta'],rowRicetta['immagine'],rowRicetta['procedimento'],rowRicetta['tempo'] );
        if( ricetta.getId() == this.id){

          this.database.collection('dose').valueChanges().subscribe( resultDose => {
            for( let rowDose of resultDose ){
              if( rowDose['ricetta'] == ricetta.getId() ){
                this.database.collection('ingrediente').valueChanges().subscribe( resultIngrediente => {
                  for( let rowIngrediente of resultIngrediente ){
                    if( rowIngrediente['id'] == rowDose['ingrediente'] ){
                      this.ingredienti.push( { nome: rowIngrediente['nome'], dose:rowDose['quantita'] } );
                      break;
                    }
                  }
                });
              }
            }
          });



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
  }


  ngOnInit() {
  }

  routerHome(){
    this.router.navigate(['tabs/tabs/home']);
  }
  routerRicerca(){
    this.router.navigate(['tabs/tabs/ricerca-ricette']);
  }
  routerCarrello(){
    this.router.navigate(['tabs/tabs/home']);
  }
  routerProfilo(){
    this.router.navigate(['tabs/tabs/profile']);
  }
  addCart(){
    alert("Ingredienti aggiunti al carrello");
  }




}
