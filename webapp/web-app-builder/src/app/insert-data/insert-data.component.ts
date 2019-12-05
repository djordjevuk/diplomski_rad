import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { FieldConfig } from "src/app/config/field-config";
import { DataService } from "src/app/services/data.service";
import { DataMap } from "../data/data-map";
import { validatorFnMapper, validationErrorsMapper } from "../config/validator";
import { Title } from "@angular/platform-browser";
import { ConfigService } from "../services/config.service";

@Component({
  selector: 'app-insert-data',
  template: `
  <h3>{{insertDataHeaderText}}</h3>
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
export class InsertDataComponent implements OnInit {
  @Input() fields: FieldConfig[] = [];
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  form: FormGroup;
  insertedData: DataMap<any>;
  @Input() typeData: string;
  @Input() fieldAppearance: string;
  @Input() baseTitle: string;
  insertDataHeaderText: string = "Insert ";
  restServiceBaseUrl: string;

  constructor(private fb: FormBuilder,
    private configService: ConfigService,
    private dataService: DataService,
    private titleService: Title) {
    }

  ngOnInit() {
    this.configService.getAppConfig()
      .subscribe((respConfig: any) => {
        this.restServiceBaseUrl = respConfig["restServiceBaseUrl"];
      });
    this.form = this.createControl();
    this.insertDataHeaderText += this.typeData.toLowerCase().replace(/[\_\-\\\/\*\+]+/gi,' ');
    this.titleService.setTitle(this.baseTitle + " - " + this.insertDataHeaderText);
  }

  createControl() {
    const group = this.fb.group({});
    this.fields.forEach(field => {
      field.appearance = this.fieldAppearance;
      if (field.type === 'checkbox') {
        const control = this.fb.control(
          false,
          this.bindValidators(field.validators || [])
        );
        group.addControl(field.name, control);
      } else {
        const control = this.fb.control(
          field.value,
          this.bindValidators(field.validators || [])
        );
        group.addControl(field.name, control);
      }
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
        if(field.isForeignKey){
          jsonForSending["dataObject"][field.name] = field.foreignKeyConfig.value;
        }
      });
      this.dataService.insertData(this.restServiceBaseUrl + "/" + this.typeData, jsonForSending)
        .subscribe((resp: DataMap<any>) => {
          this.insertedData = resp;
          this.fields.forEach(field => {
            if(field.isForeignKey){
              this.insertedData.dataObject[field.foreignKeyConfig.columnToShow] = field.value;
            }
          });
          resp ? this.submit.emit("okInsert") : this.submit.emit("wrongInsert");
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
    this.submit.emit("cancelInsert");
  }

  onSaveData() {
    this.submit.emit("saveData");
  }

}
