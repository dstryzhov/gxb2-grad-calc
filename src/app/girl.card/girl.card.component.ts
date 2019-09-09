import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Girl} from '../models/girl';
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import {NgbDropdown} from '@ng-bootstrap/ng-bootstrap';
import {InventoryEntry} from '../models/inventory.entry';

@Component({
  selector: 'app-girl-card',
  templateUrl: './girl.card.component.html',
  styleUrls: ['./girl.card.component.less'],
  providers: [NgbDropdown]
})
export class GirlCardComponent implements OnInit {

  private iconPlus = faPlus;
  private iconMinus = faMinus;

  @Input() picked: boolean;
  @Input() inventoryMode: boolean;
  @Input() girl: Girl;
  @Input() invCount: number;
  @Input() showPicked: boolean;
  @Input() gradView: boolean;
  @Input() gradCount: number;
  @Input() gradTotal: number;
  @Input() entry: InventoryEntry;
  @Input() availableFodder: InventoryEntry[];
  @Output() addInv: EventEmitter<any> = new EventEmitter();
  @Output() delInv: EventEmitter<any> = new EventEmitter();
  @Output() fodderPicked: EventEmitter<InventoryEntry> = new EventEmitter<InventoryEntry>();

  constructor() {
  }

  ngOnInit() {
    if (!this.girl && this.entry) {
      this.girl = this.entry.girl;
    }
  }

  remInvClick(): void {
    this.delInv.emit(this.girl.id);
  }

  addInvClick(): void {
    this.addInv.emit(this.girl.id);
  }


  getImgUrl() {
    return this.inventoryMode ? 'https://via.placeholder.com/100x75' : 'https://via.placeholder.com/50x35';
  }

  getIconStyles() {
    if (this.inventoryMode || this.girl.grade.sortOrder === 0) {
      return this.girl.grade.styles;
    }
    return {
      ...this.girl.grade.styles,
      'font-size': '.4vw'
    };
  }

  pickFodder($event: InventoryEntry) {
    this.fodderPicked.emit($event);
    this.girl = $event.girl;
  }
}
