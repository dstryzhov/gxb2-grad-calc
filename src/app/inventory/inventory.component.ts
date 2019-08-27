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
      .filter(girl => this.hasCopiesInInventory(girl as SixStarGirl | FiveStarGirl));
  }

  private hasCopiesInInventory(girl: SixStarGirl | FiveStarGirl) {
    return this.inventory.some(entry => entry.girl.id === girl.previousForm);
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
    for (const girl of this.girls) {
      if (!this.gradCards[girl.id]) {
        this.gradCards[girl.id] = [];
      }

      if (girl instanceof SixStarGirl || girl instanceof FiveStarGirl) {
        const picked = this.pickNcopies(girl.id, girl.previousForm, girl.requiredSelfQ);
        if (picked !== girl.requiredSelfQ) {
          // reserve food only when have enough copies
          continue;
        }
        this.pickNcopies(girl.id, girl.requiredFood, girl.requiredFoodQ);
      }
    }
  }

  private pickNcopies(mainId, copyId, n) {
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

  private getCopiesPicked(girlId: string, previousForm): number {
    return this.gradCards[girlId].filter(g => g.girl.id === previousForm).length;
  }

  getGradCards(girl: Girl): InventoryEntry[] {
    return this.gradCards[girl.id] || [];
  }
}
