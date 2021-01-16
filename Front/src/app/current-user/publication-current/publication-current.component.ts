import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { Publication } from '../../models/Publication.model';
import { PublicationService } from '../../services/publication.service';
import { faHandshake, faGrinStars, faThumbsUp, faGrinSquintTears, faSadTear, faGrinHearts, faAngry, faSmile, IconDefinition } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-publication-current',
  templateUrl: './publication-current.component.html',
  styleUrls: ['./publication-current.component.scss']
})
export class PublicationCurrentComponent implements OnInit, OnDestroy {

  isLoad: boolean = false;
  empty: boolean = false;
  tabPublications$!: Observable<any>;
  responsePublications: any;
  //Icones
  like: IconDefinition = faThumbsUp;
  sadTear: IconDefinition = faSadTear;
  love: IconDefinition = faGrinHearts;
  angry: IconDefinition = faAngry;
  smile: IconDefinition = faSmile;
  lol: IconDefinition = faGrinSquintTears;
  wow: IconDefinition = faGrinStars;
  bravo: IconDefinition = faHandshake;

  //Désabonnement
  private ngUnsubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(private publicationService: PublicationService) { }

  ngOnInit(): void {
    this.allPostCurrent();
  }

  allPostCurrent() {
    this.tabPublications$ = this.publicationService.getAllPostsCurrent()
        .pipe(
          takeUntil(this.ngUnsubscribe$),
          map (datas => {
            const tab = [];
            this.responsePublications = datas;
            for(let i=0; i <this.responsePublications.length; i++){
              tab.push(this.responsePublications[i]);
            }
            this.isLoad= true;
            if(tab.length > 0){
              this.empty = false;
            }else{
              this.empty = true;
            }
            return tab;
        }));
  }

  ngOnDestroy(): void{
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }
}
