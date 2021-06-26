import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  flagAuth = false;

  validationMessages = {
    email: [
      {type:"pattern", message:"Email non valida! Riprovare"}
    ],
    password: [
      {type:"minlength", message: "La password deve avere almeno 6 caratteri!"}
    ]
  };

  ValidationFormUSer: FormGroup;
  loading: any;


  constructor( private nav: NavController, private route: Router, private authservice: AuthService, private firestore: AngularFirestore, private router: Router, private navCtr: NavController ,private formbuilder:FormBuilder, private authService: AuthService, public loadingCtrl : LoadingController, private alertCtrl: AlertController){
   this.loading = this.loadingCtrl
  }

  ngOnInit() {
    this.ValidationFormUSer = this.formbuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.][a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      nome: new FormControl('', Validators.compose([
        Validators.required
      ])),
      cognome: new FormControl('', Validators.compose([
        Validators.required
      ]))
    })
  }

  registerUser(value){
    this.showalert;
    try {
      this.authService.userRegistration(value).then( response => {
        console.log(response);
        if(response.user){
          this.loading.dismiss();




          this.authservice.loginFireauth(value).then( resp =>{
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
                }
                else{
                  this.firestore.doc(`utente/${this.authservice.getUserUid()}`).set({
                    email: resp.user.email,
                    id: this.authservice.getUserUid(),
                    nome: value['nome'],
                    cognome: value['cognome']
                  });
                }
              });
            }
          });
          this.authservice.loginFireauth(value).catch( resp =>{
             this.flagAuth = true;
          });
        }
      }, error=>{
        this.loading.dismiss();
        this.errorLoading(error.message);
      })
    } catch (erro){
      console.log(erro);
    }

  }

  async errorLoading(message: any){
    const loading = await this.alertCtrl.create({
      header:"Errore in fase di registrazione",
      message:message,
      buttons:[{
        text:'ok',
        handler: ()=>{
          this.navCtr.navigateBack(['signup'])
      }
      }]
    })
     await loading.present();
  }
  async showalert(){
    var load = await this.loadingCtrl.create({
      message:"please wait....",

    })
     load.present();
   }

   login(){
    this.route.navigate(['login']);
  }
}
