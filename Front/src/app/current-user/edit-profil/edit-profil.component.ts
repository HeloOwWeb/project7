import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.scss']
})
export class EditProfilComponent implements OnInit {

  //-----------------Formulaire
  putInfo!: FormGroup;
  errorMsg!: string;
  data = new FormData();
  //-----------------UPLOAD
  loadingUpload: boolean = false;
  file!: File;
  filePreview!: string;

  constructor(private formBuilder: FormBuilder, private UserService: UserService) { }

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
    console.log(this.data.getAll('image'));
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
    console.log(this.data.getAll('description'));
    //Envoi de la modification Infos Current User
    this.UserService.modifyInfoCurrentUser(this.data)
    .subscribe(
      response => {
        console.log(response);
        //this.dialogRef.close();
      });
  }
}
