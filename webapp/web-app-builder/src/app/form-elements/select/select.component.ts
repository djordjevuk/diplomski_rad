import { Component, OnInit, Input } from '@angular/core';
import { FieldConfig } from 'src/app/config/field-config';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-select',
  template: `
  <div *ngIf="(!field.isPrimaryKey || (field.isPrimaryKey && field.isForeignKey)) && !field['showDetails']">
  <mat-form-field [appearance]="field.appearance" class="demo-full-width margin-top" [formGroup]="group" [floatLabel]="field.floatLabel">
    <mat-select [placeholder]="field.label" [formControlName]="field.name" [required]="isRequired">
      <mat-option *ngFor="let item of field.options" [value]="item">{{item}}</mat-option>
    </mat-select>
    <ng-container *ngFor="let validation of field.validators;" ngProjectAs="mat-error">
      <mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
    </ng-container>
  </mat-form-field>
  </div>
  <div style="text-align: justify;" *ngIf="(!field.isPrimaryKey || (field.isPrimaryKey && field.isForeignKey)) && field['showDetails']">
    <span style="font-weight: bold;">{{field.label}}:&nbsp;</span>
    <span>{{field.value}}</span>
  </div>
  `,
  styles: []
})
export class SelectComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  @Input() allFormFields: FieldConfig[];

  constructor() { }

  ngOnInit() {
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
