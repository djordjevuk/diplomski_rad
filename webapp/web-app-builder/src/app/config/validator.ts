import { Validators } from "@angular/forms";

export const validationErrorsMapper = {
    required: Validators.required,
    requiredTrue: Validators.requiredTrue,
    email: Validators.email,
    nullValidator: Validators.nullValidator
};

export const validatorFnMapper = {
    min: Validators.min,
    max: Validators.max,
    minlength: Validators.minLength,
    maxlength: Validators.maxLength,
    pattern: Validators.pattern,
};

export interface Validator {
    name: string;
    parameter?: any;
    message: string;
}