import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotspotModifyDialogComponent } from './hotspot-modify-dialog.component';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('HotspotCreateDialogComponent', () => {
  let component: HotspotModifyDialogComponent;
  let fixture: ComponentFixture<HotspotModifyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotspotModifyDialogComponent ],
      imports: [ MatDialogModule, FormsModule, ReactiveFormsModule ],
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
