import { TestBed } from '@angular/core/testing';

import { ImportService } from './import.service';

describe('Import.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImportService = TestBed.get(ImportService);
    expect(service).toBeTruthy();
  });
});
