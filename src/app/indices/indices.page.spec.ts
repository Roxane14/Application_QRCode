import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IndicesPage } from './indices.page';

describe('IndicesPage', () => {
  let component: IndicesPage;
  let fixture: ComponentFixture<IndicesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IndicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
