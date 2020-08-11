import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalUserListComponent } from './external-user-list.component';

describe('ExternalUserListComponent', () => {
  let component: ExternalUserListComponent;
  let fixture: ComponentFixture<ExternalUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
