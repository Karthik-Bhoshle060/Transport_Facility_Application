import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  currentPath: string = '';
  constructor(
    public employeeService: EmployeeService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.currentPath = this.router.url;
    });
  }
  logOut() {
    localStorage.setItem('loggedInEmployee', '');
    this.employeeService.loggedInEmployee = null;
    this.router.navigate(['/login']);
  }
}
