import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AddRideComponent } from './components/add-ride/add-ride.component';
import { BookRideComponent } from './components/book-ride/book-ride.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehicleFilterPipe } from './pipe/vehicle-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddRideComponent,
    BookRideComponent,
    NavbarComponent,
    VehicleFilterPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
