import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AlertModule} from 'ngx-bootstrap';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {InventoryComponent} from './inventory/inventory.component';
import {GirlCardComponent} from './girl.card/girl.card.component';
import { GradCardComponent } from './grad-card/grad-card.component';
import { FodderPickerComponent } from './fodder-picker/fodder-picker.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    InventoryComponent,
    GirlCardComponent,
    GradCardComponent,
    FodderPickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    FontAwesomeModule,
    AlertModule.forRoot(),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
