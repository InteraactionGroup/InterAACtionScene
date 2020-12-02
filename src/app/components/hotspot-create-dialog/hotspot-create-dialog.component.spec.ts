import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HotspotCreateDialogComponent} from './hotspot-create-dialog.component';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('HotspotCreateDialogComponent', () => {
  let component: HotspotCreateDialogComponent;
  let fixture: ComponentFixture<HotspotCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HotspotCreateDialogComponent],
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
    fixture = TestBed.createComponent(HotspotCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
