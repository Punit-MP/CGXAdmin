import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrunchboxdetailsComponent } from './crunchboxdetails.component';

describe('CrunchboxdetailsComponent', () => {
  let component: CrunchboxdetailsComponent;
  let fixture: ComponentFixture<CrunchboxdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrunchboxdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrunchboxdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
