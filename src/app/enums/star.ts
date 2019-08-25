import {IconDefinition, faStar} from '@fortawesome/free-solid-svg-icons';
import {Styles} from '@fortawesome/fontawesome-svg-core';


export class Star {
  icon: IconDefinition[];
  styles: Styles;
  sortOrder: number;


  constructor(sortOrder: number, icon: IconDefinition[], styles: Styles) {
    this.icon = icon;
    this.styles = styles;
    this.sortOrder = sortOrder;
  }
}

export const stars = {
  3: new Star(3, [faStar, faStar, faStar], {color: 'gold'}),
  4: new Star(2, [faStar, faStar, faStar, faStar], {color: 'gold'}),
  5: new Star(1, [faStar, faStar, faStar, faStar, faStar], {color: 'gold'}),
  6: new Star(0, [faStar], {color: 'maroon'}),
};
