import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-load',
  templateUrl: './load.page.html',
  styleUrls: ['./load.page.scss'],
})
export class LoadPage implements OnInit {

  constructor( private route: Router ) { }

  ngOnInit() {
  }

  accedi(){
    this.route.navigate(['login']) 
  }
  registrati(){
    this.route.navigate(['signup']) 
  }
}
