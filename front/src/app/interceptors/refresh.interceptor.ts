import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { RestService } from '../rest.service';
import { CookieService } from 'ngx-cookie-service';

export const refreshInterceptor: HttpInterceptorFn = (req, next) => {
  
  const especificRoutes = ['/data'];
  const interceptedRoutes = especificRoutes.some(routes => req.url.includes(routes));
  
  if(!interceptedRoutes){
    return next(req);
  }

  const restService = inject(RestService);
  const cookieService = inject(CookieService);
  const access_token = restService.getAccesToken();

  if(!access_token) {
    console.error("No se encontró el Access Token");
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: access_token
    }
  });

  return next(authReq).pipe(
    catchError((err) => {

      if (err.status === 401 || err.status === 403){
        return restService.refreshToken().pipe(
          switchMap((res) => {
            cookieService.set("access_token", res.accessToken);
            const newReq = req.clone({
              setHeaders: {
                Authorization: res.accessToken
              }
            });
            return next(newReq);
          }),
          catchError((refreshErr) => {
            const finalError = new Error(refreshErr);
            console.log(finalError)
            cookieService.delete('access_token');
            cookieService.delete('refresh_token');
              
            return throwError(() => finalError);
          })
        )
      }
      return throwError(() => err);
    })
  );
};
