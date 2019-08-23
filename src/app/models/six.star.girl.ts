import {Girl} from './girl';
import {stars} from '../enums/star';
import {factions} from '../enums/faction';

export class SixStarGirl extends Girl {
  private static REQUIRED_SELF_Q = 2;
  private static REQUIRED_FOOD_Q = 3;

  private fiveStarForm: string;
  private requiredFood: string;


  constructor(json: any) {
    super(json.id, json.name, factions[json.faction], stars[6]);
    this.fiveStarForm = json.self5star;
    this.requiredFood = json.requiredFood;
  }
}
