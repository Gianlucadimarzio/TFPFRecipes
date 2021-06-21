import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileEmail: any;
  constructor(private database : AngularFirestore,private authservice: AuthService) {
    firebase.auth().onAuthStateChanged(user => {
      console.log("AUTH_USER", user);

      if (user) {
        const result = this.database.doc(`/utente/${this.authservice.getUserUid()}`);
        var userprofile = result.valueChanges();
        userprofile.subscribe(profile => {
          console.log("PROFILE::", profile);

           this.profileEmail = profile['email'];
        })
      }
    })
   }

  ngOnInit() {
  }

}
