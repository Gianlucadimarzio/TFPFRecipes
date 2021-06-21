import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/app';
import { reject, resolve } from 'q';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router : Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise( (resolve, reject)=>{
      firebase.auth().onAuthStateChanged((user: firebase.User)=>{
         if(user){

          resolve(true);
        }else{
          resolve(false);
          this.router.navigate(['login']);
        }
      })
    })
  }

}