import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RicercaRicetteCategoriaPage } from './ricerca-ricette-categoria.page';

describe('RicercaRicetteCategoriaPage', () => {
  let component: RicercaRicetteCategoriaPage;
  let fixture: ComponentFixture<RicercaRicetteCategoriaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RicercaRicetteCategoriaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RicercaRicetteCategoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
