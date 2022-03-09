import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { MaskCardPipe } from './pipes/mask-card.pipe';

const modules = [
  CommonModule,
  MatButtonModule,
  MatDialogModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  HttpClientModule]

@NgModule({
  declarations: [
    MaskCardPipe
  ],
  imports: [
    ...modules
  ],
  exports: [
    ...modules,
    MaskCardPipe
  ]
})
export class SharedModule { }
