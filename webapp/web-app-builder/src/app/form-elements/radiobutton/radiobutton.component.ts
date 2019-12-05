import { Component, OnInit, Input } from '@angular/core';
import { FieldConfig } from 'src/app/config/field-config';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-radiobutton',
  template: `
  <div *ngIf="(!field.isPrimaryKey || (field.isPrimaryKey && field.isForeignKey)) && !field['showDetails']" class="demo-full-width margin-top" [formGroup]="group">
    <label class="radio-label-padding">{{field.label}}</label>
    <mat-radio-group [formControlName]="field.name">
      <mat-radio-button *ngFor="let item of field.options" [value]="item">{{item}}</mat-radio-button>
    </mat-radio-group>
    <ng-container *ngFor="let validation of field.validators;" ngProjectAs="mat-error">
      <mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
    </ng-container>
  </div>
  <div style="text-align: justify;" *ngIf="(!field.isPrimaryKey || (field.isPrimaryKey && field.isForeignKey)) && field['showDetails']">
    <span style="font-weight: bold;">{{field.label}}:&nbsp;</span>
    <span>{{field.value}}</span>
  </div>
  `,
  styles: []
})
export class RadiobuttonComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  @Input() allFormFields: FieldConfig[];

  constructor() { }

  ngOnInit() {
  }

}
