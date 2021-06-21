import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( private route: Router) {}

/*
  homePage(){
    this.route.navigate(['home'])
  }
  loginPage(){
    this.route.navigate(['login'])
  }
  ricettaPage(){
    this.route.navigate(['ricetta'])
  }
*/

  slidesOptions = {
    slidesPerView: 2.5
  }

}
