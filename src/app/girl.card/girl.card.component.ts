import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Girl} from '../models/girl';
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import {FiveStarGirl} from '../models/five.star.girl';

@Component({
  selector: 'app-girl-card',
  templateUrl: './girl.card.component.html',
  styleUrls: ['./girl.card.component.less']
})
export class GirlCardComponent implements OnInit {

  private iconPlus = faPlus;
  private iconMinus = faMinus;

  @Input() inventoryMode: boolean;
  @Input() girl: Girl = new FiveStarGirl({});
  @Input() invCount: number;
  @Input() showPicked: boolean;
  @Output() addInv: EventEmitter<any> = new EventEmitter();
  @Output() delInv: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.showPicked = !this.inventoryMode && this.girl !== null;
  }

  remInvClick(): void {
    this.delInv.emit(this.girl.id);
  }

  addInvClick(): void {
    this.addInv.emit(this.girl.id);
  }
}