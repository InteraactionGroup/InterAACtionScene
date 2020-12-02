import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HotspotDisplayComponent} from './hotspot-display.component';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('HotspotDisplayComponent', () => {
  let component: HotspotDisplayComponent;
  let fixture: ComponentFixture<HotspotDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HotspotDisplayComponent],
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
    fixture = TestBed.createComponent(HotspotDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
