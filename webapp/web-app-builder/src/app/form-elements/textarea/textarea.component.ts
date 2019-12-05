import { Component, OnInit, Input } from '@angular/core';
import { FieldConfig } from 'src/app/config/field-config';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  template: `
  <div *ngIf="(!field.isPrimaryKey || (field.isPrimaryKey && field.isForeignKey)) && !field['showDetails']">
  <mat-form-field [appearance]="field.appearance" class="demo-full-width" [formGroup]="group" [floatLabel]="field.floatLabel">
    <textarea matInput [formControlName]="field.name" [placeholder]="field.label" 
    [required]="isRequired" [readonly]="field.readonly"></textarea>
    <mat-hint><strong>{{field.hint}}</strong></mat-hint>
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
  styles: ['mat-form-field { min-width: 180px; width: 20%; }']
})
export class TextareaComponent implements OnInit {
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
