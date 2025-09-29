import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/ride.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage = '';

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      employeeId: new FormControl('', [
        Validators.required,
        Validators.maxLength(4),
      ]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { employeeId, password } = this.loginForm.value;
    if (this.employeeService.validate(employeeId, password)) {
      alert('Login Sucessfully Done!!');
      this.router.navigate(['/book-ride']);
    } else {
      this.errorMessage = 'Invalid Employee ID or Password';
    }
  }
}
