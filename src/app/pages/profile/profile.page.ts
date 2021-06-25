import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileEmail: any;
  constructor( private router: Router, private database : AngularFirestore, private authservice: AuthService){

  }

  ngOnInit(){
  }
  datiPersonali(){
    this.router.navigate(['dati-personali']);
  }
  recensioniPersonali(){
    this.router.navigate(['recensioni']);
  }
  ricettario(){
    this.router.navigate(['ricettario']);
  }
  test(){
    alert("we");
  }

}
