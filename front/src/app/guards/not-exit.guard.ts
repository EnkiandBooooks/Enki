import { inject } from '@angular/core';
import { CanDeactivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


export const notExitGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  const router = inject(Router)
  const cookieService = inject(CookieService)

  console.log(currentRoute.url[0].path)
  if((currentRoute.url[0].path === 'login1' && nextState.url === '/login2') ||
    (currentRoute.url[0].path === 'login2' && nextState.url === '/login3') || 
    (currentRoute.url[0].path === 'login3' && nextState.url === '/')) {
      return true;
  }

  const conf =  confirm("¿Seguro que quieres marchar?");
  console.log(conf)
  if(conf){
    cookieService.delete("email_sendcode_token");
    return true
  } 
  return false
};
