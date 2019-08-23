import {IconDefinition, faGhost, faShieldAlt, faDragon, faLeaf, faMoon, faSun} from '@fortawesome/free-solid-svg-icons';
import {Styles} from '@fortawesome/fontawesome-svg-core';

export class Faction {
  icon: IconDefinition;
  styles: Styles;

  constructor(icon: IconDefinition, styles: Styles) {
    this.icon = icon;
    this.styles = styles;
  }
}

export const factions = {
  ghost: new Faction(faGhost, {color: 'aqua'}),
  human: new Faction(faShieldAlt, {color: 'blue'}),
  monster: new Faction(faDragon, {color: 'red'}),
  fairy: new Faction(faLeaf, {color: 'green'}),
  demon: new Faction(faMoon, {color: 'purple'}),
  angel: new Faction(faSun, {color: 'gold'})
};
