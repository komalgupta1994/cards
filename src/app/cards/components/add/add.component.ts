import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Months, YearLength, CVVLength, CardNumberLength, CardTypes} from '../../../shared/constants';
import { CardService } from '../../services/card.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  form: FormGroup;
  months = Months;
  years: Array<number>;
  cvvLength: number;
  cardNumberLength: number;
  cardType: string;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private cardService: CardService, private dialogRef: MatDialogRef<AddComponent>) {
    this.years = [];
    this.cvvLength = CVVLength;
    this.cardNumberLength = CardNumberLength;
    this.cardType = '';
    this.errorMessage = '';

    this.form = this.formBuilder.group(
      {
        number: ['', Validators.required],
        month: ['', Validators.required],
        year: ['', Validators.required],
        cvv: ['', Validators.required]
      }
    );
    this.getYears();
    this.formsValidation();
  }

  addCard() {
    this.errorMessage = '';
    const formsValue = this.form.value;
    const currentTime = new Date();
    if (+(formsValue.month) < currentTime.getUTCMonth() + 1 && formsValue.year <= currentTime.getFullYear()) {
      this.errorMessage = 'Please select valid month';
    }
    if (!this.errorMessage) {
      formsValue.number = formsValue.number.replace(/\s/g, '');
      const payload = {
        ...formsValue,
        cardName: 'Debit Card',
        cardType: this.cardType
      }
      this.cardService.saveCard(payload).subscribe(res => {
        if (res.resultMessage === 'Card is already exist!') {
          this.errorMessage = res.resultMessage;
        } else {
          this.cardService.updateCardList.next(true);
          this.cardService.showMessage.next(res.resultMessage);
          this.dialogRef.close();
        }
      })
    }
  }

  close() {
    this.dialogRef.close();
  }

  addSpace() {
    if (this.form.value.number.length < this.cardNumberLength) {
      this.form.patchValue({number: this.form.value.number.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ')});
    }
    return this.form.value.number;
  }

  private getYears() {
    const currentYear = new Date().getFullYear();
    for (let i = 0; i<YearLength;i++) {
      this.years.push(currentYear + i);
    }
  }

  private formsValidation() {
    this.form.controls.number.valueChanges.subscribe(value => {
      if (value) {
        if (value.startsWith('34') || value.startsWith('37')) {
          this.cardType = CardTypes.amex.name;
          this.cardNumberLength = CardTypes.amex.cardNumberLength;
          this.cvvLength = CardTypes.amex.cvvLength;
        } else if (value.startsWith('4') || value.startsWith('5')) {
          this.cardNumberLength = CardTypes.visa.cardNumberLength;
          this.cvvLength = CardTypes.visa.cvvLength;
          this.cardType = value.startsWith('4') ? CardTypes.visa.name : CardTypes.master.name;
        } else {
          this.cardType = '';
        }
      } else {
        this.cardType = '';
      }
    })
  }

}
