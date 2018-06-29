import { TestBed, inject } from '@angular/core/testing';

import { IssuesTabService } from './issues-tab.service';

describe('IssuesTabService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IssuesTabService]
    });
  });

  it('should be created', inject([IssuesTabService], (service: IssuesTabService) => {
    expect(service).toBeTruthy();
  }));
});
