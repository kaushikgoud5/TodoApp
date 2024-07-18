import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

Injectable({
  providedIn: 'root',
});
export const AuthGuard = () => {
  const auth = inject(AuthService);
  const route = inject(Router);
  const activatedRoute=inject(ActivatedRoute)
  if (auth.isLoggedIn()) return true;
  else {
    route.navigate(['/login'])
  return false;
  }
};
