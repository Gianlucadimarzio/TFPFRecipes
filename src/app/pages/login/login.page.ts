import { DepFlags, Route } from '@angular/compiler/src/core';
import { CATCH_STACK_VAR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonLabel, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validationFormUser: FormGroup;
  flagAuth = false;


  constructor(public formbuider: FormBuilder, private route: Router, public authservice: AuthService, private firestore: AngularFirestore,
              private nav: NavController) { }

  validationUserMessage = {
    email:[
      {type:"required", message:"Inserisci la tua email"},
      {type:"pattern", message:"Email non valida! Riprova"}
    ],
    password:[
      {type:"required", message:"Inserisci la tua password"},
    ],
    auth:[
      {type:"pattern", message:"Errore, credenziali non valide!"}
    ]
  }

  ngOnInit() {

    this.validationFormUser = this.formbuider.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
      ]))
    })
  }

  LoginUser(value){
      this.authservice.loginFireauth(value).then( resp =>{
        console.log(resp);
        this.route.navigate(['tabs']);
        this.authservice.setUser({

          email: resp.user.email,
          uid: resp.user.uid
        })
        if(resp.user){

          const userProfile = this.firestore.collection('utente').doc(resp.user.uid);
          userProfile.get().subscribe( result=>{
            if(result.exists){
              this.nav.navigateForward(['tabs']);
            } else {
              this.firestore.doc(`utente/${this.authservice.getUserUid()}`).set({
                email: resp.user.email
              });
            }
          })
        }  
       })
       this.authservice.loginFireauth(value).catch( resp =>{
        this.flagAuth = true;
      })

  }


}
