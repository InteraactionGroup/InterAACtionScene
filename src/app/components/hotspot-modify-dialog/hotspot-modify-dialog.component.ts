import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, ReactiveFormsModule  } from '@angular/forms';
import { ScenesService } from '../../services/scenes.service';
import {ModeService} from "../../services/mode.service";

@Component({
  selector: 'app-hotspot-create-dialog',
  templateUrl: './hotspot-modify-dialog.component.html',
  styleUrls: ['./hotspot-modify-dialog.component.css']
})
export class HotspotModifyDialogComponent implements OnInit {

  @Input() selectedScene: number;
  @Input() selectedImage: number;
  @Input() index: number;
  @Input() poly;
  form: FormGroup;
  selectedSound = null;
  name = '';
  error = '';
  svgPath: number[];
  constructor(
    private scenesService: ScenesService,
    private formBuilder: FormBuilder,
    private modeService: ModeService,
    private dialogRef: MatDialogRef<HotspotModifyDialogComponent>
  ) { }

  ngOnInit(): void {
    // name: string;
    // svgPointArray: number[]; // Each point is in percentage
    // strokeColor: string;
    // base64sound: string;
    // this.modeService.hotspots[this.index]
    this.form = this.formBuilder.group({
      soundSelected: '',
      name: this.modeService.hotspots[this.index].name,
      color: this.modeService.hotspots[this.index].strokeColor
    });
  }

  onSoundSelected(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedSound = reader.result;
    };

    reader.onerror = (error) => {
     console.log('Error: ', error);
    };
    this.error = '';
  }


  submit(form) {
    this.modeService.hotspots[this.index].strokeColor = `${form.value.color}`;
    this.modeService.hotspots[this.index].name = `${form.value.name}`;
    this.modeService.currentDrawingTool = '';
    if(this.selectedSound!=='' && this.selectedSound!==null){
      this.modeService.hotspots[this.index].base64sound = this.selectedSound;
    }
    this.poly.node.setAttribute('stroke', this.modeService.hotspots[this.index].strokeColor);
    this.dialogRef.close();
  }
}
