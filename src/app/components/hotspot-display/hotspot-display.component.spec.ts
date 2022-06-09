import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HotspotDisplayComponent} from './hotspot-display.component';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ScenesService } from 'src/app/services/scenes.service';
import { HotspotModifyDialogComponent } from '../hotspot-modify-dialog/hotspot-modify-dialog.component';
import { HotspotDeleteDialogComponent } from '../hotspot-delete-dialog/hotspot-delete-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { imgBase64Mock } from 'src/app/services/scene-display.service.spec';

describe('HotspotDisplayComponent', () => {
  let component: HotspotDisplayComponent;
  let fixture: ComponentFixture<HotspotDisplayComponent>;
  let sceneService: jasmine.SpyObj<ScenesService>;

  beforeEach(async(() => {
    const sceneServiceMock = jasmine.createSpyObj('ScenesService', ['getImageHotspots']);
    TestBed.configureTestingModule({
      declarations: [HotspotDisplayComponent, HotspotModifyDialogComponent, HotspotDeleteDialogComponent],
      imports: [MatDialogModule, FormsModule, ReactiveFormsModule, TranslateModule.forRoot(), RouterTestingModule, BrowserAnimationsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        { provide: ScenesService, useValue: sceneServiceMock },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotspotDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    sceneService = TestBed.inject(ScenesService) as jasmine.SpyObj<ScenesService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // check if it returns the value which is returned from the service
  it('getHotspots:: should return hotspots from service', () => {
    sceneService.getImageHotspots.and.returnValue([{} as any]);
    const hotspot = component.getHotspots();
    expect(hotspot.length).toEqual(1);
  });

  // check if it returns specific string with specific param
  it('getPoints:: should return path string based on hotspot', () => {
    component.height = 10;
    component.width = 10;
    const pathArr = component.getPoints({ svgPointArray: [1, 2, 3] } as any);
    expect(pathArr).toEqual('10,20 ');
  });

  // check if it returns specific string with specific param
  it('getPointsInNumber:: should return points based on hotspot', () => {
    component.height = 10;
    component.width = 10;
    const points = component.getPointsInNumber({ svgPointArray: [1, 2, 3] } as any);
    expect(points).toEqual([{ x: 10, y: 20 }]);
  });

  // check if it returns specific string with specific param
  it('enterEvent:: should set attributes to element', () => {
    const event = {
      target: {
        setAttribute: () => {},
      },
      offsetX: 1,
      offsetY: 20
    } as any;
    component.modeService.currentDrawingTool = 'delete';
    component.enterEvent(event, { name: 'Center', strokeColor: '#000000' });
    expect(component).toBeTruthy();
  });

  it('delay:: should add delay', () => {
    const delay = component.delay(0);
    delay.then(x => {
      expect(component).toBeTruthy();
    });
  });

  it('leaveEvent:: should set attributes to element', () => {
    const event = {
      target: {
        setAttribute: () => {},
      },
      offsetX: 1,
      offsetY: 20
    } as any;
    component.leaveEvent(event, { name: 'Center', strokeColor: '#000000' });
    expect(component).toBeTruthy();
  });

  // check if it calls specific service method
  it('clickEvent:: should open relative dialog', () => {
    spyOn(component, 'PlayAudio');
    component.clickEvent(null, null);
    expect(component.PlayAudio).toHaveBeenCalled();
  });

  // check if it calls specific service method if required param is missing
  it('clickEvent:: should open relative dialog', () => {
    spyOn(component, 'PlayAudio');
    component.modeService.selectedMode = 'hotspot';
    component.modeService.currentDrawingTool = 'modify';
    component.clickEvent(null, null);
    expect(component.PlayAudio).not.toHaveBeenCalled();
  });

  // check if it returns default value
  it('getColor:: should return black color as default', () => {
    const color = component.getColor(0);
    expect(color).toEqual('black');
  });

  // check if it doesn't call specific service method if required param is missing
  it('enter:: should start cursor service', () => {
    component.settingsService.DWELL_TIME_ENABLED = false;
    spyOn(component.dwellCursorService, 'stop');
    component.enter(null, null);
    expect(component.dwellCursorService.stop).not.toHaveBeenCalled();
  });

  // check if it calls specific service method
  it('exit:: should stop cursor service', () => {
    component.settingsService.DWELL_TIME_ENABLED = true;
    spyOn(component.dwellCursorService, 'stop');
    component.exit();
    expect(component.dwellCursorService.stop).toHaveBeenCalled();
  });

  // check if it calls specific service method
  it('PlayAudio:: should play audio based on passed hotspot', () => {
    component.settingsService.DWELL_TIME_ENABLED = true;
    spyOn(component.dwellCursorService, 'stop');
    spyOn(component.audioPlayer, 'load');
    spyOn(component.audioPlayer, 'play');
    component.PlayAudio({typeSound: 'soundAudio', base64sound: imgBase64Mock} as any);
    expect(component.audioPlayer.load).toHaveBeenCalled();
    expect(component.audioPlayer.play).toHaveBeenCalled();
  });
});
