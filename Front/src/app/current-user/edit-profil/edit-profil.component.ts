import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { ProfilComponent } from '../profil/profil.component';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.scss']
})
export class EditProfilComponent implements OnInit, OnDestroy {

  //-----------------Formulaire
  putInfo!: FormGroup;
  errorMsg!: string;
  data = new FormData();
  //-----------------UPLOAD
  loadingUpload: boolean = false;
  file!: File;
  filePreview!: string;

  //Désabonnement
  private ngUnsubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(public dialogRef: MatDialogRef<ProfilComponent>, private formBuilder: FormBuilder, private UserService: UserService) { }

  ngOnInit(): void {
    this.initForm();
  }

  //--------------------------------------------------------------------------UPLOAD IMG/PNG/GIF
  fileSelect(event: any) {
    // Gestion de l'upload
    this.file = event.target.files[0];
    //Lecteur et ajout de l'objt pour visualisation
    const reader= new FileReader();
    reader.onload = () => {
      this.filePreview = reader.result as string;
    };
    reader.readAsDataURL(this.file);
    //Ajout de l'image dans le formData
    this.data.append('image', this.file);
  }
  //--------------------------------------------------------------------------FORMULAIRE
  initForm(){
    this.putInfo = this.formBuilder.group({
      description: ['']
    });
  }

  onSubmit(){
    //Récupération de la description
    const formValue = this.putInfo.value;
    const text = formValue['description'];
    //Ajout de la description dans le formData
    this.data.append('description', text);
    //Envoi de la modification Infos Current User
    this.UserService.modifyInfoCurrentUser(this.data)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(
        response => {
          console.log(response);
          this.dialogRef.close();
      });
  }

  ngOnDestroy(): void{
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }
}
