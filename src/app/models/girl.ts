import {Faction, factions} from '../enums/faction';
import {Star, stars} from '../enums/star';

export class Girl {

  static readonly placeholders: { [key: string]: Girl } = {
    '4ghost': new Girl(null, null, factions.ghost, stars[4]),
    '4human': new Girl(null, null, factions.human, stars[4]),
    '4monster': new Girl(null, null, factions.monster, stars[4]),
    '4fairy': new Girl(null, null, factions.fairy, stars[4]),
    '4demon': new Girl(null, null, factions.demon, stars[4]),
    '4angel': new Girl(null, null, factions.angel, stars[4]),

    '5ghost': new Girl(null, null, factions.ghost, stars[5]),
    '5human': new Girl(null, null, factions.human, stars[5]),
    '5monster': new Girl(null, null, factions.monster, stars[5]),
    '5fairy': new Girl(null, null, factions.fairy, stars[5]),
    '5demon': new Girl(null, null, factions.demon, stars[5]),
    '5angel': new Girl(null, null, factions.angel, stars[5]),
  };

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
