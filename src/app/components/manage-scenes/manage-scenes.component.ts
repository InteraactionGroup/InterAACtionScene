import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ScenesService} from '../../services/scenes.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {RenameDialogComponent} from '../rename-dialog/rename-dialog.component';
import {ImportScenesDialogComponent} from '../import-scenes-dialog/import-scenes-dialog.component';
import {LanguageService} from '../../services/language.service';
import {ExportScenesDialogComponent} from '../export-scenes-dialog/export-scenes-dialog.component';
import {Scene} from '../../types';
import { SceneDisplayService } from '../../services/scene-display.service';

@Component({
  selector: 'app-manage-scenes',
  templateUrl: './manage-scenes.component.html',
  styleUrls: ['./manage-scenes.component.css']
})
export class ManageScenesComponent implements OnInit {

  @Input() selectedScene: number;
  @Input() selectedImage: number;
  @Input() imageSelected: boolean;
  @Output() updateScenes = new EventEmitter<string>();

  constructor(private scenesService: ScenesService,
              private sceneDisplayService: SceneDisplayService,
              private dialog: MatDialog,
              public languageService: LanguageService) {
  }

  ngOnInit(): void {
  }

  hide(): void {
    const SCENES = this.scenesService.getScenes();
    if (SCENES != null && SCENES.length !== 0) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '500px',
        data: 'Doyouwanttohide' +
          (this.imageSelected ? 'theimage ' + SCENES[this.selectedScene].images[this.selectedImage].name : 'thescene ' + SCENES[this.selectedScene].name) + ' ?'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (this.imageSelected) {
            this.scenesService.hideImage(this.selectedScene, this.selectedImage);
          } else {
            this.scenesService.hideScene(this.selectedScene);
          }
          this.updateScenes.emit('hide');
        }
      });
    }
  }

  remove(): void {
    const SCENES = this.scenesService.getScenes();
    if (SCENES != null && SCENES.length != 0) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '500px',
        data: 'Doyouconfirmthedeletionof' + (this.imageSelected ? 'theimage ' + SCENES[this.selectedScene].images[this.selectedImage].name : 'thescene ' + SCENES[this.selectedScene].name) + ' ?'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
         if (this.imageSelected == true) {
           if (this.scenesService.SCENES[this.selectedScene].images.length == 1 && this.selectedScene > 0) { // Si la scène n'a qu'une image
             let selectedSceneTemp = this.selectedScene; // Sauvegarde de la scène sélectionnée
             let selectedImageTemp = this.selectedImage; // Sauvegarde de l'image sélectionnée à supprimer

             this.sceneDisplayService.selectedScene -= 1; // On sélectionne la scène précédante
             this.sceneDisplayService.selectedImage = 0; // Et la première image de la scène
             this.scenesService.removeImage(selectedSceneTemp, selectedImageTemp); // Puis on supprime.
             // L'ordre est important pour que l'affichage des scènes et des images dans le menu gauche ne produit pas d'erreurs
           } else {
             this.scenesService.removeImage(this.selectedScene, this.selectedImage); // Sinon on supprime simplement l'image
           }
         } else {
           this.scenesService.SCENES[this.selectedScene].images = [];
           this.scenesService.removeScene(this.selectedScene);
           if (this.selectedScene > 0) {
             this.sceneDisplayService.selectedScene -= 1; // La scène sélectionnée devient la précédente, s'il y en a une
             this.sceneDisplayService.selectedImage = 0;
           }
         }
         this.updateScenes.emit('remove');


        }
      });
    }

  }

  rename(): void {
    const SCENES = this.scenesService.getScenes();
    if (SCENES != null && SCENES.length !== 0) {
      const dialogRef = this.dialog.open(RenameDialogComponent, {
        width: '350px',
      });
      dialogRef.componentInstance.selectedScene = this.selectedScene;
      dialogRef.componentInstance.selectedImage = this.selectedImage;
      dialogRef.componentInstance.imageSelected = this.imageSelected;
      dialogRef.afterClosed().subscribe(result => {
        this.updateScenes.emit('rename');
      });
    }
  }

  export(): void {
    const dialogRef = this.dialog.open(ExportScenesDialogComponent, {
      width: '350px',
    });
  }

  import(): void {
    const dialogRef = this.dialog.open(ImportScenesDialogComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.updateScenes.emit('import');
    });

  }

  getStatusHideShow(): boolean {
    return this.scenesService.statusHideShowSceneImage(this.selectedScene, this.selectedImage);
  }
}
