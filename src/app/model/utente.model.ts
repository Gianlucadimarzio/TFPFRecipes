import { AngularFirestore } from "@angular/fire/firestore";
import { TabsPage } from "../pages/tabs/tabs.page";
import { AuthService } from "../services/auth.service";

export class Utente {

    id: string;

    constructor( private authService: AuthService, private database: AngularFirestore ){ 
        var log: TabsPage = new TabsPage(authService, database);
        this.id = log.getUtenteLoggato();
    }
    
    getId(){
        return this.id;
    }


}