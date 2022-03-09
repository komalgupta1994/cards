import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Card } from '../models/card.model';

@Injectable()
export class CardService {
  updateCardList = new BehaviorSubject(true);
  showMessage = new Subject<string>();

  constructor(private http: HttpClient) { }

  getCards(): Observable<any> {
    return this.http.get(environment.url.getCards);
  }

  removeCard(id: number): Observable<any> {
    return this.http.delete(`${environment.url.deleteCard}/${id}`);
  }

  saveCard(formData: Card): Observable<any> {
    return this.http.post(`${environment.url.saveCard}`, formData);
  }
}
