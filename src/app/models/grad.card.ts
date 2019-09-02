import {InventoryEntry} from './inventory.entry';
import {GraduatedGirl} from './girl';

export class GradCard {
  targetGirl: GraduatedGirl;
  food: InventoryEntry[] = [];

  constructor(targetGirl: GraduatedGirl) {
    this.targetGirl = targetGirl;
  }

  public addFood(entry: InventoryEntry) {
    this.food.push(entry);
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
}

