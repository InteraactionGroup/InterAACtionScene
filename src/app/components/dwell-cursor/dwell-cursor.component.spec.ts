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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // check if it is returns specific value based on the variables
  it('getCursorOpacity:: should return 1 if dwell cursor is visible', () => {
    component.settingsService.DWELL_TIME_ENABLED = true;
    component.dwellCursorService.visible = true;
    component.dwellCursorService.started = true;
    expect(component.getCursorOpacity()).toEqual('1');
  });

  // set up variables and call onInit
  // dispatch the mousemove event to check if it sets variable or not
  it('ngOnInit:: should add mouse move event and set attribute on that', () => {
    spyOn(document.getElementById('cursor'), 'setAttribute');
    component.settingsService.DWELL_TIME_ENABLED = true;
    fixture.detectChanges();
    document.dispatchEvent(new MouseEvent('mousemove'));
    expect(document.getElementById('cursor').setAttribute).toHaveBeenCalled();
  });

  // set up variables and call onInit
  // dispatch the mousemove event to check if it sets variable or not
  it('ngOnInit:: should add mouse move event and set attribute on that', () => {
    spyOn(document.getElementById('cursor'), 'setAttribute');
    component.settingsService.DWELL_TIME_ENABLED = false;
    fixture.detectChanges();
    document.dispatchEvent(new MouseEvent('mousemove'));
    expect(document.getElementById('cursor').setAttribute).toHaveBeenCalled();
  });
});
