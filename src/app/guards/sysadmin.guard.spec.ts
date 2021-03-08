import { TestBed } from '@angular/core/testing';

import { SysadminGuard } from './sysadmin.guard';

describe('SysadminGuard', () => {
  let guard: SysadminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SysadminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
