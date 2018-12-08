import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {ConfigService} from '../../../services/config.service';
import {FormService} from '../../../services/form.service';
import {ConfigModel} from '../../../models/config-model';
import {QuizGroupModel} from '../../../models/quiz-group-model';

@Component({
  selector: 'app-groups-dialog',
  templateUrl: './groups-dialog.component.html',
  styleUrls: ['./groups-dialog.component.scss']
})
export class GroupsDialogComponent implements OnInit {
  form: FormGroup;
  model: ConfigModel;
  numColumns: number;

  constructor(
    private dialogRef: MatDialogRef<GroupsDialogComponent>, private fb: FormBuilder,
    private configService: ConfigService, private fs: FormService) {
  }

  ngOnInit() {
    // Sync values
    this.configService.configSubject.subscribe((next) => {
      this.model = next;
      this.numColumns = this.model.numColumns;

      // Init form
      this.form = this.fb.group({
        groups: this.fs.formArray(next.groups, this.fs.minSelectedCheckboxes(1)),
      });
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.configService.save(this.model);
    this.dialogRef.close();
  }

  removeGroup(group: QuizGroupModel) {
    this.configService.removeGroup(group);
  }

  appendGroup() {
    this.configService.appendGroup();
  }

  get groupForms(): FormArray {
    return <FormArray> this.form.get('groups');
  }
}
