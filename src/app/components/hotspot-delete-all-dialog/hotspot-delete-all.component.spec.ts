import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotspotDeleteAllComponent } from './hotspot-delete-all.component';
import {ScenesService} from '../../services/scenes.service';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';

describe('HotspotDeleteAllComponentComponent', () => {
  let component: HotspotDeleteAllComponent;
  let fixture: ComponentFixture<HotspotDeleteAllComponent>;
  let scenesService: jasmine.SpyObj<ScenesService>;

  beforeEach(async(() => {
    const sceneServiceMock = jasmine.createSpyObj('SceneService', ['removeAllHotspots']);
    TestBed.configureTestingModule({
      declarations: [ HotspotDeleteAllComponent ],
      imports: [TranslateModule.forRoot(), RouterTestingModule, HttpClientModule],
      providers: [
        { provide: ScenesService, useValue: sceneServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotspotDeleteAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    scenesService = TestBed.inject(ScenesService) as jasmine.SpyObj<ScenesService>;

    scenesService.SCENES = [{name: 'test', images: [{name: 'test', hotspots: [{name: 'a'}, {name: 'b'}]}]}] as any;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('removeAllHotspots:: should call removeAllHotspots from sceneService', () => {
    component.sceneDisplayService.selectedScene = 0;
    component.sceneDisplayService.selectedImage = 0;
    component.removeAllHotspots();
    expect(scenesService.removeAllHotspots).toHaveBeenCalled();
  });
});
