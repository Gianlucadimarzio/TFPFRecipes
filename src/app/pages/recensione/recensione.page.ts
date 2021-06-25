import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recensione',
  templateUrl: './recensione.page.html',
  styleUrls: ['./recensione.page.scss'],
})
export class RecensionePage implements OnInit {

  idRicetta: any;
  constructor( private router: Router ) { }

  ngOnInit() {

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

}
