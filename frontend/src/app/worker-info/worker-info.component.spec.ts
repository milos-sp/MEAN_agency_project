import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerInfoComponent } from './worker-info.component';

describe('WorkerInfoComponent', () => {
  let component: WorkerInfoComponent;
  let fixture: ComponentFixture<WorkerInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
