import { TestBed } from '@angular/core/testing';

import { UserDBService } from './user-db.service';

describe('UserDBService', () => {
  let service: UserDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // check if it sets specific variable after calling the function
  it('addUser:: should add user', () => {
    service.addUser('user1');
    expect(service.usersList.indexOf('user1')).toBeGreaterThan(-1);
  });
});

