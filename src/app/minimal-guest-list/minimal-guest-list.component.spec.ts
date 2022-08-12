import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimalGuestListComponent } from './minimal-guest-list.component';

describe('MinimalGuestListComponent', () => {
  let component: MinimalGuestListComponent;
  let fixture: ComponentFixture<MinimalGuestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinimalGuestListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinimalGuestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
