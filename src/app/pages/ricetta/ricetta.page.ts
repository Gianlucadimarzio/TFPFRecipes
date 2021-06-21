import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Ricetta } from 'src/app/model/ricetta.model';
import { ActivatedRoute, Router } from '@angular/router';

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
  constructor( private router:Router, private activatedRoute: ActivatedRoute, private database : AngularFirestore ) {

    var ricetta : Ricetta;
    this.id = activatedRoute.snapshot.paramMap.get('xyz');
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


  /*
    SELECT * FROM RICETTA
    this.database.collection('ricetta').valueChanges().subscribe( result => {
      this.ricettaNome = result[0]['nome'];
    });
  */
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




}
