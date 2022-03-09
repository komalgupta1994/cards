import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.scss']
})
export class RemoveComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private cardService: CardService, private dialogRef: MatDialogRef<RemoveComponent>) { }

  ngOnInit(): void {
    
  }

  deleteCard() {
    this.cardService.removeCard(this.data).subscribe((res: any) => {
      this.dialogRef.close();
      if (res.resultMessage === 'Card deleted successfully') {
        this.cardService.updateCardList.next(true);
        this.cardService.showMessage.next(res.resultMessage);
      }
    })
  } 

  close() {
    this.dialogRef.close();
  }

}
