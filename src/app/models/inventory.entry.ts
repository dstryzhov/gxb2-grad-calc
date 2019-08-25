import {Girl} from './girl';

export class InventoryEntry {
  private static LAST_ID = 0;
  id: number;
  girl: Girl;
  picked: boolean;

  constructor(girl: Girl) {
    InventoryEntry.LAST_ID += 1;
    this.id = InventoryEntry.LAST_ID;
    this.girl = girl;
  }
}
