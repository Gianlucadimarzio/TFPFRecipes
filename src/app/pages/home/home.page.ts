import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { RicettaService } from 'src/app/services/ricetta.service';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  ricetteFacili : Array<any>;
  ricetteVeloci : Array<any>;

  ricetteSlider: Array<any>;

  constructor( private ricettaService: RicettaService, private router: Router, private database : AngularFirestore, private authService: AuthService) {
  }
  ngOnInit(){
    this.ricetteSlider = this.ricettaService.getRicetteSlider();
    this.ricetteFacili = this.ricettaService.getRicetteFacili();
    this.ricetteVeloci = this.ricettaService.getRicetteVeloci();
  }
  
  slidesOptions = {
    slidesPerView: 2.5
  }

  btnClicked(id: string){
    this.router.navigate([`ricetta/${id}`]);
  }

}
