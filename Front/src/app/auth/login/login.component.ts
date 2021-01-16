import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Log } from '../../models/User.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  authStatus!: boolean;
  userFormLogin!: FormGroup;
  errorMsg!: string;

  //Désabonnement
  private ngUnsubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userFormLogin = this.formBuilder.group({
      email: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern('(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{6,45}')]))
    });
  }

  onLogIn() {
    const formValue = this.userFormLogin.value;
    const objectUserLogin = new Log(
      formValue['email'],
      formValue['password']);
    this.userService.loginUser(objectUserLogin)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(() => {
        this.router.navigate(['/publication']);},
        error => {
          this.errorMsg = error.message;
        });
  }

  ngOnDestroy(): void{
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }
}
