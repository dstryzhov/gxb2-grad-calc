import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Girl} from '../models/girl';
import {faMinus, faPlus, faCheck} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-girl-card',
  templateUrl: './girl.card.component.html',
  styleUrls: ['./girl.card.component.less']
})
export class GirlCardComponent implements OnInit {

  private iconPlus = faPlus;
  private iconMinus = faMinus;
  private iconCheck = faCheck;

  @Input() picked: boolean;
  @Input() inventoryMode: boolean;
  @Input() girl: Girl;
  @Input() invCount: number;
  @Input() showPicked: boolean;
  @Output() addInv: EventEmitter<any> = new EventEmitter();
  @Output() delInv: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this.showPicked = !this.inventoryMode && this.girl !== null;
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
}
