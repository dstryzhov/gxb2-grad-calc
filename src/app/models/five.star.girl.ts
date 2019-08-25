import {Girl} from './girl';
import {stars} from '../enums/star';
import {factions} from '../enums/faction';

export class FiveStarGirl extends Girl {
  readonly requiredSelfQ = 4;
  readonly requiredFoodQ = 4;

  requiredFood: string;
  previousForm: string;

  constructor(json: any) {
    super(json.id, json.name, factions[json.faction], stars[5]);
    this.previousForm = json.previousForm;
    this.requiredFood = json.requiredFood;
  }
}
