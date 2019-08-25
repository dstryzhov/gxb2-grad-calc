import {Girl} from './girl';
import {stars} from '../enums/star';
import {factions} from '../enums/faction';

export class SixStarGirl extends Girl {
  readonly requiredSelfQ = 2;
  readonly requiredFoodQ = 1;

  previousForm: string;
  requiredFood: string;


  constructor(json: any) {
    super(json.id, json.name, factions[json.faction], stars[6]);
    this.previousForm = json.previousForm;
    this.requiredFood = json.requiredFood;
  }
}
