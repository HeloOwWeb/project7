import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/User.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  userFormSign!: FormGroup;
  errorMsg!: string;
  authStatus!: boolean;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userFormSign = this.formBuilder.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      confEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confPassword: ['', [Validators.required, Validators.minLength(6)]],
      accordTermsOfUse: [false, Validators.requiredTrue]
    });
  }

  onSubmitForm() {
    const formValue = this.userFormSign.value;
    const objectUser = new User(
      formValue['lastname'],
      formValue['firstname'],
      formValue['email'],
      formValue['password'],
      formValue['accordTermsOfUse']
    );

    const email1 = formValue['email'];
    const email2 = formValue['confEmail'];
    const password1 = formValue['password'];
    const password2 = formValue['confPassword'];

    if (email1 === email2 && password1 === password2) {
      this.userService.signupUser(objectUser)
        .subscribe(response => {
          console.log(response);
        }
      )
    }
  }
}
