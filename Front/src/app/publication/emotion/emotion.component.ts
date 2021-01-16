import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EmotionsService } from 'src/app/services/emotions.service';
import { faHandshake, faGrinStars, faThumbsUp, faGrinSquintTears, faSadTear, faGrinHearts, faAngry, faSmile, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-emotion',
  templateUrl: './emotion.component.html',
  styleUrls: ['./emotion.component.scss']
})
export class EmotionComponent implements OnInit, OnDestroy {
  //Parent id de la publication
  @Input() idPost!: number;
  //Variables compteurs Emotion
  countLike: number = 0;
  countClap: number = 0;
  countSad: number = 0;
  countSmile: number = 0;
  countAngry: number = 0;
  countHeart: number = 0;
  countLOL: number = 0;
  countWoah: number = 0;
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

  constructor(private emotionService: EmotionsService) { }

  ngOnInit(): void {
    this.getCountEmotion();
  }

  onLike(id: number){
    const objEmotion = {
      "isLike" : 1
    }
    this.emotionService.sendEmotion(id, objEmotion)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(info => {
        this.getCountEmotion();
    });
  }

  onHeart(id: number){
    const objEmotion = {
      "isHeart" : 1
    }
    this.emotionService.sendEmotion(id, objEmotion)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(info => {
        this.getCountEmotion();
    });
  }

  onSmile(id: number){
    const objEmotion = {
      "isSmile" : 1
    }
    this.emotionService.sendEmotion(id, objEmotion)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(info => {
        this.getCountEmotion();
    });
  }

  onLOL(id: number){
    const objEmotion = {
      "isLOL" : 1
    }
    this.emotionService.sendEmotion(id, objEmotion)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(info => {
        this.getCountEmotion();
    });
  }

  onClap(id: number){
    const objEmotion = {
      "isClap" : 1
    }
    this.emotionService.sendEmotion(id, objEmotion)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(info => {
        this.getCountEmotion();
    });
  }

  onWoah(id: number){
    const objEmotion = {
      "isWoah" : 1
    }
    this.emotionService.sendEmotion(id, objEmotion)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(info => {
        this.getCountEmotion();
    });
  }

  onSad(id: number){
    const objEmotion = {
      "isSad" : 1
    }
    this.emotionService.sendEmotion(id, objEmotion)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(info => {
        this.getCountEmotion();
    });
  }

  onAngry(id: number){
    const objEmotion = {
      "isAngry" : 1
    }
    this.emotionService.sendEmotion(id, objEmotion)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(() => {
        this.getCountEmotion();
    });
  }

  getCountEmotion(){
    this.emotionService.getEmotionsPublication(this.idPost)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(datas => {
        this.countLike = datas.countLike;
        this.countClap = datas.countClap;
        this.countSad = datas.countSad;
        this.countSmile = datas.countSmile;
        this.countAngry = datas.countAngry;
        this.countHeart = datas.countHeart;
        this.countLOL = datas.countLOL;
        this.countWoah = datas.countWoah;
      });
  }

  ngOnDestroy(): void{
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }
}
