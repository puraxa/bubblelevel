import { TestBed } from '@angular/core/testing';

import { AnglesService } from './angles.service';

describe('AnglesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnglesService = TestBed.get(AnglesService);
    expect(service).toBeTruthy();
  });
});
