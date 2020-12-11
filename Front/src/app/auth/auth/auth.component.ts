import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  login: boolean = false;
  signup: boolean = false;
  admin: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  authLog() {
    this.login = true;
    this.signup = false;
    this.admin = false;
  }

  authSign() {
    this.signup = true;
    this.login = false;
    this.admin = false;
  }

  authAdmin() {
    this.admin = true;
    this.login = false;
    this.signup = false;
  }
}
