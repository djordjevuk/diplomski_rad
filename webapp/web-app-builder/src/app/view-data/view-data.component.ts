import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { FieldConfig } from "src/app/config/field-config";
import { DataService } from "src/app/services/data.service";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-view-data',
  template: `
  <h1 mat-dialog-title>{{dialogTitle}}</h1>
  <hr/>
  <form class="dynamic-form" [formGroup]="form">
  <div mat-dialog-content>
      <div>
        <ng-container *ngFor="let field of fields;" dynamicField [field]="field" [group]="form" [allFormFields]="fields">
        </ng-container>
      </div>
      <hr/>
  </div>
  <mat-dialog-actions align="end">
        <button mat-button class="mat-button-save-background" type="button" (click)="onClose()">Close</button>
  </mat-dialog-actions>
  </form>
  `,
  styles: [],
  providers: [DataService]
})
export class ViewDataComponent implements OnInit {
  form: FormGroup;
  fields: FieldConfig[];
  dialogTitle: string = "";

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<ViewDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.fields = data["fields"];
    this.dialogTitle = data["typeData"];
    let first = this.dialogTitle[0];
    this.dialogTitle = this.dialogTitle.toLowerCase().replace(/[\_\-\\\/\*\+]+/gi, ' ');
    this.dialogTitle = first.toUpperCase() + this.dialogTitle.substring(1, this.dialogTitle.length);
  }

  ngOnInit() {
    this.form = this.createControl();
  }

  createControl() {
    const group = this.fb.group({});
    this.fields.forEach(field => {
      field.readonly = true;
      field["showDetails"] = true;
      const control = this.fb.control(
        {
          value: field.value,
          disabled: (field.type === 'radiobutton'
            || field.type === 'checkbox'
            || field.type === 'select'
            || field.type === 'datetime') ? true : false
        }
      );
      group.addControl(field.name, control);
    });
    return group;
  }

  onClose() {
    this.dialogRef.close();
  }

}
