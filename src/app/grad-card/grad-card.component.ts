import {Component, Input} from '@angular/core';
import {GradCard} from '../models/grad.card';
import {NgbDropdown} from '@ng-bootstrap/ng-bootstrap';
import {InventoryEntry} from '../models/inventory.entry';

@Component({
  selector: 'app-grad-card',
  templateUrl: './grad-card.component.html',
  styleUrls: ['./grad-card.component.less'],
  providers: [NgbDropdown]
})
export class GradCardComponent {

  @Input() gradCard: GradCard;
  @Input() availableFodder: InventoryEntry[];

  getGradState(): string {
    if (this.gradCard.enoughFodder()) {
      return 'success';
    }
    if (this.gradCard.enoughFood()) {
      return 'info';
    }
    if (this.gradCard.enoughCopies()) {
      return 'warning';
    }
    return 'danger';
  }

  addFodder($event: InventoryEntry, index: number) {
    this.gradCard.addFodder($event, index);
  }
}
