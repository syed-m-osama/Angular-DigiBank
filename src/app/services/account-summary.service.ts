import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountSummaryService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  loadSummary(): Observable<any> {
    const url = `${this.baseUrl}/users`;
    return this.http.get<any>(url);
  }

  getTransferData(): Observable<any> {
    const url = `${this.baseUrl}/transfers`;
    return this.http.get<any>(url);
  }

  postTransferDataAs(from: any[], to: any[], transferType: string, amount: number, date: string) {
 let url = "";
 let result = [];
    console.log('post service called');
    console.log(from[0].accountNumber);
    if(transferType === 'DEBIT') {
      // call put for -= bal
      url = `${this.baseUrl}/transfers/${from[0].id}`; // here id is for from
      const data = {
        "from": from[0].accountNumber,
        "to": to[0].accountNumber,
        "transferType": transferType,
        "amount": amount,
        "date": new Date(),
      };
      from[0]!.accountBalance -= amount;
      from[0].history.push(data);
      result = from;
    }
    else if(transferType === 'CREDIT') {
      // call put for += bal
      url = `${this.baseUrl}/transfers/${to[0].id}`; // here id is for to
      const data = {
        "from": from[0].accountNumber,
        "to": to[0].accountNumber,
        "transferType": transferType,
        "amount": amount,
        "date": new Date(),
      };
      to[0]!.accountBalance += amount;
      to[0].history.push(data);
      result = to;
    }
    return this.http.put<any>(url,result[0]);
  }

  getAccountHistory(): Observable<any> {
    const url = `${this.baseUrl}/transfers`
    return this.http.get<any>(url);
  }
}
