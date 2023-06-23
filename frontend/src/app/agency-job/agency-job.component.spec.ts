import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyJobComponent } from './agency-job.component';

describe('AgencyJobComponent', () => {
  let component: AgencyJobComponent;
  let fixture: ComponentFixture<AgencyJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencyJobComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencyJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
