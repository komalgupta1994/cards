import { NgModule } from '@angular/core';
import { CardsComponent } from './components/cards/cards.component';
import { AddComponent } from './components/add/add.component';
import { ViewComponent } from './components/view/view.component';
import { CardRoutingModule } from './cards-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RemoveComponent } from './components/remove/remove.component';
import { CardService } from './services/card.service';



@NgModule({
  declarations: [
    CardsComponent,
    AddComponent,
    ViewComponent,
    RemoveComponent
  ],
  imports: [
    CardRoutingModule,
    SharedModule
  ],
  providers: [CardService]
})
export class CardsModule { }
