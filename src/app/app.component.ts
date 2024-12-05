import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  signupForm: FormGroup;
  statuses: string[] = ['Stable', 'Critical', 'Finished'];
  submitted: boolean = false;

  ngOnInit() {
    this.signupForm = new FormGroup({
      projectName: new FormControl(
        null,
        [Validators.required, CustomValidators.validateProjectName],
        CustomValidators.validateProjectNameAsync()
      ),
      email: new FormControl(null, [Validators.required, Validators.email]),
      status: new FormControl('Stable'),
    });
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.signupForm);
  }
}
