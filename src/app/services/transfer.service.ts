// transfer.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private baseUrl = 'http://localhost:3002'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  postUserData(userId: string, from: string, to: string, transferType: string, amount: number, date: string ): Observable<any> {
    const apiUrl = `${this.baseUrl}/transfer`; // Replace with the actual resource path

    const transferData = {
          userId,
          // tId,
          from,
          to,
          transferType,
          amount,
          date
    };

    return this.http.post(apiUrl, transferData);
  }

  getUserData() {
    const url = `${this.baseUrl}/transfer`;
    return this.http.get<any>(url);
  }
}
