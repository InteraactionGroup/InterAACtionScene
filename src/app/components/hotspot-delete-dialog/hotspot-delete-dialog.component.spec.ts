import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HotspotDeleteDialogComponent} from './hotspot-delete-dialog.component';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('HotspotDeleteDialogComponent', () => {
  let component: HotspotDeleteDialogComponent;
  let fixture: ComponentFixture<HotspotDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HotspotDeleteDialogComponent],
      imports: [MatDialogModule, FormsModule, ReactiveFormsModule],
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
    fixture = TestBed.createComponent(HotspotDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
