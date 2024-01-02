import { TestBed } from '@angular/core/testing';

import { MiAPiService } from './mi-api.service';

describe('MiAPiService', () => {
  let service: MiAPiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiAPiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
