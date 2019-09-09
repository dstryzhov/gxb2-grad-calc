import {InventoryEntry} from './inventory.entry';
import {Girl, GraduatedGirl} from './girl';
import {stars} from '../enums/star';

export class GradCard {
  targetGirl: GraduatedGirl;
  food: InventoryEntry[] = [];
  fodder: InventoryEntry[] = [];

  constructor(targetGirl: GraduatedGirl) {
    this.targetGirl = targetGirl;

    for (let i = 0; i < targetGirl.fodderQ; i++) {
      const id: string = GradCard.getPrevGrade(targetGirl) + targetGirl.faction.name;
      this.fodder.push(new InventoryEntry(Girl.placeholders[id]));
    }
  }

  private static getPrevGrade(targetGirl: GraduatedGirl) {
    return targetGirl.grade === stars[6] ? 5 : 4;
  }

  public addFood(entry: InventoryEntry) {
    this.food.push(entry);
  }

  public addFodder(entry: InventoryEntry, index: number) {
    this.fodder[index] = entry;
  }

  copiesPicked(): number {
    return this.food.filter(entry => entry.girl.id === this.targetGirl.previousForm).length;
  }

  foodPicked(): number {
    return this.food.filter(entry => entry.girl.id === this.targetGirl.requiredFood).length;
  }

  enoughCopies(): boolean {
    return this.copiesPicked() === this.targetGirl.requiredSelfQ;
  }

  enoughFood(): boolean {
    return this.foodPicked() === this.targetGirl.requiredFoodQ;
  }

  enoughFodder() {
    return this.fodder.filter(entry => entry.picked).length === this.targetGirl.fodderQ;
  }

  getPrevForm(): Girl {
    return this.food.find(entry => entry.girl.id === this.targetGirl.previousForm).girl;
  }

  getReqFood(): Girl {
    return this.food.find(entry => entry.girl.id === this.targetGirl.requiredFood).girl;
  }
}

