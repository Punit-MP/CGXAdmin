import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationViewallpageComponent } from './notification-viewallpage.component';

describe('NotificationViewallpageComponent', () => {
  let component: NotificationViewallpageComponent;
  let fixture: ComponentFixture<NotificationViewallpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationViewallpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationViewallpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
