import {stars} from '../enums/star';
import {Girl} from './girl';
import {factions} from '../enums/faction';

export class FourStarGirl extends Girl {

  constructor(json: any) {
    super(json.id, json.name, factions[json.faction], stars[4]);
  }
}
