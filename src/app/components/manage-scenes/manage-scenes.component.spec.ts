import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ManageScenesComponent} from './manage-scenes.component';
import {MatDialogModule} from '@angular/material/dialog';
import {TranslateModule} from '@ngx-translate/core';
import {RouterTestingModule} from '@angular/router/testing';
import { ScenesService } from 'src/app/services/scenes.service';
import { of } from 'rxjs';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

describe('ManageScenesComponent', () => {
  let component: ManageScenesComponent;
  let fixture: ComponentFixture<ManageScenesComponent>;
  let sceneService: jasmine.SpyObj<ScenesService>;

  beforeEach(async(() => {
    const sceneServiceMock = jasmine.createSpyObj('ScenesService', ['getScenes', 'hideImage', 'hideScene', 'removeImage', 'removeScene']);
    TestBed.configureTestingModule({
      declarations: [ManageScenesComponent, ConfirmationDialogComponent],
      imports: [MatDialogModule, TranslateModule.forRoot(),RouterTestingModule],
      providers: [
        { provide: ScenesService, useValue: sceneServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageScenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    sceneService = TestBed.inject(ScenesService) as jasmine.SpyObj<ScenesService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('hide:: should hide images based on condition', () => {
    component.selectedScene = 0;
    component.selectedImage = 0;
    sceneService.getScenes.and.returnValue([{images: [{ name: 'abc' }], name: 'xyz'}] as any);
    component.imageSelected = true;
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue({ afterClosed: () => of(true) } as any);
    component.hide();
    expect(sceneService.hideImage).toHaveBeenCalled();
  });

  it('hide:: should hide scene based on condition', () => {
    component.selectedScene = 0;
    component.selectedImage = 0;
    sceneService.getScenes.and.returnValue([{images: [{ name: 'abc' }], name: 'xyz'}] as any);
    component.imageSelected = false;
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue({ afterClosed: () => of(true) } as any);
    component.hide();
    expect(sceneService.hideScene).toHaveBeenCalled();
  });

  it('hide:: should not hide scene if scene is not set', () => {
    component.selectedScene = 0;
    component.selectedImage = 0;
    sceneService.getScenes.and.returnValue([] as any);
    component.imageSelected = false;
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue({ afterClosed: () => of(true) } as any);
    component.hide();
    expect(sceneService.hideScene).not.toHaveBeenCalled();
  });

  it('hide:: should not hide scene if dialog is not closed', () => {
    component.selectedScene = 0;
    component.selectedImage = 0;
    sceneService.getScenes.and.returnValue([{images: [{ name: 'abc' }], name: 'xyz'}] as any);
    component.imageSelected = true;
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue({ afterClosed: () => of(false) } as any);
    component.hide();
    expect(sceneService.hideScene).not.toHaveBeenCalled();
  });

  it('remove:: should remove images based on condition', () => {
    component.selectedScene = 0;
    component.selectedImage = 0;
    sceneService.getScenes.and.returnValue([{images: [{ name: 'abc' }], name: 'xyz'}] as any);
    component.imageSelected = true;
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue({ afterClosed: () => of(true) } as any);
    component.remove();
    expect(sceneService.removeImage).toHaveBeenCalled();
  });

  it('remove:: should remove scene based on condition', () => {
    component.selectedScene = 0;
    component.selectedImage = 0;
    sceneService.getScenes.and.returnValue([{images: [{ name: 'abc' }], name: 'xyz'}] as any);
    component.imageSelected = false;
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue({ afterClosed: () => of(true) } as any);
    component.remove();
    expect(sceneService.removeScene).toHaveBeenCalled();
  });

  it('remove:: should not remove scene if scene is not set', () => {
    component.selectedScene = 0;
    component.selectedImage = 0;
    sceneService.getScenes.and.returnValue([] as any);
    component.imageSelected = false;
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue({ afterClosed: () => of(true) } as any);
    component.remove();
    expect(sceneService.removeScene).not.toHaveBeenCalled();
  });

  it('remove:: should not remove scene if dialog is not closed', () => {
    component.selectedScene = 0;
    component.selectedImage = 0;
    sceneService.getScenes.and.returnValue([{images: [{ name: 'abc' }], name: 'xyz'}] as any);
    component.imageSelected = true;
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue({ afterClosed: () => of(false) } as any);
    component.remove();
    expect(sceneService.removeScene).not.toHaveBeenCalled();
  });
});
