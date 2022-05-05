import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasecrunchboxtoolsComponent } from './purchasecrunchboxtools.component';

describe('PurchasecrunchboxtoolsComponent', () => {
  let component: PurchasecrunchboxtoolsComponent;
  let fixture: ComponentFixture<PurchasecrunchboxtoolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasecrunchboxtoolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasecrunchboxtoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
