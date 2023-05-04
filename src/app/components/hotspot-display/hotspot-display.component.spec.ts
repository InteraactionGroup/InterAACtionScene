import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
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
import { of } from 'rxjs';
import {HttpClientModule} from "@angular/common/http";
import {SoundHotspot} from '../../types';

describe('HotspotDisplayComponent', () => {
  let component: HotspotDisplayComponent;
  let fixture: ComponentFixture<HotspotDisplayComponent>;
  let sceneService: jasmine.SpyObj<ScenesService>;

  beforeEach(async(() => {
    const sceneServiceMock = jasmine.createSpyObj('ScenesService', ['getImageHotspots']);
    TestBed.configureTestingModule({
      declarations: [HotspotDisplayComponent, HotspotModifyDialogComponent, HotspotDeleteDialogComponent],
      imports: [MatDialogModule, FormsModule, ReactiveFormsModule, TranslateModule.forRoot(), RouterTestingModule, BrowserAnimationsModule, HttpClientModule],
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

  // check if it returns the value returned from the service
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

  // check if it returns specific value with specific param
  it('getPointsInNumber:: should return points based on hotspot', () => {
    component.height = 10;
    component.width = 10;
    const points = component.getPointsInNumber({ svgPointArray: [1, 2, 3] } as any);
    expect(points).toEqual([{ x: 10, y: 20 }]);
  });

  // check if it sets specific value with specific param
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

  // check if it sets specific value with specific param
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
  it('leaveEvent:: should set attributes to element', () => {
    const event = {
      target: {
        setAttribute: () => {},
      },
      offsetX: 1,
      offsetY: 20
    } as any;
    component.leaveEvent(event, { name: 'Top', strokeColor: '#000000' });
    expect(component).toBeTruthy();
  });

  // check if it calls specific service method
  it('clickEvent:: should open relative dialog', () => {
    spyOn(component, 'PlayHotspot');
    component.clickEvent(null, null);
    expect(component.PlayHotspot).toHaveBeenCalled();
  });

  // check if it calls specific service method if required param is missing
  it('clickEvent:: should open relative dialog', () => {
    spyOn(component, 'PlayHotspot');
    component.modeService.selectedMode = 'hotspot';
    component.modeService.currentDrawingTool = 'modify';
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    spyOn(component.dialog, 'open').and.returnValue({ afterClosed: () => of(true), componentInstance: {selectedScene: null, selectedImage: null, hotspot: null} } as any);
    component.clickEvent(null, null);
    expect(component.PlayHotspot).not.toHaveBeenCalled();
    expect(component.modeService.selectedMode).toEqual('hotspot');
    expect(component.modeService.soundType).toEqual('import');
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
    spyOn(component.dwellCursorService, 'stop');
    component.exit();
    expect(component.dwellCursorService.stop).not.toHaveBeenCalled();
    component.settingsService.DWELL_TIME_ENABLED = true;
    component.exit();
    expect(component.dwellCursorService.stop).toHaveBeenCalled();
  });

  // check if it calls specific service method
  it('PlayHotspot:: should play audio based on passed sound hotspot', () => {
    component.settingsService.DWELL_TIME_ENABLED = true;
    spyOn(component.dwellCursorService, 'stop');
    spyOn(component.audioPlayer, 'load');
    spyOn(component.audioPlayer, 'play');
    let hotspot = new SoundHotspot('test', [1,2,3], 'white', 'soundAudio', 2, imgBase64Mock)
    // component.PlayHotspot({type: 'soundAudio', base64sound: imgBase64Mock} as SoundHotspot);
    component.PlayHotspot(hotspot);
    expect(component.audioPlayer.load).toHaveBeenCalled();
    expect(component.audioPlayer.play).toHaveBeenCalled();
  });

  // set the getPoints array and store the results in variable and check if it returns expected results or not
  it('getPoints:: should not return path string if hotspot is invalid', () => {
    component.height = 10;
    component.width = 10;
    const pathArr = component.getPoints({ svgPointArray: ['a', 'b', 'c'] } as any);
    expect(pathArr).toEqual('');
  });

  // set the getPointsInNumber array and store the results in variable and check if it returns expected results or not
  it('getPointsInNumber:: should return points based on hotspot', () => {
    component.height = 10;
    component.width = 10;
    const points = component.getPointsInNumber({ svgPointArray: ['a', 'b', 'c'] } as any);
    expect(points).toEqual([]);
  });

  // spy upon the methods which will be called from the PlayAudio function
  // call the function and check if appropriate methods is getting called and others are not
  it('PlayHotspot:: should play audio based on passed hotspot', () => {
    component.settingsService.DWELL_TIME_ENABLED = true;
    spyOn(component.dwellCursorService, 'stop');
    spyOn(component.audioPlayer, 'load');
    spyOn(component.audioPlayer, 'play');
    spyOn(window.speechSynthesis, 'speak');
    let hotspot = new SoundHotspot('test', [1,2,3], 'white', 'writeAudio', 2, imgBase64Mock);
    // component.PlayHotspot({type: 'writeAudio', base64sound: imgBase64Mock} as SoundHotspot);
    component.PlayHotspot(hotspot);
    expect(component.audioPlayer.load).not.toHaveBeenCalled();
    expect(component.audioPlayer.play).not.toHaveBeenCalled();
    expect(window.speechSynthesis.speak).toHaveBeenCalled();
  });

  // spy upon the methods which will be called from the PlayAudio function
  // call the function and check if appropriate methods is getting called and others are not
  it('PlayHotspot:: should not do anything if type is invalid', () => {
    component.settingsService.DWELL_TIME_ENABLED = true;
    spyOn(component.dwellCursorService, 'stop');
    spyOn(component.audioPlayer, 'load');
    spyOn(component.audioPlayer, 'play');
    spyOn(window.speechSynthesis, 'speak');
    component.PlayHotspot({type: null, base64sound: imgBase64Mock} as any);
    expect(component.audioPlayer.load).not.toHaveBeenCalled();
    expect(component.audioPlayer.play).not.toHaveBeenCalled();
    expect(window.speechSynthesis.speak).not.toHaveBeenCalled();
  });

  // set up an event object which will trigger the speechSynthesis from window
  // spy upon the speechSynthesis.speak and call function if it is getting called or not
  it('enterEvent:: should set attributes to element', () => {
    const event = {
      target: {
        setAttribute: () => {},
      },
      offsetX: 1,
      offsetY: 20
    } as any;
    component.modeService.currentDrawingTool = 'xyz';
    component.settingsService.SPEECH_SPEAKER = true;
    component.modeService.selectedMode = 'abc';
    spyOn(window.speechSynthesis, 'speak');
    component.enterEvent(event, { name: 'Top', strokeColor: '#000000' });
    expect(window.speechSynthesis.speak).toHaveBeenCalled();
  });

  // set up object for the dialog ref and return the same in dialog spy
  // check if all the success event of afterClosed are setting up or not
  it('clickEvent:: should open relative dialog', () => {
    spyOn(component, 'PlayHotspot');
    component.modeService.selectedMode = 'hotspot';
    component.modeService.currentDrawingTool = 'delete';
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue(
      { afterClosed: () => of(true), componentInstance: {selectedScene: null, selectedImage: null, hotspot: null, poly: null} } as any);
    component.clickEvent({target: null}, null);
    expect(component.PlayHotspot).not.toHaveBeenCalled();
    expect(component.modeService.selectedMode).toEqual('hotspot');
    expect(component.modeService.soundType).toEqual('import');
  });

  // setup variables which will be returned from the service
  // check if it is getting proper color from the service, and it is the same as service has set
  it('getColor:: should return stroke color from scene service', () => {
    sceneService.getImageHotspots.and.returnValue([{strokeColor: '#000'}] as any);
    expect(component.getColor(0)).toEqual('#000');
  });

  // use fakeAsync as it has timeout
  // spy upon all the methods which will be getting called via enter function
  // after calling and passing the time check if all the mentioned methods are getting called
  it('enter:: should play audio based on dwell time', fakeAsync(() => {
    component.settingsService.DWELL_TIME_ENABLED = true;
    spyOn(component.dwellCursorService, 'updatePositionSVGPolygonElement');
    spyOn(component.dwellCursorService, 'playToMax');
    spyOn(component, 'PlayHotspot');
    spyOn(component, 'getPointsInNumber');
    component.settingsService.DWELL_TIME_TIMEOUT_VALUE = 50;
    component.enter({target: null} as any, null);
    tick(60);
    expect(component.dwellCursorService.updatePositionSVGPolygonElement).toHaveBeenCalled();
    expect(component.dwellCursorService.playToMax).toHaveBeenCalled();
    expect(component.PlayHotspot).toHaveBeenCalled();
  }));
});
