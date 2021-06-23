import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Injectable({
    providedIn: 'root'
})

export class CategoriaService {
    
    categorieCollection: AngularFirestoreCollection;

    constructor( private afs: AngularFirestore ){
        this.categorieCollection = this.afs.collection('categoria');
    }

    getCategorie(){
       return this.categorieCollection.valueChanges( { idField: 'myID' } );
    }

}

