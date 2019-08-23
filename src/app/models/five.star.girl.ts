import {Girl} from './girl';
import {stars} from '../enums/star';
import {factions} from '../enums/faction';

export class FiveStarGirl extends Girl {
  private static REQUIRED_3_STAR_Q = 4;
  private static REQUIRED_4_STAR_Q = 4;
  private static REQUIRED_SELF_Q = 4;

  private requiredFood: string;
  private fourStarForm: string;

  constructor(json: any) {
    super(json.id, json.name, factions[json.faction], stars[5]);
    this.fourStarForm = json.fourStarForm;
    this.requiredFood = json.requiredFood;
  }
}
