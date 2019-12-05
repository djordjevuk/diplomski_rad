import { Component, OnInit, Input } from '@angular/core';
import { FieldConfig } from 'src/app/config/field-config';
import { FormGroup } from '@angular/forms';
import { ConfigService } from 'src/app/services/config.service';
import { DataService } from 'src/app/services/data.service';
import { DataMap } from 'src/app/data/data-map';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ViewDataComponent } from 'src/app/view-data/view-data.component';
import { SearchForeignKeyObjectComponent } from 'src/app/search-foreign-key-object/search-foreign-key-object.component';
import { FormConfig } from 'src/app/config/form-config';

@Component({
    selector: 'app-inputforeignkey',
    template: `
  <div style="text-align: justify;" *ngIf="field.foreignKeyConfig.showForeignKeyDetails">
    <span style="font-weight: bold;">{{field.label}}:&nbsp;</span>
    <span>{{field.value}}</span>
    <button mat-icon-button matSuffix type="button" (click)="viewForeignKeyDetails()">
        <mat-icon class="view-mat-icon" aria-label="View details">remove_red_eye</mat-icon>
    </button>
  </div>
  <div *ngIf="!field.foreignKeyConfig.showForeignKeyDetails">
    <mat-form-field [appearance]="field.appearance" class="demo-full-width" [formGroup]="group" [floatLabel]="field.floatLabel">
      <mat-label>{{field.label}}</mat-label>
      <input matInput [formControlName]="field.name" [placeholder]="field.placeholder" 
        [required]="isRequired" [readonly]="field.readonly" [type]="field.inputType">
      <mat-hint><strong>{{field.hint}}</strong></mat-hint>
      <button mat-icon-button matSuffix type="button" (click)="searchForeignKeyObject()">
        <mat-icon class="inputforeignkey-icon" aria-label="Search">search</mat-icon>
      </button>
      <button mat-icon-button matSuffix type="button" (click)="deleteForeignKeyObject()">
        <mat-icon class="inputforeignkey-icon" aria-label="Delete">clear</mat-icon>
      </button>
      <ng-container *ngFor="let validation of field.validators;" ngProjectAs="mat-error">
       <mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
      </ng-container>
    </mat-form-field>
  </div>
  `,
    styles: ['mat-form-field { min-width: 180px; width: 20%; }']
})
export class InputForeignKeyComponent implements OnInit {
    field: FieldConfig;
    formConfig: FormConfig;
    group: FormGroup;
    @Input() allFormFields: FieldConfig[];
    foreignKeyData: DataMap<any>;
    viewDataFormFields: FieldConfig[] = [];
    relatedForeignKeysFormFields: FieldConfig[] = [];
    restServiceBaseUrl: string;

    constructor(private configService: ConfigService,
        private dataService: DataService,
        public dialog: MatDialog,
        private snackBar: MatSnackBar) { }

    ngOnInit() {
        this.field.readonly = true;
        if (this.field.isForeignKey) {
            this.configService.getAppConfig()
                .subscribe((respConfig: any) => {
                    this.formConfig = respConfig["formConfigDbObjects"][this.field.foreignKeyConfig.referencedTable];
                    this.viewDataFormFields = this.formConfig.formFieldsConfig;
                    this.restServiceBaseUrl = respConfig["restServiceBaseUrl"];
                    this.allFormFields.forEach(fld => {
                        if (fld.isForeignKey && (fld.foreignKeyConfig.referencedTable === this.field.foreignKeyConfig.referencedTable)) {
                            this.relatedForeignKeysFormFields.push(fld);
                        }
                    });
                });
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

    viewForeignKeyDetails() {
        this.dataService.getDataWithId(this.restServiceBaseUrl + "/" + this.field.foreignKeyConfig.referencedTable + "/" + this.field.foreignKeyConfig["value"])
            .subscribe((respData: DataMap<any>) => {
                this.foreignKeyData = respData;
                this.fillOutDataForm();
            },
            error => {
              this.snackBar.open("Server error while reading data.", "X",);
            });
    }

    searchForeignKeyObject() {
        let searchDialogRef = this.dialog.open(SearchForeignKeyObjectComponent, {
            maxWidth: '100vw',
            maxHeight: '100vh',
            height: '80%',
            width: '100%',
            data: {
                field: this.field,
                relatedFields: this.relatedForeignKeysFormFields
            }
        });
        searchDialogRef.afterClosed().subscribe((result: any) => {
            if (result) {
                this.relatedForeignKeysFormFields = result["relatedFields"];
                this.relatedForeignKeysFormFields.forEach(field => {
                    this.group.get(this.field.name).setValue(field.value);
                });
            }
        });
    }

    fillOutDataForm() {
        this.viewDataFormFields.forEach(field => {
            if (field.isForeignKey) {
                field.disabled = true;
                field.foreignKeyConfig.showForeignKeyDetails = true;
                field.value = this.foreignKeyData.dataObject[field.foreignKeyConfig.columnToShow];
                field.foreignKeyConfig.value = this.foreignKeyData.dataObject[field.name];
            }
            else {
                if (field.type === 'datetime') {
                    field.disabled = true;
                    field.value = new Date(this.foreignKeyData.dataObject[field.name]);
                }
                else {
                    field.value = this.foreignKeyData.dataObject[field.name];
                }
            }
        });
        const dialogRef = this.dialog.open(ViewDataComponent, {
            width: '50%',
            data: {
                fields: this.viewDataFormFields,
                typeData: this.field.foreignKeyConfig.referencedTable
            }
        });
    }

    deleteForeignKeyObject() {
        this.relatedForeignKeysFormFields.forEach(field => {
            this.group.get(this.field.name).setValue(null);
            field.foreignKeyConfig.value = null;
            field.value = null;
        });
    }

}
