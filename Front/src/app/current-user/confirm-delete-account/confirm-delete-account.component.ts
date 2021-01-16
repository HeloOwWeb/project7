import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { ProfilComponent } from '../profil/profil.component';

@Component({
  selector: 'app-confirm-delete-account',
  templateUrl: './confirm-delete-account.component.html',
  styleUrls: ['./confirm-delete-account.component.scss']
})
export class ConfirmDeleteAccountComponent implements OnInit, OnDestroy {

  //Formulaire
  confirmDelete!: FormGroup;
  //Vérification
  compte!: string;
  messageError: boolean = false;

  //Désabonnement
  private ngUnsubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(private cookie: CookieService, public dialogRef: MatDialogRef<ProfilComponent>, private userService : UserService, private router: Router, private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public user: { prenom : string, nom : string }) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.confirmDelete = this.formBuilder.group({
      sentence: ['']
    });
  }

  onSubmit(){
    const formValue = this.confirmDelete.value;
    const sentence = formValue['sentence'];
    const formatPrenom = this.user.prenom.charAt(0).toUpperCase() + this.user.prenom.substring(1).toLowerCase();
    this.compte = String(formatPrenom + this.user.nom);

    if( sentence === this.compte){
      this.userService.deleteAccount()
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe((info) => {
          console.log(info);
          this.dialogRef.close();
          this.cookie.deleteAll();
          localStorage.clear();
          this.router.navigate(['/auth']);
      })
    } else {
      this.messageError = true;
    }
  }

  ngOnDestroy(): void{
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }
}
