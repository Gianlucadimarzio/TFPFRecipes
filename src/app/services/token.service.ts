import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class TokenService {
    
    constructor(  ){
    }

    generateToken(){
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 20; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
       }
       return result;
    }
}

