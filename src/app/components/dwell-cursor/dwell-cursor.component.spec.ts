import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DwellCursorComponent } from './dwell-cursor.component';
import {TranslateModule} from '@ngx-translate/core';

describe('DwellCursorComponent', () => {
  let component: DwellCursorComponent;
  let fixture: ComponentFixture<DwellCursorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DwellCursorComponent ],
      imports: [TranslateModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DwellCursorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
