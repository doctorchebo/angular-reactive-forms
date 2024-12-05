import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

export class CustomValidators {
  static validateProjectName(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'Test') {
      return { nameIsInvalid: true };
    }
    return null;
  }

  static validateProjectNameAsync() {
    return (
      control: AbstractControl<any, any>
    ):
      | Promise<ValidationErrors | null>
      | Observable<ValidationErrors | null> => {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          if (control.value == 'TestProject') {
            resolve({ nameIsInvalid: true });
          } else {
            resolve(null);
          }
        }, 2000);
      });
      return promise;
    };
  }
}
