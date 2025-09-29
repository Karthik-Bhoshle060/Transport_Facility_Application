import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AddRideComponent } from './components/add-ride/add-ride.component';
import { BookRideComponent } from './components/book-ride/book-ride.component';
import { AuthGuard } from './services/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // default route
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'add-ride', component: AddRideComponent, canActivate: [AuthGuard] },
  { path: 'book-ride', component: BookRideComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }, // wildcard, redirect unknown paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
