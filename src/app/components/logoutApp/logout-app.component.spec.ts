import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoutAppComponent } from './logout-app.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {TranslateModule} from "@ngx-translate/core";
import {HttpClientModule} from "@angular/common/http";

describe('LogoutAppComponent', () => {
  let component: LogoutAppComponent;
  let fixture: ComponentFixture<LogoutAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LogoutAppComponent],
      imports: [MatDialogModule, TranslateModule.forRoot(), HttpClientModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: jasmine.createSpyObj('MatDialogRef', ['close'])
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.onNoClick();
    component.putYes();
    expect(component).toBeTruthy();
  });
});
