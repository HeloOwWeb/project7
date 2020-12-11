import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Log } from '../../models/User.model';
import { UserService } from '../../services/user.service';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authStatus!: boolean;
  userFormLogin!: FormGroup;
  errorMsg!: string;

  constructor(private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userFormLogin = this.formBuilder.group({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
    });
  }

  onLogIn() {
    const formValue = this.userFormLogin.value;
    const objectUserLogin = new Log(
      formValue['email'],
      formValue['password']);
    this.userService.loginUser(objectUserLogin)
      .subscribe(data => {
        console.log(data);
      });
  }
}
