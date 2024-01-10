import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountSummaryService } from 'src/app/services/account-summary.service';
import { AuthService } from 'src/app/services/auth.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent {
  currencySymbol$ = this.currencyService.currencySymbol$;

  // sortStartDirection: 'asc' | 'desc' = 'desc';
  accNum: string = "";
  accBal: number = 0;

  activeUserId: string = "";
  // records: any = [];
  records: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  columnsToDisplay = ['from', 'to', 'type', 'amount', 'date'];


  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor (
    private authService: AuthService,
    private accountSummaryService: AccountSummaryService, // use this instead
    private currencyService: CurrencyService,
  ) {}

  ngOnInit() {
    this.getData();
    this.accNum = this.getAccountNumber();
    // console.log(this.accNum);
    this.activeUserId = this.authService.getUserId();
    this.records.sort = this.sort;
    // this.sort.direction = 'desc';
    console.log(this.records);
  }

  ngAfterViewInit() {
    this.records.sort = this.sort;
    this.records.sort.direction = 'desc';
    this.records.sort.active = 'date';
    this.records.paginator = this.paginator;

  }

  getData(): void {
    this.accountSummaryService.getAccountHistory().subscribe(
      // response => this.records = response
      (response)=>{
        console.log(response);
        const filterData= response.filter((response: { accountNumber: string; })=>{return response.accountNumber === this.accNum});
        this.accBal = filterData[0].accountBalance;
        this.records.data = [...filterData[0].history]; // remember the data should be an array for sort and pagination to work
        console.log('a');
        console.log(...filterData[0].history);
        // console.log('....');
        // console.log(...filterData);
        // console.log(this.records);
      },
      (error) =>{
        console.error('Error loading data: ',error);
      }
      );
  }

  getAccountNumber (): string {
    return this.authService.getAccountNumber();
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
  this.records.filter = filterValue.trim().toLowerCase();

  if (this.records.paginator){
    this.records.paginator.firstPage();
  }
  }

}
