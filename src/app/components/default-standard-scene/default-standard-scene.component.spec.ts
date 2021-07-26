import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultStandardSceneComponent } from './default-standard-scene.component';
import {TranslateModule} from '@ngx-translate/core';
import {MatDialogModule} from '@angular/material/dialog';

describe('DefaultStandardSceneComponent', () => {
  let component: DefaultStandardSceneComponent;
  let fixture: ComponentFixture<DefaultStandardSceneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultStandardSceneComponent ],
      imports: [TranslateModule.forRoot(), MatDialogModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultStandardSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
