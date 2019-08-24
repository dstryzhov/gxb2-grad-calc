import { Component, OnInit } from '@angular/core';
import {Girl} from '../models/girl';
import {ImportService} from '../service/import.service';
import {faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';
import {stars} from '../enums/star';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.less']
})
export class InventoryComponent implements OnInit {

  private iconPlus = faPlus;
  private iconMinus = faMinus;

  private girls: Girl[];
  private inventory: {[key: string]: number} = {};

  constructor(private importService: ImportService ) { }

  ngOnInit() {
    this.girls = this.importService.importGirls();
  }

  getInvCount(id: string) {
    return this.inventory[id] || 0;
  }

  remInv(id: string) {
    if (!this.inventory[id]) {
      return;
    }
    this.inventory[id] = this.inventory[id] - 1;
  }

  addInv(id: string) {
    this.inventory[id] = (this.inventory[id] || 0) + 1;
  }

  getDisplayGirls(): Girl[] {
    return this.girls.filter(girl => girl.grade !== stars[6]);
  }
}
