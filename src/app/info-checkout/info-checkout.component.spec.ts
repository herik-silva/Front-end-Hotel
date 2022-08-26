import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCheckoutComponent } from './info-checkout.component';

describe('InfoCheckoutComponent', () => {
  let component: InfoCheckoutComponent;
  let fixture: ComponentFixture<InfoCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoCheckoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
