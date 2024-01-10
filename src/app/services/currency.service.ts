// currency.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private currencySymbolSubject = new BehaviorSubject<string>('₹'); // Default to '$'
  currencySymbol$ = this.currencySymbolSubject.asObservable();

  private currencyRateSubject = new BehaviorSubject<number>(1); // Default to rate 1
  currencyRate$ = this.currencyRateSubject.asObservable();

  private currencyMapping: { [code: string]: { symbol: string; rate: number } } = {
    'USD': { symbol: '$', rate: 0.8 },
    'EUR': { symbol: '€', rate: 0.4 },
    'INR': { symbol: '₹', rate: 1 }
  };

  constructor() {
    this.currencySymbolSubject.next(this.currencyMapping['INR'].symbol || '₹');

    // this.currencyRateSubject.next(this.currencyMapping['INR'].rate || 1);
  }



  // updateCurrencySymbol(code: string) {
  //   this.currencySymbolSubject.next(this.currencySymbolMapping[code] || '$');
  // }
}
