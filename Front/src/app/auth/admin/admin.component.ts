import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from '../../models/User.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  adminFormSign!: FormGroup;
  errorMsg!: string;
  authStatus!: boolean;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }


  initForm() {
    this.adminFormSign = this.formBuilder.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      confEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confPassword: ['', [Validators.required, Validators.minLength(6)]],
      accordTermsOfUse: [false, Validators.requiredTrue],
      passwordAdmin: ['', [Validators.required, Validators.minLength(6)]] // REGEXP
    });
  }


  onSubmitForm() {
    const formValue = this.adminFormSign.value;
    const objectUser = new Admin(
      formValue['lastname'],
      formValue['firstname'],
      formValue['email'],
      formValue['password'],
      formValue['accordTermsOfUse'],
      formValue['passwordAdmin']
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
