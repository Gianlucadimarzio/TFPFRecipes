import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Utente } from 'src/app/model/utente.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { RecensioneService } from 'src/app/services/recensione.service';






@Component({
  selector: 'app-add-recensione',
  templateUrl: './add-recensione.page.html',
  styleUrls: ['./add-recensione.page.scss'],
})
export class AddRecensionePage implements OnInit {

  id: any;
  utente: Utente;


  constructor( private database : AngularFirestore, private authService: AuthService, private recensioneService: RecensioneService, private router:Router, private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('xyz');
    this.utente = new Utente( this.authService, this.database );
  }

  addRecensione( form: NgForm ){
    this.recensioneService.addRecensione( form, this.id, this.utente );
    this.router.navigate(['tabs/tabs/home']);
  }

  routerHome(){
    this.router.navigate(['tabs/tabs/home']);
  }
  routerRicerca(){
    this.router.navigate(['tabs/tabs/recipes']);
  }
  routerProfilo(){
    this.router.navigate(['tabs/tabs/profile']);
  }
  routerAddRicetta(){
    this.router.navigate(['tabs/tabs/addRicetta']);
  }

}
