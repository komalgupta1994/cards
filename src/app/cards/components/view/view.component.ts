import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Card } from '../../models/card.model';
import { RemoveComponent } from '../remove/remove.component';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  cards: Card[];
  private subscriptions: Subscription = new Subscription();

  constructor(private dialog: MatDialog, private cardService: CardService) {
    this.cards = [];
  }

  ngOnInit(): void {
    this.subscriptions = this.cardService.updateCardList.subscribe(() => {
      this.getCardsInfo();
    })
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  openDialog(id: number) {
    const config: any = new MatDialogConfig();
    config.data = id;
    console.log(id);
    this.dialog.open(RemoveComponent, config);
  }

  private getCardsInfo() {
    this.cardService.getCards().subscribe((cards) => {
      this.cards = cards['data'];
    });
  }

}
