import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { RideService } from 'src/app/services/ride.service';

@Component({
  selector: 'app-add-ride',
  templateUrl: './add-ride.component.html',
  styleUrls: ['./add-ride.component.scss'],
})
export class AddRideComponent implements OnInit {
  rideForm!: FormGroup;
  constructor(
    private rideService: RideService,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    let empId = this.employeeService.loggedInEmployee?.employeeId;
    let p = this.rideService
      .getAll()
      .filter((ride) => ride.ownerEmployeeId === empId);
    if (p.length >= 1) {
      alert('You have already added a ride today. Only one ride is allowed.');
      this.router.navigate(['/book-ride']);
    }
  }
  ngOnInit(): void {
    this.rideForm = new FormGroup({
      vehicleType: new FormControl('', [Validators.required]),
      vehicleNo: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z]{2}\s[0-9]{2}\s[A-Z]{2}\s[0-9]{4}$/),
        Validators.maxLength(13),
      ]),
      vacantSeats: new FormControl(0, [Validators.required, Validators.min(1)]),
      time: new FormControl('', [Validators.required]),
      pickupPoint: new FormControl('', [Validators.required]),
      destination: new FormControl('', [Validators.required]),
    });
  }
  formatVehicleNo(event: any) {
    let value = event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (value.length > 2) value = value.slice(0, 2) + ' ' + value.slice(2);
    if (value.length > 5) value = value.slice(0, 5) + ' ' + value.slice(5);
    if (value.length > 8) value = value.slice(0, 8) + ' ' + value.slice(8);

    if (value.length > 13) value = value.slice(0, 13);

    this.rideForm.get('vehicleNo')?.setValue(value, { emitEvent: false });
  }
  get val() {
    return this.rideForm.value;
  }

  submit(): void {
    if (this.rideForm.invalid) {
      this.rideForm.markAllAsTouched();
      return;
    }
    if (this.val.vehicleType == 'Bike' && this.val.vacantSeats > 1) {
      return;
    }
    const payload = {
      ownerEmployeeId: this.employeeService.loggedInEmployee?.employeeId || '',
      vehicleType: this.val.vehicleType,
      vehicleNo: this.val.vehicleNo,
      totalSeats: this.val.vacantSeats,
      vacantSeats: this.val.vacantSeats,
      timeISO: this.val.time || '00:00',
      pickupPoint: this.val.pickupPoint,
      destination: this.val.destination,
    };

    this.rideService.addRide(payload);
    console.log('Ride submitted:', payload);
    this.rideForm.reset();
    this.router.navigate(['/book-ride']);
  }
}
