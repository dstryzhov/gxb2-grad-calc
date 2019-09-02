import {Faction, factions} from '../enums/faction';
import {Star, stars} from '../enums/star';

export class Girl {
  id: string;
  name: string;
  faction: Faction;
  grade: Star;

  constructor(id: string, name: string, faction: Faction, grade: Star) {
    this.id = id;
    this.name = name;
    this.faction = faction;
    this.grade = grade;
  }
}

export class GraduatedGirl extends Girl {
  requiredFood: string;
  previousForm: string;
  requiredSelfQ: number;
  requiredFoodQ: number;
  fodderQ: number;


  constructor(json: any) {
    super(json.id, json.name, factions[json.faction], stars[json.grade]);
    this.requiredFood = json.requiredFood;
    this.previousForm = json.previousForm;
    if (json.grade === 5) {
      this.requiredSelfQ = 4;
      this.requiredFoodQ = 4;
      this.fodderQ = 4;
    } else if (json.grade === 6) {
      this.requiredSelfQ = 2;
      this.requiredFoodQ = 1;
      this.fodderQ = 3;
    }
  }
}
