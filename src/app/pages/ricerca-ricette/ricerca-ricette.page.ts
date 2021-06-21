import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ricerca-ricette',
  templateUrl: './ricerca-ricette.page.html',
  styleUrls: ['./ricerca-ricette.page.scss'],
})
export class RicercaRicettePage implements OnInit {

  constructor( private route: Router) { }

  ngOnInit() {
  }

  homePage(){
    this.route.navigate(['home']) 
  }
  loginPage(){
    this.route.navigate(['login']) 
  }
  ricettePage(){
    this.route.navigate(['ricerca-ricette']) 
  }
}
