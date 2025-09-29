import { Injectable } from '@angular/core';
import { Ride, User } from '../models/ride.model';

const STORAGE_KEY = 'tfm_rides_v1';
const LAST_RESET_KEY = 'tfm_last_reset';

@Injectable({
  providedIn: 'root',
})
export class RideService {
  constructor() {
    this.resetRidesIfNewDay(); // Reset rides on app start
  }

  // Load rides from localStorage
  private load(): Ride[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  // Save rides to localStorage
  private save(rides: Ride[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rides));
  }

  // Reset rides if it's a new day
  private resetRidesIfNewDay() {
    const lastReset = localStorage.getItem(LAST_RESET_KEY);
    const today = new Date().toDateString();

    if (lastReset !== today) {
      // New day → clear rides
      this.save([]);
      localStorage.setItem(LAST_RESET_KEY, today);
    }
  }

  // Get all rides
  getAll(): Ride[] {
    return this.load();
  }

  // Add a new ride
  addRide(payload: Omit<Ride, 'id' | 'bookedBy'>) {
    const rides = this.load();
    const ride: Ride = {
      ...payload,
      id: 'ride-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      bookedBy: [],
    };
    rides.push(ride);
    this.save(rides);
    return ride;
  }

  // Book a ride
  bookRide(
    rideId: string,
    employee: any
  ): { success: boolean; message?: string; ride?: Ride } {
    const rides = this.load();
    const idx = rides.findIndex((r) => r.id === rideId);

    if (idx === -1) return { success: false, message: 'Ride not found.' };

    const ride = rides[idx];

    if (ride.ownerEmployeeId === employee.employeeId)
      return { success: false, message: 'Owner cannot book own ride.' };

    if (ride.bookedBy.some((u) => u === employee.employeeId))
      return { success: false, message: 'You have already booked this ride.' };

    if (ride.vacantSeats <= 0)
      return { success: false, message: 'No vacant seats available.' };

    ride.bookedBy.push(employee.employeeId);
    ride.vacantSeats -= 1;

    rides[idx] = ride;
    this.save(rides);

    return { success: true, ride, message: 'Booked seat Successfully.' };
  }

  // Get rides within ±minutes buffer
  availableRidesWithin(
    minutes: number = 60,
    vehicleType?: 'Bike' | 'Car'
  ): Ride[] {
    const now = new Date();
    const low = new Date(now.getTime() - minutes * 60000);
    const high = new Date(now.getTime() + minutes * 60000);

    return this.load().filter((r) => {
      const t = new Date(r.timeISO);
      if (isNaN(t.getTime())) return false;
      if (r.vacantSeats <= 0) return false;
      if (t < low || t > high) return false;
      if (vehicleType && r.vehicleType !== vehicleType) return false;
      return true;
    });
  }
}
