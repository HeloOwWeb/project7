import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../../models/User.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  userFormSign!: FormGroup;
  errorMsg!: string;
  message: string= '';
  authStatus!: boolean;

  //Désabonnement
  private ngUnsubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(private notification: MatSnackBar,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userFormSign = this.formBuilder.group({
      lastname: ['', [Validators.required, Validators.pattern('^([A-Z{1}])?[a-zéèçà]{2,25}(-| )?([A-Z{1}])?([a-zéèçà]{2,25})?$')]],
      firstname: ['', [Validators.required, Validators.pattern('^([A-Z{1}])?[a-zéèçà]{2,25}(-| )?([A-Z{1}])?([a-zéèçà]{2,25})?$')]],
      email: ['', [Validators.required, Validators.email]],
      confEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{6,45}')]],
      confPassword: ['', [Validators.required, Validators.minLength(6), Validators.pattern('(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{6,45}')]],
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
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe((response) => {
          this.message = response.toString();
            this.notification.open(this.message, undefined, {
              duration: 4 * 1000
            });
          this.router.navigate(['/publication']);
        }, error => {
          this.errorMsg = error.message;
        }
      )
    } else if (email1 != email2) {
      this.errorMsg = "Il y a une différence entre les deux champs email. Merci de corriger votre saisie avant validation."
    } else if (password1 != password2) {
      this.errorMsg = "Il y a une différence entre les deux champs mot de passe. Merci de resaisir votre mot de passe."
    }
  }

  ngOnDestroy(): void{
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }
}
