import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value === '' || control.value === null) return null;
    const isWhitespace = control.value.trim().length === 0;
    return isWhitespace ? { whitespace: true } : null;
  };
}
