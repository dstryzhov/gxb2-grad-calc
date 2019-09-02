import {FiveStarGirl} from './five.star.girl';
import {SixStarGirl} from './six.star.girl';
import {InventoryEntry} from './inventory.entry';

export class GradCard {
  targetGirl: FiveStarGirl | SixStarGirl;
  food: InventoryEntry[] = [];

  constructor(targetGirl: FiveStarGirl | SixStarGirl) {
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

