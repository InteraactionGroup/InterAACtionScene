import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HotspotModifyDialogComponent} from './hotspot-modify-dialog.component';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from "@ngx-translate/core";

describe('HotspotCreateDialogComponent', () => {
  let component: HotspotModifyDialogComponent;
  let fixture: ComponentFixture<HotspotModifyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HotspotModifyDialogComponent],
      imports: [MatDialogModule, FormsModule, ReactiveFormsModule, TranslateModule.forRoot()],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotspotModifyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
