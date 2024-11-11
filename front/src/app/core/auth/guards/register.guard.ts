import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const registerGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const cookieService = inject(CookieService);
  
  if(!cookieService.get('email_sendcode_token')){
    router.navigate(['/']);
    return false;
  }
  return true;
};
