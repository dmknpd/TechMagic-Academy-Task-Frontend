import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormErrorsService {
  private setServerErrors(control: AbstractControl, errors: string[] | string) {
    if (!control) return;
    control.setErrors({ ...control.errors, serverError: errors });
  }

  private clearServerErrors(control: AbstractControl) {
    if (!control || !control.errors) return;
    const { serverError, ...rest } = control.errors;
    control.setErrors(Object.keys(rest).length ? rest : null);
  }

  setFormErrors(form: { [key: string]: AbstractControl }, errors: Record<string, string[]>) {
    for (const key in errors) {
      if (form[key]) {
        this.setServerErrors(form[key], errors[key]);
      }
    }
  }

  clearFormErrors(form: { [key: string]: AbstractControl }) {
    for (const key in form) {
      this.clearServerErrors(form[key]);
    }
  }
}
