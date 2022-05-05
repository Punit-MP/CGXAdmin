import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotsetpasswordComponent } from './forgotsetpassword.component';

describe('ForgotsetpasswordComponent', () => {
  let component: ForgotsetpasswordComponent;
  let fixture: ComponentFixture<ForgotsetpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotsetpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotsetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
