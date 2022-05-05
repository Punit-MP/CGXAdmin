import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TooldetailsComponent } from './tooldetails.component';

describe('TooldetailsComponent', () => {
  let component: TooldetailsComponent;
  let fixture: ComponentFixture<TooldetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TooldetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TooldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
