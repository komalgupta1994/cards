import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { CardService } from 'app/cards/services/card.service';
import { AddComponent } from '../add/add.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  showMessage: string;

  constructor(public dialog: MatDialog, private cardService: CardService) {
    this.showMessage = '';
  }

  ngOnInit() {
    this.cardService.showMessage.subscribe((message) => {
      this.showMessage = message;
      setTimeout(() => {
        this.showMessage = ''
      }, 3000);    })
  }

  addCard() {
    this.dialog.open(AddComponent, {
      height: '40%',
      width: '40%'
    } );
  }

}
