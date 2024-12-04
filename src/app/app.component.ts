import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  genders: string[] = ['male', 'female'];
  signupForm!: FormGroup;
  hobbies!: FormArray;
  forbiddenNames: string[] = ['Marcelo', 'Ivana'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          Validators.minLength(3),
          this.forbiddenNamesValidator.bind(this),
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          [this.forbiddenEmailValidator()]
        ),
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([]),
    });

    this.hobbies = <FormArray>this.signupForm.get('hobbies');

    this.signupForm.statusChanges.subscribe((status) => {
      console.log(status);
    });

    // this.signupForm.valueChanges.subscribe((value) => {
    //   console.log(value);
    // });

    this.signupForm.setValue({
      userData: {
        username: 'Chebo',
        email: 'chebo@gmail.com',
      },
      gender: 'male',
      hobbies: [],
    });
    this.signupForm.patchValue({
      userData: {
        username: 'Paul',
      },
    });
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  onAddHobby() {
    (<FormArray>this.signupForm.get('hobbies')).push(
      new FormControl(null, Validators.required)
    );
  }

  forbiddenNamesValidator(
    control: FormControl
  ): { [s: string]: boolean } | null {
    if (this.forbiddenNames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }

  forbiddenEmailValidator(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ):
      | Promise<ValidationErrors | null>
      | Observable<ValidationErrors | null> => {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'test@test.com') {
            resolve({ emailIsForbidden: true });
          } else {
            resolve(null);
          }
        }, 1500);
      });

      return promise;
    };
  }
}
