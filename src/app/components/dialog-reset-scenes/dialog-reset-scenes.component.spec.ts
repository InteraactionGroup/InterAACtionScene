import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogResetScenesComponent } from './dialog-reset-scenes.component';

describe('DialogResetScenesComponent', () => {
  let component: DialogResetScenesComponent;
  let fixture: ComponentFixture<DialogResetScenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogResetScenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogResetScenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
