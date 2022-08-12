import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestInfoBarComponent } from './guest-info-bar.component';

describe('GuestInfoBarComponent', () => {
  let component: GuestInfoBarComponent;
  let fixture: ComponentFixture<GuestInfoBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestInfoBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestInfoBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
