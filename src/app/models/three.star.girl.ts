import {Girl} from './girl';
import {stars} from '../enums/star';
import {factions} from '../enums/faction';

export class ThreeStarGirl extends Girl {

  constructor(json: any) {
    super(json.id, json.name, factions[json.faction], stars[3]);
  }
}
