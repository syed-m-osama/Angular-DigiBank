import { Component, Input, OnInit } from '@angular/core';
import { AccountSummaryService } from '../services/account-summary.service';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyService } from '../services/currency.service';

@Component({
  selector: 'app-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.css']
})
export class AccountSummaryComponent implements OnInit {
  currencySymbol$ = this.currencyService.currencySymbol$;
  currencyRate$ = this.currencyService.currencyRate$;

  index: number = 0;
  activeUsername: string = '';
  activeUserId: string = "";
  name: string = 'loading...';
  number: number = 0;
  type: string = '';
  availableBalance: number = 0;
  accounts: any = [];

  modifiedBalance$ = this.currencyRate$.pipe(
    map(rate => this.availableBalance * rate)
  );

  constructor( private accountSummaryService: AccountSummaryService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private currencyService: CurrencyService,
    private router: Router) {}

  ngOnInit() {
    // this.getId();
    // this.id = this.getId();
    // setTimeout(this.getId,2000);
    // this.activatedRoute.parent?.params.subscribe(
    //   (params) => {this.activeUsername = params['username'];
    //   console.log(params['username']);
    // console.log('hello');}
    // );
    this.activeUserId = this.authService.getUserId();
    // this.getUsername();
    this.loadSummary();
  }

  loadSummary(): void{
    // this.getId();
    console.log(this.activeUsername);
    this.accountSummaryService.loadSummary().subscribe(
      (response) => {
        this.accounts = response.filter((user: { userId: string; } )=>{return user.userId === this.activeUserId});
        // this.name = ``
        console.log(this.accounts);

        this.index = response.findIndex((user: {userId: string}) => user.userId === this.activeUserId);
        console.log(this.index);
        this.name = `${response[this.index].firstName} ${response[this.index].lastName}`;
        this.number = response[this.index].number;
        // this.type = response[this.id].accounts[0].type;
        // this.availableBalance = response[this.id].accounts[0].availableBalance;
        this.accounts = response[this.index].accounts;
      },
      (error) => {
        console.error('Error during summary:', error);
      }
    );
  }
  getUsername(): void {
     this.activeUsername = this.authService.getUsername();
  }

  setAccountNumber (accountNumber: string): void {
    this.authService.setAccountNumber(accountNumber);
    // this.router.navigate([`home/${this.username}/account-summary`]);
  }


}

// changeCurrency(code: string) {
//   this.currencyService.updateCurrency(code);
// }
