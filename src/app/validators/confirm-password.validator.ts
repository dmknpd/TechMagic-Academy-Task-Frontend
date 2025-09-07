import { AbstractControl, ValidationErrors } from '@angular/forms';

export function confirmPasswordValidator(passwordControlName: string) {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.parent) return null;
    const password = control.parent.get(passwordControlName)?.value;
    const confirmPassword = control.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  };
}
