import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ScenesService } from '../scenes.service';
import { AddImageDialogComponent } from './add-image-dialog.component';

describe('AddImageDialogComponent', () => {
  let component: AddImageDialogComponent;
  let fixture: ComponentFixture<AddImageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddImageDialogComponent ],
      imports : [ScenesService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
