import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogResetSettingsComponent } from './dialog-reset-settings.component';
import {TranslateModule} from "@ngx-translate/core";

describe('DialogResetSettingsComponent', () => {
  let component: DialogResetSettingsComponent;
  let fixture: ComponentFixture<DialogResetSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogResetSettingsComponent ],
      imports: [TranslateModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogResetSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});