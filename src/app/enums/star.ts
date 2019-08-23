import {IconDefinition, faStar} from '@fortawesome/free-solid-svg-icons';
import {Styles} from '@fortawesome/fontawesome-svg-core';


export class Star {
  icon: IconDefinition[];
  styles: Styles;


  constructor(icon: IconDefinition[], styles: Styles) {
    this.icon = icon;
    this.styles = styles;
  }
}

export const stars = {
  3: new Star([faStar, faStar, faStar], {color: 'gold'}),
  4: new Star([faStar, faStar, faStar, faStar], {color: 'gold'}),
  5: new Star([faStar, faStar, faStar, faStar, faStar], {color: 'gold'}),
  6: new Star([faStar], {color: 'maroon'}),
};
