import { Component } from '@angular/core';
import { AccountSummaryService } from 'src/app/services/account-summary.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  name: string = '';
  accounts: any = [];
  activeUserId: string = '';
  index: number = 0;
  accNumber: string = '';
  mobile: string = '';
  email: string = '';
  country: string = '';


  constructor (
    private accountSummaryService: AccountSummaryService,
    private authService: AuthService
  ) {}

  ngOnInit(){

    this.activeUserId = this.authService.getUserId();

    this.accountSummaryService.loadSummary().subscribe(
      (response) => {
        this.accounts = response.filter((user: { userId: string; } )=>{return user.userId === this.activeUserId});
        // this.name = ``
        console.log(this.accounts);
        // this.mobile = this.accounts.mobile;

        this.index = response.findIndex((user: {userId: string}) => user.userId === this.activeUserId);
        console.log(this.index);
        this.name = `${response[this.index].firstName} ${response[this.index].lastName}`;
        this.accNumber = response[this.index].number;
        this.mobile = response[this.index].mobile;
        this.email = response[this.index].email;
        this.country = response[this.index].country;
        // this.type = response[this.id].accounts[0].type;
        // this.availableBalance = response[this.id].accounts[0].availableBalance;
        this.accounts = response[this.index].accounts;
      }
    );
  }

}
