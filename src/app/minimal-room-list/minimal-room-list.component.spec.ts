import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimalRoomListComponent } from './minimal-room-list.component';

describe('MinimalRoomListComponent', () => {
  let component: MinimalRoomListComponent;
  let fixture: ComponentFixture<MinimalRoomListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinimalRoomListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinimalRoomListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
