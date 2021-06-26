import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RicettaService } from 'src/app/services/ricetta.service';



@Component({
  selector: 'app-ricerca-ricette-categoria',
  templateUrl: './ricerca-ricette-categoria.page.html',
  styleUrls: ['./ricerca-ricette-categoria.page.scss'],
})
export class RicercaRicetteCategoriaPage implements OnInit {

  idCategoria: any;
  filterTerm: string;
  ricette: Array<any>;


  constructor( private ricettaService: RicettaService, private router:Router, private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    this.idCategoria = this.activatedRoute.snapshot.paramMap.get('xyz');
    this.ricette = this.ricettaService.getRicetteByCategoria( this.idCategoria );
  }
  btnClicked(id: string){
    this.router.navigate([`ricetta/${id}`]);
  }

  routerHome(){
    this.router.navigate(['tabs/tabs/home']);
  }
  routerRicerca(){
    this.router.navigate(['tabs/tabs/recipes']);
  }
  routerCarrello(){
    this.router.navigate(['tabs/tabs/cart']);
  }
  routerProfilo(){
    this.router.navigate(['tabs/tabs/profile']);
  }
  routerAddRicetta(){
    this.router.navigate(['tabs/tabs/addRicetta']);
  }


}
