import {Component, Input} from '@angular/core';
import {GradCard} from '../models/grad.card';

@Component({
  selector: 'app-grad-card',
  templateUrl: './grad-card.component.html',
  styleUrls: ['./grad-card.component.less']
})
export class GradCardComponent {

  @Input() gradCard: GradCard;

  getGradState(): string {
    if (this.gradCard.enoughFood()) {
      return 'info';
    }
    if (this.gradCard.enoughCopies()) {
      return 'warning';
    }
    return 'danger';
  }
}
