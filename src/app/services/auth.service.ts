import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private username = '';
  private userId = '';
  private baseUrl = 'http://localhost:3000';
  accountNumberDetails: string = "";

  constructor(
    private http: HttpClient,
    private router: Router
    ) {}

    isAuthenticatedStatus(): boolean {
      return this.isAuthenticated;
    }

  login(username: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/login?username=${username}&password=${password}`;
    return this.http.get<any[]>(url).pipe(
      map(users => {
        const isValid = users.length > 0;
        this.isAuthenticated = true;
        // console.log(users[0].username);
        // console.log(this.username);

        if (isValid) {
          // Perform additional tasks as needed
          this.username = users[0].username;
          this.userId = users[0].userId;
        }
        return isValid;
      })
    );
  }

  getUsername(): string {
    return this.username;
  }

  getUserId(): string {
    return this.userId;
  }


  logout(): void {
    this.username = '';
    this.router.navigate(['login']);
    this.isAuthenticated = false;
  }


  setAccountNumber (accountNumber: string) {
    this.accountNumberDetails = accountNumber;
  }

  getAccountNumber (): string {
    return this.accountNumberDetails;
  }



}



// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private loggedIn = new BehaviorSubject<boolean>(false);

//   get isLoggedIn(): Observable<boolean> {
//     return this.loggedIn.asObservable();
//   }

//   login(username: string, password: string): Observable<boolean> {
//     // In a real application, you would communicate with a server to validate credentials
//     // For simplicity, let's use a hardcoded check
//     if (username === 'user' && password === 'password') {
//       this.loggedIn.next(true);
//       return this.isLoggedIn;
//     } else {
//       this.loggedIn.next(false);
//       return this.isLoggedIn;
//     }
//   }

//   logout(): void {
//     this.loggedIn.next(false);
//   }
// }
