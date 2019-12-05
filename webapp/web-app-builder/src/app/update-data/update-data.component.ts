import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { FieldConfig } from "src/app/config/field-config";
import { DataService } from "src/app/services/data.service";
import { DataMap } from "../data/data-map";
import { validatorFnMapper, validationErrorsMapper } from "../config/validator";
import { Title } from "@angular/platform-browser";
import { ConfigService } from "../services/config.service";

@Component({
  selector: 'app-update-data',
  template: `
  <h3>{{updateDataHeaderText}}</h3>
  <form class="dynamic-form" [formGroup]="form" (submit)="onSubmit($event)">
    <div fxLayout="column" fxLayoutGap="35px">
      <div fxLayout="column" fxLayoutGap="8px">
        <ng-container *ngFor="let field of fields;" dynamicField [field]="field" [group]="form" [allFormFields]="fields">
        </ng-container>
      </div>
      <div fxLayout="row wrap" fxLayoutGap="10px" fxLayoutAlign="flex-start">
        <button mat-button class="mat-button-save-background" type="submit" >Save</button>
        <button mat-button class="mat-button-cancel-background" type="button" (click)="onCancel()">Cancel</button>
      </div>
    </div>
  </form>
  `,
  styles: []
})
export class UpdateDataComponent implements OnInit {
  @Input() fields: FieldConfig[] = [];
  @Input() primaryKeyFormFields: FieldConfig[] = [];
  @Input() fieldAppearance: string;
  @Input() dataForUpdate: DataMap<any>;
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  form: FormGroup;
  @Input() typeData: string;
  @Input() baseTitle: string;
  updateDataHeaderText: string = "Update ";
  restServiceBaseUrl: string;

  constructor(private fb: FormBuilder,
    private configService: ConfigService,
    private dataService: DataService,
    private titleService: Title) { }

  ngOnInit() {
    this.configService.getAppConfig()
      .subscribe((respConfig: any) => {
        this.restServiceBaseUrl = respConfig["restServiceBaseUrl"];
      });
    this.form = this.createControl();
    this.updateDataHeaderText += this.typeData.toLowerCase().replace(/[\_\-\\\/\*\+]+/gi, ' ');
    this.titleService.setTitle(this.baseTitle + " - " + this.updateDataHeaderText);
  }

  createControl() {
    const group = this.fb.group({});
    this.fields.forEach(field => {
      field.appearance = this.fieldAppearance;
      const control = this.fb.control(
        field.value,
        this.bindValidators(field.validators || [])
      );
      group.addControl(field.name, control);
    });
    return group;
  }

  bindValidators(validators: any[]) {
    if (validators.length > 0) {
      const validList = [];
      validators.forEach(valid => {
        if (validatorFnMapper[valid.name]) {
          validList.push(validatorFnMapper[valid.name](valid.parameter));
        } else {
          validList.push(validationErrorsMapper[valid.name]);
        }
      });
      return Validators.compose(validList);
    }
    return null;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    let jsonForSending = {};
    jsonForSending["dataObject"] = JSON.parse(JSON.stringify(this.form.value));
    if (this.form.valid) {
      this.fields.forEach(field => {
        if (field.isForeignKey) {
          jsonForSending["dataObject"][field.name] = field.foreignKeyConfig.value;
        }
      });
      let arrayPrimaryKeys = "";
      for (let j = 0; j < this.primaryKeyFormFields.length; j++) {
        arrayPrimaryKeys += "/" + jsonForSending["dataObject"][this.primaryKeyFormFields[j].name];
      }
      this.dataService.update(this.restServiceBaseUrl + "/" + this.typeData + arrayPrimaryKeys, jsonForSending)
        .subscribe(resp => {
          if (resp.status == 200) {
            this.dataForUpdate = { dataObject: jsonForSending["dataObject"] };
            this.fields.forEach(field => {
              if (field.isForeignKey) {
                this.dataForUpdate.dataObject[field.foreignKeyConfig.columnToShow] = field.value;
              }
            });
            this.submit.emit("okUpdate");
          }
          else {
            this.submit.emit("wrongUpdate");
          }
        },
          error => {
            this.submit.emit("wrongUpdate");
          });
      this.onSaveData();
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onCancel() {
    this.submit.emit("cancelUpdate");
  }

  onSaveData() {
    this.submit.emit("saveData");
  }


}
