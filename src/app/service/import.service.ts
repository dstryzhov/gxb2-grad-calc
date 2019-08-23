import {Injectable} from '@angular/core';
import {Girl} from '../models/girl';
import {SixStarGirl} from '../models/six.star.girl';
import * as data from '../girls.json';
import {FiveStarGirl} from '../models/five.star.girl';
import {FourStarGirl} from '../models/four.star.girl';
import {ThreeStarGirl} from '../models/three.star.girl';

@Injectable({
  providedIn: 'root'
})
export class ImportService {

  constructor() { }

  importGirls(): Girl[] {
    return [
      ...this.loadSixStars(),
      ...this.loadFiveStars(),
      ...this.loadFourStars(),
      ...this.loadThreeStars()
    ];
  }

  private loadSixStars(): SixStarGirl[] {
    return data['6stars'].map(girl => new SixStarGirl(girl));
  }

  private loadFiveStars(): FiveStarGirl[] {
    return data['5stars'].map(girl => new FiveStarGirl(girl));
  }

  private loadFourStars() {
    return data['4stars'].map(girl => new FourStarGirl(girl));
  }

  private loadThreeStars() {
    return data['3stars'].map(girl => new ThreeStarGirl(girl));
  }
}
