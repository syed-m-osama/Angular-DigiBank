import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { TransferService } from '../services/transfer.service';
import { AuthService } from '../services/auth.service';
import { AccountSummaryService } from '../services/account-summary.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent {

  @ViewChild('transferForm', { static: false }) transferForm!: NgForm; // for reset value

  transactionSuccess: boolean = false;
  dateObj: Date = new Date();
  modDate: string = this.dateObj.toDateString().substring(4);
  amountOutOfRange = false;
  // this.date.getFullYear().toString() + '-' + this.date..getMonth().toString() + '-' + this.date.getDate().toString();

  // to show list of TO options
  transferToOptions: any = [];

  // to show list of FROM options
  transferFromOptions: any = [];

  transferFormValue = {
    userId: "",
    to: "",
    from: "",
    transferType: "",
    amount: 1,
    date: this.modDate,
  };

  allTransferData: any = [];
  fromBalance: number = 0;
  toBalance: number = 0;
  fromUser: any = [];
  toUser: any = [];
  activeUser: string = "";

  ngOnInit() {
    this.activeUser = this.getUserId();
    this.transferFormValue.userId = this.getUserId();
    this.getUserAccounts();
    this.getTransferData();
  }

  constructor(
    private authService: AuthService,
    private transferService: TransferService,
    private accountSummaryService: AccountSummaryService
  ) {}

  postTransferData() {
    const userId = this.transferFormValue.userId;
    const from = this.transferFormValue.from;
    const to = this.transferFormValue.to;
    const transferType = this.transferFormValue.transferType;
    const amount = this.transferFormValue.amount;
    const date = this.transferFormValue.date;

    this.transferService.postUserData(userId, from, to, transferType, amount, date).subscribe(
      (response) => {
        console.log('User data posted successfully:', response);
        // this.showAlert('User data posted successfully');
        // this.fromBalance = this.transferFormValue.amount;
      },
      (error) => {
        console.error('Error posting user data:', error);
        // this.showAlert('Error posting user data');
      }
    );
  }

  async postTransferDataNew(type: string) {
    // const userId = this.transferFormValue.userId; // no use
    // const from = this.transferFormValue.from;
    // const to = this.transferFormValue.to;
    // const transferType = this.transferFormValue.transferType;
    const amount = this.transferFormValue.amount;
    const date = this.transferFormValue.date;

    console.log("fromUser");
    console.log(this.fromUser);

    this.accountSummaryService.postTransferDataAs([this.fromUser], [this.toUser], type , amount, date).subscribe(
      (response) => {
        console.log('NEW User data posted successfully:', response);
        // this.showAlert('User data posted successfully');
        this.transactionSuccess = true;

        this.fromBalance = this.transferFormValue.amount;
        // this.transferForm.reset('id');
      },
      (error) => {
        console.error('Error posting user data:', error);
        this.showAlert('Error posting user data');
      }
    );
  }

  showAlert(message: string): void {
    window.alert(message);
  }

  getUserId(): string {
    return this.authService.getUserId();
  }



  validateAmount() {
    const amount = parseFloat(this.transferFormValue.amount.toString());

    if (isNaN(amount) || amount < 1 || amount > 1000000 || amount > this.fromBalance) {
      this.amountOutOfRange = true;
    } else {
      this.amountOutOfRange = false;
    }
  }

  async submitTransfer() {
      // Call the first function
       this.postTransferDataNew('DEBIT');

      //  await this.delay(2000);
      // Call the second function after the first one completes
       this.postTransferDataNew('CREDIT');
    }

    private delay(ms: number): Promise<void> {
      return new Promise(resolve => setTimeout(resolve, ms));
    }



  getUserAccounts(): void { //used to feed data to 'from' and 'to' list
    this.accountSummaryService.loadSummary().subscribe(
      (response) => {
        // this.allUserAccounts = response; // fetching old/wrong data
        console.log(response);
        console.log('From');
        this.transferFromOptions = response.filter((user: { userId: string; }) => { return user.userId === this.activeUser });
        this.transferFromOptions = this.transferFromOptions[0].accounts;
        console.log(this.transferFromOptions);

        const toList = response.filter((user: { userId: string }) => { return user.userId != this.activeUser })
          .map((e: { accounts: any; }) => e.accounts).flat();

        this.transferToOptions.push(...toList);
        console.log('To');
        console.log(this.transferToOptions);

        // this.accounts = response.filter((user: { userId: number; } )=>{return user.userId === this.activeUserId});
        // this.name = ``
        // console.log(this.accounts);

        // this.index = response.findIndex((user: {userId: number}) => user.userId === this.activeUserId);
        // console.log(this.index);
        // this.name = `${response[this.index].firstName} ${response[this.index].lastName}`;
        // this.number = response[this.index].number;
        // // this.type = response[this.id].accounts[0].type;
        // // this.availableBalance = response[this.id].accounts[0].availableBalance;
        // this.accounts = response[this.index].accounts;
      },
      (error) => {
        console.error('Error during summary:', error);
      }
    );

  }

  //get all data on init
  getTransferData() {
    this.allTransferData = this.accountSummaryService.getTransferData().subscribe(
      (response) => {
        this.allTransferData = response;
        console.log('allTransferData',this.allTransferData);

      },
      (error) => {
        console.log("Error from Transfer api",error);
      }
    );
  }

  //get FROM data when user selects an option
  getFromBalance() {
    console.log('getFromBalance called');
    // console.log(this.allUserAccounts);
    console.log(this.transferFormValue.from);
    this.fromUser = this.allTransferData.find((user: { accountNumber: string; }) => user.accountNumber === this.transferFormValue.from);
    // let accArr: any[] = [...x.accounts];

    // this.fromUser = accArr.find(e => e.accountNumber === this.transferFormValue.from);
    this.fromBalance = this.fromUser.accountBalance;

    console.log(this.fromUser);
    console.log(this.fromBalance);
    // console.log(x);
  }

  //get TO data when user selects an option
  getToBalance() {
    console.log('getToBalance called');
    // console.log(this.allUserAccounts);
    console.log(this.transferFormValue.to)
    this.toUser = this.allTransferData.find((user: { accountNumber: string; }) => user.accountNumber === this.transferFormValue.to);

    // console.log(x);
    // let accArr: any[] = [...x.accounts];

    // this.toUser = accArr.find(e => e.accountNumber === this.transferFormValue.to);
    this.toBalance = this.toUser.availableBalance;

    console.log(this.toUser);
    console.log(this.toBalance);


    // if (!x) {
    //   // Handle the case where no matching user was found
    //   console.log('User not found for the specified account number');
    // } else {
    //   // Handle the case where a matching user was found
    //   console.log('Found user:', x);
    // }


  }

}
