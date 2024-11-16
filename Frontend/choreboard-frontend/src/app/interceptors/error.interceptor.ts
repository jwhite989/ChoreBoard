import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && !req.url.includes('/login')) {
        authService.logout();
        router.navigate(['/login']);
      }
      if (err.status === 401) {
        console.log('401 Error Details:', {
          url: req.url,
          method: req.method,
          headers: req.headers.keys(),
          error: err.error,
          statusText: err.statusText
        });
      }
      return throwError(() => err);
    })
  );
};
