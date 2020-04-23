import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSceneDialogComponent } from './add-scene-dialog.component';

describe('AddSceneDialogComponent', () => {
  let component: AddSceneDialogComponent;
  let fixture: ComponentFixture<AddSceneDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSceneDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSceneDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
