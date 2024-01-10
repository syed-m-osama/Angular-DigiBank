import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AccountSummaryComponent } from './account-summary/account-summary.component';
import { TransferComponent } from './transfer/transfer.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './components/profile/profile.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent }, //dont add '/' to path
  {
    path: 'home/:username', component: HomeComponent, children: [
      { path: 'account-summary', component: AccountSummaryComponent },
      { path: 'transfer', component: TransferComponent },
      { path: 'account-details', component: AccountDetailsComponent },
      { path: 'profile', component: ProfileComponent }
    ],
    canActivate: [AuthGuard]
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
