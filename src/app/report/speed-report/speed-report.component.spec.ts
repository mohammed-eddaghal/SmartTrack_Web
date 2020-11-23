import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedReportComponent } from './speed-report.component';

describe('SpeedReportComponent', () => {
  let component: SpeedReportComponent;
  let fixture: ComponentFixture<SpeedReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeedReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
