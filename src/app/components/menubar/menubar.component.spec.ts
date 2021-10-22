import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MenubarComponent} from './menubar.component';
import {TranslateModule} from '@ngx-translate/core';
import {MatDialogModule} from "@angular/material/dialog";

describe('MenubarComponent', () => {
  let component: MenubarComponent;
  let fixture: ComponentFixture<MenubarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), MatDialogModule],
      declarations: [MenubarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenubarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
