import { Component, OnInit } from '@angular/core';

import { Publication } from '../../models/Publication.model';
import { PublicationService } from '../../services/publication.service';

@Component({
  selector: 'app-publication-current',
  templateUrl: './publication-current.component.html',
  styleUrls: ['./publication-current.component.scss']
})
export class PublicationCurrentComponent implements OnInit {

  loadPublications: Publication[] = [];

  constructor(private publicationService: PublicationService) { }

  ngOnInit(): void {
    this.allPostCurrent();
  }

  allPostCurrent() {
    this.publicationService.getAllPostsCurrent()
      .subscribe(posts => {
        this.loadPublications = posts;
      })
  }
}
