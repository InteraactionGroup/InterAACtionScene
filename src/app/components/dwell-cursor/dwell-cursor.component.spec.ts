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

  // check if it returns specific value based on the variables
  it('getCursorOpacity:: should return 1 if dwell cursor is visible', () => {
    component.settingsService.DWELL_TIME_ENABLED = true;
    component.dwellCursorService.visible = true;
    component.dwellCursorService.started = true;
    expect(component.getCursorOpacity()).toEqual('1');
  });
});
