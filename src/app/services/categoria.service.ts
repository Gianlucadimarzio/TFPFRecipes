import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Injectable({
    providedIn: 'root'
})

export class CategoriaService {

    constructor( private database: AngularFirestore ){
    }

    getCategorie(){
      var lista = new Array();
       this.database.collection('categoria').get().subscribe( resultCategoria =>{
         resultCategoria.forEach( rowCategoria => {
           lista.push( { immagine: rowCategoria.data()['immagine'], nome: rowCategoria.data()['nome'] } );
         });
       });
       return lista;
    }

}
