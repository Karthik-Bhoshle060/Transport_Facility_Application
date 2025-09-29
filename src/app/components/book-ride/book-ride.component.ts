import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Ride } from 'src/app/models/ride.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { RideService } from 'src/app/services/ride.service';

@Component({
  selector: 'app-book-ride',
  templateUrl: './book-ride.component.html',
  styleUrls: ['./book-ride.component.scss'],
})
export class BookRideComponent {
  masterAvailableRide: Ride[] = [];
  selectedVehicleType: string = 'All';
  alreadyBookedTodayRide: boolean = false;
  bookedRide!: Ride;
  constructor(
    private rideService: RideService,
    private employeeservice: EmployeeService,
    private router: Router
  ) {
    this.checkAlreadyBookedRide();
    if (!this.alreadyBookedTodayRide)
      this.masterAvailableRide = this.getAvailableRidesForBooking();
  }
  getAvailableRidesForBooking(): Ride[] {
    let currentEmployeeId = this.employeeservice.loggedInEmployee?.employeeId;
    const now = new Date();

    return this.rideService.getAll().filter((ride) => {
      // exclude rides created by the current user
      if (ride.ownerEmployeeId === currentEmployeeId) {
        return false;
      }

      // convert ride time (HH:mm) into Date
      const [rideHours, rideMinutes] = ride.timeISO.split(':').map(Number);
      const rideDate = new Date();
      rideDate.setHours(rideHours, rideMinutes, 0, 0);

      // find difference in minutes
      const diffMinutes = Math.abs(
        (rideDate.getTime() - now.getTime()) / (1000 * 60)
      );

      // keep if within 60 min and vacant seat is more than 0
      return diffMinutes <= 60 && ride.vacantSeats > 0;
    });
  }
  checkAlreadyBookedRide() {
    let empId = this.employeeservice.loggedInEmployee?.employeeId || '';
    this.rideService.getAll().forEach((ride) => {
      if (ride.bookedBy.includes(empId)) {
        this.alreadyBookedTodayRide = true;
        this.bookedRide = ride;
      }
    });
  }
  bookRide(ride: Ride): void {
    let result = this.rideService.bookRide(
      ride.id,
      this.employeeservice.loggedInEmployee
    );

    // Success message
    alert(result.message);
    this.checkAlreadyBookedRide();
  }
}
