import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JouerPage } from './jouer.page';

describe('JouerPage', () => {
  let component: JouerPage;
  let fixture: ComponentFixture<JouerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JouerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JouerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
