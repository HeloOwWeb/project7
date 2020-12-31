import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { EmotionsService } from 'src/app/services/emotions.service';

@Component({
  selector: 'app-emotion',
  templateUrl: './emotion.component.html',
  styleUrls: ['./emotion.component.scss']
})
export class EmotionComponent implements OnInit {
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

  constructor(private emotionService: EmotionsService) { }

  ngOnInit(): void {
    this.getCountEmotion();
  }

  onLike(id: number){
    const objEmotion = {
      "isLike" : 1
    }
    this.emotionService.sendEmotion(id, objEmotion)
    .subscribe(info => {
      this.getCountEmotion();
    });
  }

  onHeart(id: number){
    const objEmotion = {
      "isHeart" : 1
    }
    this.emotionService.sendEmotion(id, objEmotion)
    .subscribe(info => {
      this.getCountEmotion();
    });
  }

  onSmile(id: number){
    const objEmotion = {
      "isSmile" : 1
    }
    this.emotionService.sendEmotion(id, objEmotion)
    .subscribe(info => {
      this.getCountEmotion();
    });
  }

  onLOL(id: number){
    const objEmotion = {
      "isLOL" : 1
    }
    this.emotionService.sendEmotion(id, objEmotion)
    .subscribe(info => {
      this.getCountEmotion();
    });
  }

  onClap(id: number){
    const objEmotion = {
      "isClap" : 1
    }
    this.emotionService.sendEmotion(id, objEmotion)
    .subscribe(info => {
      this.getCountEmotion();
    });
  }

  onWoah(id: number){
    const objEmotion = {
      "isWoah" : 1
    }
    this.emotionService.sendEmotion(id, objEmotion)
    .subscribe(info => {
      this.getCountEmotion();
    });
  }

  onSad(id: number){
    const objEmotion = {
      "isSad" : 1
    }
    this.emotionService.sendEmotion(id, objEmotion)
    .subscribe(info => {
      this.getCountEmotion();
    });
  }

  onAngry(id: number){
    const objEmotion = {
      "isAngry" : 1
    }
    this.emotionService.sendEmotion(id, objEmotion)
    .subscribe(() => {
      this.getCountEmotion();
    });
  }

  getCountEmotion(){
    this.emotionService.getEmotionsPublication(this.idPost)
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

}
