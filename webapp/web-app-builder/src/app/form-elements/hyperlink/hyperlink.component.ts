import { Component, OnInit, Input } from '@angular/core';
import { FieldConfig } from 'src/app/config/field-config';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-hyperlink',
  template: `
    <a *ngIf="field.inputType === 'headerLink'" [routerLink]="baseUrl" class="mat-button" style="flex: 1;">
      <span class="mat-button-wrapper">{{field.label}}</span>
      <div class="mat-button-focus-overlay"></div>
    </a>
    <a *ngIf="field.inputType === 'sideLink'" [routerLink]="baseUrl" class="mat-button" style="flex: 1;">
      <span class="mat-button-wrapper">{{field.label}}</span>
      <div class="mat-button-focus-overlay"></div>
    </a>
  `,
  styles: []
})
export class HyperlinkComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  @Input() allFormFields: FieldConfig[];
  baseUrl: string = "/show-data/";

  constructor() {
  }

  ngOnInit() {
    this.baseUrl += this.field.name;
  }

}
