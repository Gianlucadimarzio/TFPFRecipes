import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor( private authService: AuthService, private database: AngularFirestore ) {  
  }

  ngOnInit() {
  }

  getUtenteLoggato(){
    return this.authService.getUserUid();
  }

}
