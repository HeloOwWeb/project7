import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-space',
  templateUrl: './admin-space.component.html',
  styleUrls: ['./admin-space.component.scss']
})
export class AdminSpaceComponent implements OnInit, OnDestroy {
  //Création de a source des données (!) ordre visuel des colonnes
  datasListUsers! : MatTableDataSource<any>;
  //Paramétrage nom colonne
  displayedColumns: string[] = ['firstname', 'lastname', 'delete'];

  //Désabonnement
  private ngUnsubscribe$: Subject<boolean> = new Subject<boolean>();

  //Erreur
  errorMsg: String='';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
    this.userService.getListUsers()
    .subscribe( datas => {
      this.datasListUsers = new MatTableDataSource(datas);
    }, error => {
      this.errorMsg = error.message;
    });
  }

  filter(event : Event){
    const searchValue = (event.target as HTMLInputElement).value;
    this.datasListUsers.filter = searchValue.trim().toLowerCase();
  }

  deleteUser(id: string){
    this.userService.adminDeleteAccount(id)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe( () => { this.getAllUsers(); },
        error => { this.errorMsg = error.message; });
  }

  ngOnDestroy(): void{
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }
}
