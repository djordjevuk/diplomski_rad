import { TableConfig } from "./table-config";
import { FieldConfig } from "./field-config";

//form configuration
export interface FormConfig {
    dataTableConfig?: TableConfig;
    formFieldAppearance?: string;
    formFieldsConfig: FieldConfig[];
}