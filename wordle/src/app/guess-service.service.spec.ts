import { TestBed } from '@angular/core/testing';

import { GuessServiceService } from './guess-service.service';

describe('GuessServiceService', () => {
  let service: GuessServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuessServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
