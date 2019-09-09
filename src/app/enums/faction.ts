import {IconDefinition, faGhost, faShieldAlt, faDragon, faLeaf, faMoon, faSun} from '@fortawesome/free-solid-svg-icons';
import {Styles} from '@fortawesome/fontawesome-svg-core';

export class Faction {
  name: string;
  icon: IconDefinition;
  styles: Styles;
  sortOrder: number;

  constructor(name: string, sortOrder: number, icon: IconDefinition, styles: Styles) {
    this.name = name;
    this.sortOrder = sortOrder;
    this.icon = icon;
    this.styles = styles;
  }
}

export const factions = {
  ghost: new Faction('ghost', 0, faGhost, {color: 'aqua'}),
  human: new Faction('human', 1, faShieldAlt, {color: 'blue'}),
  monster: new Faction('monster', 2, faDragon, {color: 'red'}),
  fairy: new Faction('fairy', 3, faLeaf, {color: 'green'}),
  demon: new Faction('demon', 4, faMoon, {color: 'purple'}),
  angel: new Faction('angel', 5, faSun, {color: 'gold'})
};
