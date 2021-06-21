import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( private route: Router) {}
  
  homePage(){
    this.route.navigate(['home']) 
  }
  loginPage(){
    this.route.navigate(['login']) 
  }
  ricettePage(){
    this.route.navigate(['ricerca-ricette']) 
  }

  slidesOptions = {
    slidesPerView: 2.5
  }

}
