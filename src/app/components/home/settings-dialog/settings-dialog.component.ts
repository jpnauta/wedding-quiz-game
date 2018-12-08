import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfigModel} from '../../../models/config-model';
import {ConfigService} from '../../../services/config.service';
import {FormService} from '../../../services/form.service';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent implements OnInit {
  form: FormGroup;
  model: ConfigModel;

  constructor(
    private dialogRef: MatDialogRef<SettingsDialogComponent>, private fb: FormBuilder,
    private configService: ConfigService, private fs: FormService) {
  }

  ngOnInit() {
    // Sync values
    this.configService.configSubject.subscribe((next) => {
      this.model = next;

      // Init form
      this.form = this.fb.group({
        numColumns: [null, this.fs.minMax(0, 100)],
        numPointsToWin: [null, this.fs.minMax(0, 10000)],
        numPointsPerClick: [null, this.fs.minMax(0, 10000)]
      });
    });
  }

  reset() {
    this.configService.reset();
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    this.configService.save(this.model);
    this.dialogRef.close();
  }
}
