import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRoomCardComponent } from './view-room-card.component';

describe('ViewRoomCardComponent', () => {
  let component: ViewRoomCardComponent;
  let fixture: ComponentFixture<ViewRoomCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRoomCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRoomCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
