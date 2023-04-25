import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogResetScenesComponent } from './dialog-reset-scenes.component';
import {TranslateModule} from '@ngx-translate/core';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from "@angular/common/http";


describe('DialogResetScenesComponent', () => {
  let component: DialogResetScenesComponent;
  let fixture: ComponentFixture<DialogResetScenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogResetScenesComponent ],
      imports: [TranslateModule.forRoot(), RouterTestingModule, HttpClientModule]
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
