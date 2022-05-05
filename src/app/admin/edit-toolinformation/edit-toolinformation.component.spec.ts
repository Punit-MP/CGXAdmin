import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditToolinformationComponent } from './edit-toolinformation.component';

describe('EditToolinformationComponent', () => {
  let component: EditToolinformationComponent;
  let fixture: ComponentFixture<EditToolinformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditToolinformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditToolinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
