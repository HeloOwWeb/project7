import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Publication } from '../../models/Publication.model';
import { PublicationService } from '../../services/publication.service';

@Component({
  selector: 'app-publication-current',
  templateUrl: './publication-current.component.html',
  styleUrls: ['./publication-current.component.scss']
})
export class PublicationCurrentComponent implements OnInit {

  tabPublications$!: Observable<any>;
  responsePublications: any;

  constructor(private publicationService: PublicationService) { }

  ngOnInit(): void {
    this.allPostCurrent();
  }

  allPostCurrent() {
    this.tabPublications$ = this.publicationService.getAllPostsCurrent()
        .pipe( map (
          datas => {
            console.log(datas);
            const tab = [];
            this.responsePublications = datas;
            for(let i=0; i <this.responsePublications.length; i++){
              tab.push(this.responsePublications[i]);
            }
            return tab;
        }));
  }
}
