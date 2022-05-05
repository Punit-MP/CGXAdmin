import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewtoolComponent } from './addnewtool.component';

describe('AddnewtoolComponent', () => {
  let component: AddnewtoolComponent;
  let fixture: ComponentFixture<AddnewtoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnewtoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewtoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
