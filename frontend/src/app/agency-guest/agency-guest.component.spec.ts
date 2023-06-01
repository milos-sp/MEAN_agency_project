import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyGuestComponent } from './agency-guest.component';

describe('AgencyGuestComponent', () => {
  let component: AgencyGuestComponent;
  let fixture: ComponentFixture<AgencyGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencyGuestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencyGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
