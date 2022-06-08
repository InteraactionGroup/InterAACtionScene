import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTutorialComponent } from './dialog-tutorial.component';
import {TranslateModule, TranslatePipe} from '@ngx-translate/core';

describe('DialogTutorialComponent', () => {
  let component: DialogTutorialComponent;
  let fixture: ComponentFixture<DialogTutorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogTutorialComponent, TranslatePipe ],
      imports: [TranslateModule.forRoot()]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // should set variable to the opposite of what it already has
  it('displayIframe:: should toggle displayIframe', () => {
    component.displayIframe();
    expect(component.displayIFrame).toBeTruthy();
  });
});
