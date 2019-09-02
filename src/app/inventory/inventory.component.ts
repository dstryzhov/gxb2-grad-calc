import {Component, OnInit} from '@angular/core';
import {Girl, GraduatedGirl} from '../models/girl';
import {ImportService} from '../service/import.service';
import {stars} from '../enums/star';
import {InventoryEntry} from '../models/inventory.entry';
import {GradCard} from '../models/grad.card';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.less']
})
export class InventoryComponent implements OnInit {
  private girls: Girl[];
  private inventory: InventoryEntry[] = [];
  private gradCards: GradCard[] = [];

  constructor(private importService: ImportService) {
  }

  ngOnInit() {
    this.girls = this.importService.importGirls();
  }

  getInvCount(id: string): number {
    return this.inventory.filter(entry => entry.girl.id === id).length;
  }

  remInv(id: string): void {
    if (!this.getInvCount(id)) {
      return;
    }
    this.inventory.splice(this.inventory.findIndex(entry => entry.girl.id === id), 1);
    this.prepGradCards();
  }

  addInv(id: string): void {
    const entry = new InventoryEntry(this.getGirl(id));
    this.inventory.push(entry);
    this.prepGradCards();
  }

  getDisplayGirls(): Girl[] {
    return this.girls.filter(girl => girl.grade !== stars[6])
      .sort((a, b) => {
        return a.faction.sortOrder - b.faction.sortOrder || a.grade.sortOrder - b.grade.sortOrder;
      });
  }

  getGrads(): GradCard [] {
    return this.gradCards.sort((a, b) => a.targetGirl.grade.sortOrder - b.targetGirl.grade.sortOrder);
  }

  getAvailGradCount(): number {
    return 0;
  }

  pickFromInv(toPick: string, targetId: string): InventoryEntry {
    const avail = this.inventory.filter(entry => entry.girl.id === toPick)
      .filter(entry => !entry.picked);
    if (!avail.length) {
      // no available girls to pick
      // todo placeholder
      return null;
    }

    avail[0].picked = true;

    this.addToGrad(targetId, avail[0]);

    return avail[0];
  }

  private addToGrad(targetId: string, inventoryEntry: InventoryEntry) {
    let gradCard = this.getGradCardFor(targetId);
    if (!gradCard) {
      gradCard = new GradCard(this.getGirl(targetId) as GraduatedGirl);
      this.gradCards.push(gradCard);
    }
    gradCard.addFood(inventoryEntry);
  }

  prepGradCards() {
    this.inventory.forEach(e => e.picked = false);
    this.gradCards = [];

    const candidates = this.girls.filter(girl => girl instanceof GraduatedGirl)
      .map(girl => girl as GraduatedGirl)
      .filter(girl => {
        return this.inventory.some(entry => entry.girl.id === girl.previousForm);
      });

    for (const girl of candidates) {
      let picked = this.pickNcopies(girl.id, girl.previousForm, girl.requiredSelfQ);
      if (picked !== girl.requiredSelfQ) {
        // reserve food only when have enough copies
        continue;
      }
      picked = this.pickNcopies(girl.id, girl.requiredFood, girl.requiredFoodQ);
      if (girl.grade === stars[6] && picked < girl.requiredFoodQ) {
        this.stealFood(girl);
      }
    }
  }

  private pickNcopies(mainId: string, copyId: string, n: number) {
    let copiesPicked = this.getCopiesPicked(mainId, copyId);

    while (copiesPicked < n) {
      const picked = this.pickFromInv(copyId, mainId);
      if (picked) {
        copiesPicked += 1;
      } else {
        // no girls in the inventory
        break;
      }
    }

    return copiesPicked;
  }

  /**
   * Steals copies of required food from incomplete 6* graduations of fodder girls
   * @param target girl that needs a certain 5* food
   */
  private stealFood(target: GraduatedGirl) {
    const competition = this.girls.filter(girl => girl.grade === stars[6])
      .map(girl => girl as GraduatedGirl)
      .find(girl => girl.previousForm === target.requiredFood);

    if (!competition || !this.getGradCardFor(competition.id)) {
      // no six star form or available copies, can't steal
      return;
    }
    const gradCard = this.getGradCardFor(competition.id);

    const copies = gradCard.food.filter(entry => entry.girl.id === target.requiredFood);
    const food = gradCard.food.filter(entry => entry.girl.id === competition.requiredFood);
    if (copies.length < competition.requiredSelfQ || food.length < competition.requiredFoodQ) {
      gradCard.food.splice(gradCard.food.indexOf(copies[0]), 1);

      this.getGradCardFor(target.id).addFood(copies[0]);
    }
  }

  private getCopiesPicked(girlId: string, previousForm): number {
    const gradCard = this.getGradCardFor(girlId);
    if (!gradCard) {
      return 0;
    }
    return gradCard.food.filter(g => g.girl.id === previousForm).length;
  }

  private getGradCardFor(id: string): GradCard {
    return this.gradCards.find(card => card.targetGirl.id === id);
  }

  private getGirl(id: string): Girl {
    return this.girls.find(girl => girl.id === id);
  }
}
