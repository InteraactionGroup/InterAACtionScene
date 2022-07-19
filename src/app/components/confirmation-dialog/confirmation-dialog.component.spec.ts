import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ConfirmationDialogComponent} from './confirmation-dialog.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {TranslateModule} from "@ngx-translate/core";

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationDialogComponent],
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
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // spy upon the dialog ref
  // check if Close method is called
  it('onNoClick:: should close the dialog', () => {
    component.dialogRef = { close: () => {} } as any;
    spyOn(component.dialogRef, 'close');
    component.onNoClick();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });
});
