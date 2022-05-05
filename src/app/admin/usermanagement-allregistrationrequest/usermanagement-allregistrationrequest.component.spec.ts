import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermanagementAllregistrationrequestComponent } from './usermanagement-allregistrationrequest.component';

describe('UsermanagementAllregistrationrequestComponent', () => {
  let component: UsermanagementAllregistrationrequestComponent;
  let fixture: ComponentFixture<UsermanagementAllregistrationrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsermanagementAllregistrationrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsermanagementAllregistrationrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
