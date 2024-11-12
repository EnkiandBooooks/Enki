import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const notLoginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const cookieService = inject(CookieService);

  if(cookieService.get('access_token')){
    router.navigate(['/dashboard/']);
    return false;
  }
  return true;
};
