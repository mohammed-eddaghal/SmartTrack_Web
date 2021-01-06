import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedPercentReportComponent } from './speed-percent-report.component';

describe('SpeedPercentReportComponent', () => {
  let component: SpeedPercentReportComponent;
  let fixture: ComponentFixture<SpeedPercentReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeedPercentReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeedPercentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
