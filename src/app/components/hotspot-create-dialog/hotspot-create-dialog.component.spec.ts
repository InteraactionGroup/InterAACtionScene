import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HotspotCreateDialogComponent} from './hotspot-create-dialog.component';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {RouterTestingModule} from '@angular/router/testing';
import { ScenesService } from 'src/app/services/scenes.service';

describe('HotspotCreateDialogComponent', () => {
  let component: HotspotCreateDialogComponent;
  let fixture: ComponentFixture<HotspotCreateDialogComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<HotspotCreateDialogComponent>>;
  let sceneService: jasmine.SpyObj<ScenesService>;

  beforeEach(async(() => {
    const dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    const sceneServiceMock = jasmine.createSpyObj('ScenesService', ['addHotspot', 'checkNames']);
    TestBed.configureTestingModule({
      declarations: [HotspotCreateDialogComponent],
      imports: [MatDialogModule, FormsModule, ReactiveFormsModule, TranslateModule.forRoot(), RouterTestingModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: dialogRef
        },
        { provide: ScenesService, useValue: sceneServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotspotCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<HotspotCreateDialogComponent>>;
    sceneService = TestBed.inject(ScenesService) as jasmine.SpyObj<ScenesService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submit:: should submit hotSpot with soundAudio', () => {
    component.typeSound = "soundAudio";
    component.selectedScene = 1;
    component.selectedSound = 'data:audio/wav';
    sceneService.checkNames.and.returnValue(true);
    component.submit({value: { soundSelected: 'abc', name: 'xyz', color: '#0080ff', write: '', strokeWidth: '2' }});
    expect(sceneService.addHotspot).toHaveBeenCalledWith(component.selectedScene, component.selectedImage, 'xyz', component.svgPath, `#0080ff`, component.selectedSound, component.typeSound, Number(`2`));
    expect(dialogRef.close).toHaveBeenCalled();
  });

  it('submit:: should submit hotSpot with writeAudio', () => {
    component.typeSound = "writeAudio";
    component.selectedScene = 1;
    component.selectedSound = 'data:audio/wav';
    sceneService.checkNames.and.returnValue(true);
    component.submit({value: { soundSelected: 'abc', name: 'xyz', color: '#0080ff', write: 'pqr', strokeWidth: '2' }});
    expect(sceneService.addHotspot).toHaveBeenCalledWith(component.selectedScene, component.selectedImage, 'xyz', component.svgPath, `#0080ff`, 'pqr', component.typeSound, Number(`2`));
    expect(dialogRef.close).toHaveBeenCalled();
  });
});
