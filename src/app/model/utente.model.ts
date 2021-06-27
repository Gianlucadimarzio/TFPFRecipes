import { AngularFirestore } from "@angular/fire/firestore";
import { TabsPage } from "../pages/tabs/tabs.page";
import { AuthService } from "../services/auth.service";
import { Ricetta } from './ricetta.model';
import { Ingrediente } from './ingrediente.model';


export class Utente {

    id: string;

    nome: string;
    cognome: string;
    email: string;
    ricettario: Array<Ricetta>;
    carrello: Array<Ingrediente>

    constructor( private authService: AuthService, private database: AngularFirestore ){
        var log: TabsPage = new TabsPage(authService, database);
        this.id = log.getUtenteLoggato();
    }

    getId(){
        return this.id;
    }


}
