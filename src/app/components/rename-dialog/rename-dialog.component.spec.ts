import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RenameDialogComponent} from './rename-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {TranslateModule} from '@ngx-translate/core';
import {RouterTestingModule} from '@angular/router/testing';

describe('RenameDialogComponent', () => {
  let component: RenameDialogComponent;
  let fixture: ComponentFixture<RenameDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RenameDialogComponent]
      ,
      imports: [FormsModule, ReactiveFormsModule, MatDialogModule, TranslateModule.forRoot(), RouterTestingModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: jasmine.createSpyObj('MatDialogRef', ['close'])
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submit:: should rename image if image is selected', () => {
    // @ts-ignore
    spyOn(component.scenesService, 'renameImage');
    component.imageSelected = true;
    component.submit({value: {name: 'abc'}});
    // @ts-ignore
    expect(component.scenesService.renameImage).toHaveBeenCalled();
  });

  it('submit:: should rename scene if image is not selected', () => {
    // @ts-ignore
    spyOn(component.scenesService, 'renameScene');
    component.imageSelected = false;
    component.submit({value: {name: 'abc'}});
    // @ts-ignore
    expect(component.scenesService.renameScene).toHaveBeenCalled();
  });
});
