import { TestBed } from '@angular/core/testing';

import { IniteraryService } from './initerary.service';

describe('IniteraryService', () => {
  let service: IniteraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IniteraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
