import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsDialogComponent } from './groups-dialog.component';

describe('GroupsDialogComponent', () => {
  let component: GroupsDialogComponent;
  let fixture: ComponentFixture<GroupsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
