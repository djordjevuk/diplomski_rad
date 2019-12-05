import { Component, OnInit, Input } from '@angular/core';
import { FieldConfig } from 'src/app/config/field-config';
import { FormGroup } from '@angular/forms';

export const LOCAL_FORMATS = {
  parseInput: 'D.M.YYYY HH:mm',
  fullPickerInput: 'D.M.YYYY HH:mm',
  datePickerInput: 'D.M.YYYY',
  timePickerInput: 'HH:mm',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY',
};

export const TIME_OPTIONS = {
  hour12: false,
  hour: "2-digit",
  minute: "2-digit"
}

@Component({
  selector: 'app-datetime',
  template: `
  <div *ngIf="(!field.isPrimaryKey || (field.isPrimaryKey && field.isForeignKey)) && !field['showDetails']">
    <mat-form-field [appearance]="field.appearance" class="demo-full-width margin-top" [formGroup]="group" [floatLabel]="field.floatLabel">
      <input matInput [owlDateTime]="datetimepicker" [formControlName]="field.name" [placeholder]="field.label" 
        [readonly]="field.readonly" [required]="isRequired">
        <button mat-icon-button [owlDateTimeTrigger]="datetimepicker" matSuffix type="button" *ngIf="!field.disabled">
          <mat-icon class="datetimepicker-icon" aria-label="Datetime">event</mat-icon>
        </button>
        <owl-date-time #datetimepicker [startAt]="start" firstDayOfWeek="1" [pickerType]="field.datetimepickerType" [disabled]="field.disabled"></owl-date-time>
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
export class DatetimeComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  @Input() allFormFields: FieldConfig[];
  start: Date;
  constructor() {
  }

  ngOnInit() {
    if (this.field.value) {
      this.start = new Date(this.field.value);
    } else {
      this.start = new Date();
    }
    this.start.setMilliseconds(0);
    this.start.setSeconds(0);
    if (!this.field.datetimepickerType) {
      this.field.datetimepickerType = 'both';
    }
    if (this.field['showDetails']) {
      if (this.field.value != null) {
        let date = new Date(this.field.value);
        date.setHours(date.getUTCHours());
        date.setMinutes(date.getUTCMinutes());
        this.field.value = date;
        if (!this.field.datetimepickerType || this.field.datetimepickerType === 'both') {
          this.field.value = date.toLocaleDateString("sr-RS") + ' ' + date.toLocaleTimeString("sr-RS", TIME_OPTIONS);
        } else if (this.field.datetimepickerType === 'timer') {
          this.field.value = date.toLocaleTimeString("sr-RS", TIME_OPTIONS);
        } else {
          this.field.value = date.toLocaleDateString("sr-RS");
        }
      } else {
        this.field.value = "";
      }
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
