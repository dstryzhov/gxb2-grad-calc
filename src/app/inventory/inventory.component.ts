import { Component, OnInit } from '@angular/core';
import {Girl} from '../models/girl';
import {ImportService} from '../service/import.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.less']
})
export class InventoryComponent implements OnInit {

  private girls: Girl[];
  private inventory: {[key: string]: number};

  constructor(private importService: ImportService ) { }

  ngOnInit() {
    this.girls = this.importService.importGirls();
  }

}
