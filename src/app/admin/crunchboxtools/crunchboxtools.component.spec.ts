import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrunchboxtoolsComponent } from './crunchboxtools.component';

describe('CrunchboxtoolsComponent', () => {
  let component: CrunchboxtoolsComponent;
  let fixture: ComponentFixture<CrunchboxtoolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrunchboxtoolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrunchboxtoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
