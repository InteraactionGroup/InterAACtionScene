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

  // check if calls specific service function if passing required params
  it('hide:: should hide images based on condition', () => {
    component.selectedScene = 0;
    component.selectedImage = 0;
    // @ts-ignore
    sceneService.getScenes.and.returnValue([{images: [{ name: 'abc' }], name: 'xyz'}] as any);
    component.imageSelected = true;
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue({ afterClosed: () => of(true) } as any);
    component.hide();
    expect(sceneService.hideImage).toHaveBeenCalled();
  });

  // check if it calls specific service function if passing required params
  it('hide:: should hide scene based on condition', () => {
    component.selectedScene = 0;
    component.selectedImage = 0;
    // @ts-ignore
    sceneService.getScenes.and.returnValue([{images: [{ name: 'abc' }], name: 'xyz'}] as any);
    component.imageSelected = false;
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue({ afterClosed: () => of(true) } as any);
    component.hide();
    expect(sceneService.hideScene).toHaveBeenCalled();
  });

  // check if it doesn't call specific service function if not passing required params
  it('hide:: should not hide scene if scene is not set', () => {
    component.selectedScene = 0;
    component.selectedImage = 0;
    // @ts-ignore
    sceneService.getScenes.and.returnValue([] as any);
    component.imageSelected = false;
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue({ afterClosed: () => of(true) } as any);
    component.hide();
    expect(sceneService.hideScene).not.toHaveBeenCalled();
  });

  // check if it calls specific service function if passing required params
  it('hide:: should not hide scene if dialog is not closed', () => {
    component.selectedScene = 0;
    component.selectedImage = 0;
    // @ts-ignore
    sceneService.getScenes.and.returnValue([{images: [{ name: 'abc' }], name: 'xyz'}] as any);
    component.imageSelected = true;
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue({ afterClosed: () => of(false) } as any);
    component.hide();
    expect(sceneService.hideScene).not.toHaveBeenCalled();
  });

  // check if it calls specific service function if passing required params
  it('remove:: should remove images based on condition', () => {
    component.selectedScene = 0;
    component.selectedImage = 0;
    // @ts-ignore
    sceneService.getScenes.and.returnValue([{images: [{ name: 'abc' }], name: 'xyz'}] as any);
    component.imageSelected = true;
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue({ afterClosed: () => of(true) } as any);
    component.remove();
    expect(sceneService.removeImage).toHaveBeenCalled();
  });

  // check if it calls specific service function if passing required params
  it('remove:: should remove scene based on condition', () => {
    component.selectedScene = 0;
    component.selectedImage = 0;
    // @ts-ignore
    sceneService.getScenes.and.returnValue([{images: [{ name: 'abc' }], name: 'xyz'}] as any);
    component.imageSelected = false;
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue({ afterClosed: () => of(true) } as any);
    component.remove();
    expect(sceneService.removeScene).toHaveBeenCalled();
  });

  // check if it calls specific service function if passing required params
  it('remove:: should not remove scene if scene is not set', () => {
    component.selectedScene = 0;
    component.selectedImage = 0;
    // @ts-ignore
    sceneService.getScenes.and.returnValue([] as any);
    component.imageSelected = false;
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue({ afterClosed: () => of(true) } as any);
    component.remove();
    expect(sceneService.removeScene).not.toHaveBeenCalled();
  });

  // check if it calls specific service function if passing required params
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

  // check if it opens the dialog
  it('rename:: should open rename dialog with data', () => {
    // @ts-ignore
    sceneService.getScenes.and.returnValue([{images: [{ name: 'abc' }], name: 'xyz'}] as any);
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue({ afterClosed: () => of(true),
      componentInstance: { selectedScene: null, selectedImage: null, imageSelected: null} } as any);
    component.rename();
    // @ts-ignore
    expect(component.dialog.open).toHaveBeenCalled();
  });

  // check if it opens the dialog
  it('rename:: should not open rename dialog if scene is not present', () => {
    // @ts-ignore
    sceneService.getScenes.and.returnValue([] as any);
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue({ afterClosed: () => of(true),
      componentInstance: { selectedScene: null, selectedImage: null, imageSelected: null} } as any);
    component.rename();
    // @ts-ignore
    expect(component.dialog.open).not.toHaveBeenCalled();
  });

  // check if it opens the dialog
  it('export:: should open export dialog', () => {
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue(true);
    component.export();
    // @ts-ignore
    expect(component.dialog.open).toHaveBeenCalled();
  });

  // check if it opens the dialog
  it('import:: should open import dialog', () => {
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue({ afterClosed: () => of(true)});
    component.import();
    // @ts-ignore
    expect(component.dialog.open).toHaveBeenCalled();
  });
});
