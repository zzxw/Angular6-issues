import { TestBed, inject } from '@angular/core/testing';

import { CodeIssuesService } from './code-issues.service';

describe('CodeIssuesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CodeIssuesService]
    });
  });

  it('should be created', inject([CodeIssuesService], (service: CodeIssuesService) => {
    expect(service).toBeTruthy();
  }));
});
