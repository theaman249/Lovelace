import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeBookingsComponent } from './office-bookings.component';

describe('OfficeBookingsComponent', () => {
  let component: OfficeBookingsComponent;
  let fixture: ComponentFixture<OfficeBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficeBookingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfficeBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
