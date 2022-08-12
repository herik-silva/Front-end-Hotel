import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoGuestComponent } from './info-guest.component';

describe('InfoGuestComponent', () => {
  let component: InfoGuestComponent;
  let fixture: ComponentFixture<InfoGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoGuestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
