import {Injectable} from '@angular/core';
import {Girl} from '../models/girl';
import {FiveStarGirl} from '../models/five.star.girl';
import {SixStarGirl} from '../models/six.star.girl';
import * as data from '../girls.json';
import {factions} from '../enums/faction';
import {stars} from '../enums/star';

@Injectable({
  providedIn: 'root'
})
export class ImportService {

  constructor() { }

  private static parseGirl(json: any) {
    if (json.grade === 6) {
      return new SixStarGirl(json);
    }
    if (json.grade === 5) {
      return new FiveStarGirl(json);
    }
    return new Girl(json.id, json.name, factions[json.faction], stars[json.grade]);
  }

  importGirls(): Girl[] {
    return data.girls.map(ImportService.parseGirl);
  }
}
