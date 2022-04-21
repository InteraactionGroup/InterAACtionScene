import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoutAppComponent } from './logout-app.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {TranslateModule} from "@ngx-translate/core";

describe('LogoutAppComponent', () => {
  let component: LogoutAppComponent;
  let fixture: ComponentFixture<LogoutAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LogoutAppComponent],
      imports: [MatDialogModule, TranslateModule.forRoot()],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
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
    expect(component).toBeTruthy();
  });
});
