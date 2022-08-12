import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveInfoBarComponent } from './reserve-info-bar.component';

describe('ReserveInfoBarComponent', () => {
  let component: ReserveInfoBarComponent;
  let fixture: ComponentFixture<ReserveInfoBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserveInfoBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReserveInfoBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
