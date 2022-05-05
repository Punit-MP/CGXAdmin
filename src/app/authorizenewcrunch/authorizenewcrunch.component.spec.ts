import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizenewcrunchComponent } from './authorizenewcrunch.component';

describe('AuthorizenewcrunchComponent', () => {
  let component: AuthorizenewcrunchComponent;
  let fixture: ComponentFixture<AuthorizenewcrunchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorizenewcrunchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizenewcrunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
