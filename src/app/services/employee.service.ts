import { Injectable } from '@angular/core';
import { User } from '../models/ride.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  USER_KEY = 'tfm_users';
  loggedInEmployee: User | null = null;

  constructor() {
    if (!localStorage.getItem(this.USER_KEY)) {
      const defaultUsers: User[] = [
        {
          employeeId: 'E001',
          name: 'Karthik Devendra Rao',
          password: 'Karthik@123',
        },
        { employeeId: 'E002', name: 'Suresh', password: 'Suresh@123' },
        { employeeId: 'E003', name: 'Jagdish', password: 'Jagdish@123' },
        { employeeId: 'E004', name: 'Ramesh', password: 'Ramesh@123' },
        { employeeId: 'E005', name: 'Krishna', password: 'Krishna@123' },
      ];
      localStorage.setItem(this.USER_KEY, JSON.stringify(defaultUsers));
    }
    this.loggedInEmployee = localStorage.getItem('loggedInEmployee')
      ? JSON.parse(localStorage.getItem('loggedInEmployee') || '')
      : '';
  }
  getAll(): User[] {
    const raw = localStorage.getItem(this.USER_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  validate(employeeId: string, password: string): boolean {
    let employee = this.getAll().filter(
      (u) => u.employeeId === employeeId && u.password === password
    )[0];
    if (employee) {
      localStorage.setItem('loggedInEmployee', JSON.stringify(employee));
      this.loggedInEmployee = employee;
      return true;
    }
    return false;
  }
}
