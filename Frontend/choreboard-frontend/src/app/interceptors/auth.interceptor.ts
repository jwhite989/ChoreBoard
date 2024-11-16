import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  
  console.log('Auth Interceptor - Request URL:', req.url);
  
  if (req.url.includes('/login') || req.url.includes('/register')) {
    console.log('Skipping auth for login/register');
    return next(req);
  }

  const currentUser = authService.getCurrentUser();
  console.log('Current User:', currentUser);
  
  if (currentUser?.authData) {
    console.log('Adding auth header:', `Basic ${currentUser.authData}`);
    req = req.clone({
      setHeaders: {
        Authorization: `Basic ${currentUser.authData}`
      }
    });
    
    console.log('Final request headers:', req.headers.keys());
  }
  
  console.log('Auth Interceptor Details:', {
    url: req.url,
    method: req.method,
    headers: req.headers.keys(),
    currentUser: currentUser
  });
  
  return next(req);
};