import {Faction} from '../enums/faction';
import {Star} from '../enums/star';

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
