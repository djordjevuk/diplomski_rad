import { Component, OnInit, Input } from '@angular/core';
import { FieldConfig } from 'src/app/config/field-config';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  template: `
  <div *ngIf="(!field.isPrimaryKey || (field.isPrimaryKey && field.isForeignKey)) && !field['showDetails']" [formGroup]="group">
    <mat-checkbox color="primary" [formControlName]="field.name" [required]="isRequired" [labelPosition]="field['labelPosition']">{{field.label}}</mat-checkbox>
    <ng-container *ngFor="let validation of field.validators;" ngProjectAs="mat-error">
      <mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
    </ng-container>
  </div>
  <div style="text-align: justify;" *ngIf="(!field.isPrimaryKey || (field.isPrimaryKey && field.isForeignKey)) && field['showDetails']" [formGroup]="group">
    <span style="font-weight: bold;">{{field.label}}:&nbsp;</span>
    <mat-checkbox [formControlName]="field.name" [required]="isRequired" labelPosition="before"></mat-checkbox>
  </div>
  `,
  styles: []
})
export class CheckboxComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  @Input() allFormFields: FieldConfig[];

  constructor() { }

  ngOnInit() {
    if(!this.field["labelPosition"]){
      this.field["labelPosition"] = "before"
    }
  }

  get isRequired() {
    if (this.field.validators) {
      for (let valid of this.field.validators) {
        if (valid.name === 'required') {
          return true;
        }
      }
    }
    return false;
  }

}
