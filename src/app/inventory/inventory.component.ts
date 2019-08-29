import {Component, OnInit} from '@angular/core';
import {Girl} from '../models/girl';
import {ImportService} from '../service/import.service';
import {stars} from '../enums/star';
import {SixStarGirl} from '../models/six.star.girl';
import {InventoryEntry} from '../models/inventory.entry';
import {FiveStarGirl} from '../models/five.star.girl';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.less']
})
export class InventoryComponent implements OnInit {
  private girls: Girl[];
  private inventory: InventoryEntry[] = [];
  private gradCards: { [key: string]: InventoryEntry[] } = {};

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
    const entry = new InventoryEntry(this.girls.find(g => g.id === id));
    this.inventory.push(entry);
    this.prepGradCards();
  }

  getDisplayGirls(): Girl[] {
    return this.girls.filter(girl => girl.grade !== stars[6])
      .sort((a, b) => {
        return a.faction.sortOrder - b.faction.sortOrder || a.grade.sortOrder - b.grade.sortOrder;
      });
  }

  getGrads(): Girl[] {
    return this.girls.filter(g => g instanceof FiveStarGirl || g instanceof SixStarGirl)
      .sort((a, b) => a.grade.sortOrder - b.grade.sortOrder)
      .filter(girl => this.gradCards[girl.id] && this.gradCards[girl.id].length);
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

    this.gradCards[targetId].push(avail[0]);

    return avail[0];
  }

  prepGradCards() {
    this.inventory.forEach(e => e.picked = false);
    this.gradCards = {};

    const candidates = this.girls.filter(girl => girl instanceof SixStarGirl || girl instanceof FiveStarGirl)
      .map(girl => girl as SixStarGirl | FiveStarGirl)
      .filter(girl => {
        return this.inventory.some(entry => entry.girl.id === girl.previousForm);
      });

    for (const girl of candidates) {
      if (!this.gradCards[girl.id]) {
        this.gradCards[girl.id] = [];
      }
      let picked = this.pickNcopies(girl.id, girl.previousForm, girl.requiredSelfQ);
      if (picked !== girl.requiredSelfQ) {
        // reserve food only when have enough copies
        continue;
      }
      picked = this.pickNcopies(girl.id, girl.requiredFood, girl.requiredFoodQ);
      if (girl instanceof SixStarGirl && picked < girl.requiredFoodQ) {
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
  private stealFood(target: SixStarGirl) {
    const competition = this.girls.filter(girl => girl instanceof SixStarGirl)
      .map(girl => girl as SixStarGirl)
      .find(girl => girl.previousForm === target.requiredFood);

    if (!competition || !this.gradCards[competition.id]) {
      return;
    }
    // no six star form or available copies, can't steal
    const gradCard = this.gradCards[competition.id];

    const copies = gradCard.filter(entry => entry.girl.id === target.requiredFood);
    const food = gradCard.filter(entry => entry.girl.id === competition.requiredFood);
    if (copies.length < competition.requiredSelfQ || food.length < competition.requiredFoodQ) {
      gradCard.splice(gradCard.indexOf(copies[0]), 1);
      this.gradCards[target.id].push(copies[0]);
    }
  }
  private getCopiesPicked(girlId: string, previousForm): number {
    return this.gradCards[girlId].filter(g => g.girl.id === previousForm).length;
  }

  getGradCards(girl: Girl): InventoryEntry[] {
    return this.gradCards[girl.id] || [];
  }
}
