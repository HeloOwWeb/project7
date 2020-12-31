import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-four-oh-four',
  templateUrl: './four-oh-four.component.html',
  styleUrls: ['./four-oh-four.component.scss']
})
export class FourOhFourComponent implements OnInit {
  linkImg!: string;
  private url: string = "../../assets/img/404/";

  constructor() { }

  ngOnInit(): void {
    this.selectSrcImage();
  }

  selectSrcImage() {
    const number = Math.floor((Math.random() * 4) + 1);
    this.linkImg = this.url + number+ ".jpg";
  }
}
