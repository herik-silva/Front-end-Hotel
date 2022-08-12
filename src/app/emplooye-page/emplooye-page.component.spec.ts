import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmplooyePageComponent } from './emplooye-page.component';

describe('EmplooyePageComponent', () => {
  let component: EmplooyePageComponent;
  let fixture: ComponentFixture<EmplooyePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmplooyePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmplooyePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
