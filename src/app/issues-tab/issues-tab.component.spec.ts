import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesTabComponent } from './issues-tab.component';

describe('IssuesTabComponent', () => {
  let component: IssuesTabComponent;
  let fixture: ComponentFixture<IssuesTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuesTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
