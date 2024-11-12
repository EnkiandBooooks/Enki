import { inject } from '@angular/core';
import { CanDeactivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


export const notExitGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  const router = inject(Router)
  const cookieService = inject(CookieService)
  console.log("-----------------------------")
  console.log("Ruta actual: ", currentRoute.url[0].path)
  console.log("Proxima ruta", nextState.url)
  console.log("-----------------------------")
  if((currentRoute.url[0].path === 'register1' && nextState.url === '/auth/register2') ||
    (currentRoute.url[0].path === 'register2' && nextState.url === '/auth/register3') || 
    (currentRoute.url[0].path === 'register3' && nextState.url === ' /auth/login')) {
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
