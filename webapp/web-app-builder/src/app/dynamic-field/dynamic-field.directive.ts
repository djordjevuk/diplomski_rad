import { ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../config/field-config";
import { InputComponent } from "../form-elements/input/input.component";
import { SelectComponent } from "../form-elements/select/select.component";
import { RadiobuttonComponent } from "../form-elements/radiobutton/radiobutton.component";
import { CheckboxComponent } from "../form-elements/checkbox/checkbox.component";
import { TextareaComponent } from "../form-elements/textarea/textarea.component";
import { DatetimeComponent } from "../form-elements/datetime/datetime.component";
import { HyperlinkComponent } from "../form-elements/hyperlink/hyperlink.component";
import { InputForeignKeyComponent } from "../form-elements/inputforeignkey/inputforeignkey.component";

const componentMapper = {
  input: InputComponent,
  inputforeignkey: InputForeignKeyComponent,
  select: SelectComponent,
  datetime: DatetimeComponent,
  radiobutton: RadiobuttonComponent,
  checkbox: CheckboxComponent,
  textarea: TextareaComponent,
  hyperlink: HyperlinkComponent
};

@Directive({
  selector: '[dynamicField]'
})
export class DynamicFieldDirective implements OnInit {
  @Input() field: FieldConfig;
  @Input() group: FormGroup;
  @Input() allFormFields: FieldConfig[];
  componentRef: any;

  constructor(private resolver: ComponentFactoryResolver, private container: ViewContainerRef) { }

  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(
      componentMapper[this.field.type]
    );
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;
    this.componentRef.instance.allFormFields = this.allFormFields;
  }

}
