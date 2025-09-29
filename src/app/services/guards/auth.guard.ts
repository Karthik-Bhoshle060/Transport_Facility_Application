import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const loggedInEmployee = localStorage.getItem('loggedInEmployee');

    // Check if this route is 'login'
    const isLoginRoute = route.routeConfig?.path === 'login';

    if (!loggedInEmployee && !isLoginRoute) {
      // Not logged in → trying to access protected route
      this.router.navigate(['/login']);
      return false;
    }

    if (loggedInEmployee && isLoginRoute) {
      // Logged-in user → trying to access login page
      this.router.navigate(['/book-ride']);
      return false;
    }

    return true; // Allowed
  }
}
