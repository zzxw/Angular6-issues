import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeIssuesComponent } from './code-issues.component';

describe('CodeIssuesComponent', () => {
  let component: CodeIssuesComponent;
  let fixture: ComponentFixture<CodeIssuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeIssuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
