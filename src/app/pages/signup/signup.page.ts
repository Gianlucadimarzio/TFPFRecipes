import { Component, OnInit } from '@angular/core';
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
  validationMessages = {
    email: [
      {type:"pattern", message:"Email non valida! Riprovare"}
    ],
    password: [
      {type:"minlength", message: "La password deve avere almeno 6 caratteri!"}
    ]
  }

  ValidationFormUSer: FormGroup;
  loading: any;


  constructor(private router: Router,
              private navCtr: NavController ,private formbuilder:FormBuilder, private authService: AuthService, public loadingCtrl : LoadingController, private alertCtrl: AlertController){
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
          this.router.navigate(['login']);
        }
      }, error=>{
        this.loading.dismiss();
        this.errorLoading(error.message);
      })
    } catch (erro){
      console.log(erro)
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
}
