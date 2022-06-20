import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HotspotDeleteDialogComponent} from './hotspot-delete-dialog.component';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ScenesService } from 'src/app/services/scenes.service';
import { LanguageService } from 'src/app/services/language.service';
import { TranslateModule } from '@ngx-translate/core';

describe('HotspotDeleteDialogComponent', () => {
  let component: HotspotDeleteDialogComponent;
  let fixture: ComponentFixture<HotspotDeleteDialogComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<HotspotDeleteDialogComponent>>;
  let sceneService: jasmine.SpyObj<ScenesService>;

  beforeEach(async(() => {
    // tslint:disable-next-line:no-shadowed-variable
    const dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    const sceneServiceMock = jasmine.createSpyObj('ScenesService', ['updateScenes']);
    TestBed.configureTestingModule({
      declarations: [HotspotDeleteDialogComponent],
      imports: [MatDialogModule, FormsModule, ReactiveFormsModule,
        TranslateModule.forRoot()],
      providers: [
        {
          provide: MatDialogRef,
          useValue: dialogRef
        },
        { provide: ScenesService, useValue: sceneServiceMock },
        LanguageService,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotspotDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<HotspotDeleteDialogComponent>>;
    sceneService = TestBed.inject(ScenesService) as jasmine.SpyObj<ScenesService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // check if it calls specific service method with specific variables set
  it('submit:: should delete hotspot and update scenes', () => {
    component.selectedScene = 0;
    component.selectedImage = 0;
    sceneService.SCENES = [{images: [{ hotspots: [{ name: 'Center' }]}]}] as any;
    component.hotspot = {name: ''} as any;
    component.submit();
    expect(sceneService.updateScenes).toHaveBeenCalled();
    expect(dialogRef.close).toHaveBeenCalled();
   });

  // check if it calls specific service method with specific variables set
  it('submit:: should delete hotspot and update scenes', () => {
    component.selectedScene = 0;
    component.selectedImage = 0;
    sceneService.SCENES = [{images: [{ hotspots: [{ name: 'Abc' }]}]}] as any;
    component.hotspot = {name: 'xyz'} as any;
    component.submit();
    expect(sceneService.updateScenes).toHaveBeenCalled();
    expect(dialogRef.close).toHaveBeenCalled();
   });

  // check if it is calls specific service method with specific variables set
  it('submit:: should delete hotspot and update scenes', () => {
    component.selectedScene = 0;
    component.selectedImage = undefined;
    sceneService.SCENES = [{images: [{ hotspots: [{ name: 'Center' }]}]}] as any;
    component.hotspot = {name: ''} as any;
    component.submit();
    expect(sceneService.updateScenes).toHaveBeenCalled();
    expect(dialogRef.close).toHaveBeenCalled();
   });
});
