import {IconDefinition, faGhost, faShieldAlt, faDragon, faLeaf, faMoon, faSun} from '@fortawesome/free-solid-svg-icons';
import {Styles} from '@fortawesome/fontawesome-svg-core';

export class Faction {
  icon: IconDefinition;
  styles: Styles;
  sortOrder: number;

  constructor(sortOrder: number, icon: IconDefinition, styles: Styles) {
    this.sortOrder = sortOrder;
    this.icon = icon;
    this.styles = styles;
  }
}

export const factions = {
  ghost: new Faction(0, faGhost, {color: 'aqua'}),
  human: new Faction(1, faShieldAlt, {color: 'blue'}),
  monster: new Faction(2, faDragon, {color: 'red'}),
  fairy: new Faction(3, faLeaf, {color: 'green'}),
  demon: new Faction(4, faMoon, {color: 'purple'}),
  angel: new Faction(5, faSun, {color: 'gold'})
};
