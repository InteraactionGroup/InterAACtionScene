import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HotspotModifyDialogComponent} from './hotspot-modify-dialog.component';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from "@ngx-translate/core";
import { RouterTestingModule } from '@angular/router/testing';
import { ScenesService } from 'src/app/services/scenes.service';

describe('HotspotCreateDialogComponent', () => {
  let component: HotspotModifyDialogComponent;
  let fixture: ComponentFixture<HotspotModifyDialogComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<HotspotModifyDialogComponent>>;
  let sceneService: jasmine.SpyObj<ScenesService>;

  beforeEach(async(() => {
    const dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    const sceneServiceMock = jasmine.createSpyObj('ScenesService', ['updateScenes', 'checkNames']);
    TestBed.configureTestingModule({
      declarations: [HotspotModifyDialogComponent],
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
    fixture = TestBed.createComponent(HotspotModifyDialogComponent);
    component = fixture.componentInstance;
    component.hotspot = {name: 'abc', typeSound: 'soundAudio'} as any;
    fixture.detectChanges();
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<HotspotModifyDialogComponent>>;
    sceneService = TestBed.inject(ScenesService) as jasmine.SpyObj<ScenesService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submit:: should submit the modification from dialog', () => {
    spyOn(component, 'modifyCenterHotspot');
    sceneService.checkNames.and.returnValue(false);
    component.typeSound = 'soundAudio';
    component.selectedSound = 'abc';
    component.modeService.modifyiedHotspot = {} as any;
    sceneService.modeService = component.modeService;
    component.submit({value : {soundSelected: '', name: 'abc', color: '#ffffff', write: 'test', strokeWidth: 2}});
    expect(dialogRef.close).toHaveBeenCalled();
    expect(component.modifyCenterHotspot).toHaveBeenCalled();
  });

  it('submit:: should redraw and delete oldCenter hotspot', () => {
    spyOn(component, 'deleteOldCenterHotspot');
    spyOn(component, 'modifyCenterHotspot');
    component.hotspot = {name: 'abc', typeSound: 'writeAudio', svgPointArray: []} as any;
    sceneService.checkNames.and.returnValue(false);
    component.typeSound = 'writeAudio';
    component.selectedSound = 'abc';
    component.modeService.modifyiedHotspot = null;
    component.modeService.currentDrawingTool = 'redraw';
    sceneService.modeService = component.modeService;
    component.submit({value : {soundSelected: '', name: 'abc', color: '#ffffff', write: 'test', strokeWidth: 2}});
    expect(dialogRef.close).toHaveBeenCalled();
    expect(component.deleteOldCenterHotspot).toHaveBeenCalled();
  });

  it('submit:: should show error if name is incorrect', () => {
    spyOn(component.translate, 'instant');
    sceneService.checkNames.and.returnValue(false);
    component.submit({value : {soundSelected: '', name: 'xyz', color: '#ffffff', write: 'test', strokeWidth: 2}});
    expect(component.translate.instant).toHaveBeenCalledWith('error.name');
  });

  it('submit:: should show error if strokeWidth is incorrect', () => {
    spyOn(component.translate, 'instant');
    sceneService.checkNames.and.returnValue(false);
    component.typeSound = 'soundAudio';
    component.selectedSound = 'abc';
    component.modeService.modifyiedHotspot = {} as any;
    sceneService.modeService = component.modeService;
    component.submit({value : {soundSelected: '', name: 'abc', color: '#ffffff', write: 'test', strokeWidth: 0}});
    expect(component.translate.instant).toHaveBeenCalledWith('error.stroke');
  });
});
