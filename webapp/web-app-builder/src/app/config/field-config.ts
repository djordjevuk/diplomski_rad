import { Validator } from "./validator";
import { ForeignKeyConfig } from "./foreign-key-config";

//form field configuration
export interface FieldConfig {
    type: string;
    inputType?: string;
    datetimepickerType?: string;
    name: string;
    label: string;
    floatLabel?: string;
    placeholder?: string;
    hint?: string;
    appearance?: string;
    value?: any;
    options?: string[];
    order: number;
    readonly?: boolean;
    disabled?: boolean;
    showInTable?: boolean;
    validators?: Validator[];
    isPrimaryKey?: boolean;
    primaryKeyPosition?: number,
    isForeignKey?: boolean;
    foreignKeyConfig?: ForeignKeyConfig;
}