import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLog!: boolean;

  constructor(private user: UserService, private cookie: CookieService) { }

  ngOnInit(): void {
  }

  getColor() {
    this.isLog = this.user.stateConnect();
    if (this.isLog) {
      return '#091f42';
    }
    else {
      return '#d05059';
    }
  }

  logOut(){
    localStorage.clear();
    this.cookie.deleteAll();
    this.isLog = false;
  }
}
