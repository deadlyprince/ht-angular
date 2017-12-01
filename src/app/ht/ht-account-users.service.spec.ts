import { TestBed, inject } from '@angular/core/testing';

import { HtAccountUsersService } from './ht-account-users.service';

describe('HtAccountUsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HtAccountUsersService]
    });
  });

  it('should be created', inject([HtAccountUsersService], (service: HtAccountUsersService) => {
    expect(service).toBeTruthy();
  }));
});
