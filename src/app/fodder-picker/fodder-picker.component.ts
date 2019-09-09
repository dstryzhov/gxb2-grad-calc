import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BsDropdownConfig} from 'ngx-bootstrap/dropdown';
import {faSearch, faTrash} from '@fortawesome/free-solid-svg-icons';
import {InventoryEntry} from '../models/inventory.entry';

@Component({
  selector: 'app-fodder-picker',
  templateUrl: './fodder-picker.component.html',
  styleUrls: ['./fodder-picker.component.less'],
  providers: [BsDropdownConfig]
})
export class FodderPickerComponent implements OnInit {

  private iconSearch = faSearch;
  private iconTrash = faTrash;

  @Input()
  picked: InventoryEntry;

  @Input() fodder: InventoryEntry[];
  @Output() fodderPicked: EventEmitter<InventoryEntry> = new EventEmitter<InventoryEntry>();
  @Output() fodderDropped: EventEmitter<InventoryEntry> = new EventEmitter<InventoryEntry>();

  ngOnInit() {
    if (this.picked.girl.name == null) {
      this.picked = null;
    }
  }

  pickFodder(entry: InventoryEntry) {
    entry.picked = true;
    this.picked = entry;
    this.fodderPicked.emit(entry);
  }

  dropFodder() {
    this.picked.picked = false;
    this.fodderDropped.emit(this.picked);
    this.picked = null;
  }
}
